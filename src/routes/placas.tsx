import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  QUESTIONS,
  INCIDENCE_META,
  type Question,
} from "@/data/questions";
import { Placa, type PlacaId } from "@/components/Placa";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  TrafficCone,
  Lightbulb,
  Target,
  RotateCcw,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/placas")({
  component: PlacasTrainerPage,
  head: () => ({
    meta: [
      { title: "Placas que Mais Caem — Treino Adaptativo · Nexia DETRAN" },
      {
        name: "description",
        content:
          "Treine apenas placas de trânsito, com priorização automática nas suas fraquezas e nas placas que mais caem na prova.",
      },
    ],
  }),
});

const SESSION_SIZE = 10;
const STORAGE_KEY = "nexia:placas:weakness:v1";

interface WeaknessEntry {
  seen: number;
  wrong: number;
  lastWrongAt?: number;
}
type WeaknessMap = Record<string, WeaknessEntry>;

function loadWeakness(): WeaknessMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WeaknessMap) : {};
  } catch {
    return {};
  }
}
function saveWeakness(map: WeaknessMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

const PLACA_POOL: Question[] = QUESTIONS.filter((q) => !!q.placa);

function buildSession(weakness: WeaknessMap): Question[] {
  const now = Date.now();
  const scored = PLACA_POOL.map((q) => {
    const w = weakness[q.placa as PlacaId] ?? { seen: 0, wrong: 0 };
    const wrongRate = w.seen > 0 ? w.wrong / w.seen : 0;
    const incidenceWeight = INCIDENCE_META[q.incidence].weight;
    // Fraqueza pesa MUITO: erros recentes sobem priorização.
    const recency =
      w.lastWrongAt && now - w.lastWrongAt < 1000 * 60 * 60 * 24 * 3 ? 1.5 : 1;
    // Boost grande para placas nunca vistas, garantindo cobertura.
    const novelty = w.seen === 0 ? 1.8 : 1;
    const base = incidenceWeight * (1 + 3 * wrongRate) * recency * novelty;
    return { q, score: base * (0.6 + Math.random() * 0.8) };
  })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.q);

  // Deduplica por placa (uma questão por placa por sessão), depois corta.
  const seenPlacas = new Set<string>();
  const unique: Question[] = [];
  for (const q of scored) {
    const id = q.placa as string;
    if (seenPlacas.has(id)) continue;
    seenPlacas.add(id);
    unique.push(q);
    if (unique.length >= SESSION_SIZE) break;
  }
  // Embaralha alternativas
  return unique.map((q) => {
    const indices = q.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      ...q,
      options: indices.map((i) => q.options[i]),
      correctIndex: indices.indexOf(q.correctIndex),
    };
  });
}

function PlacasTrainerPage() {
  const [hydrated, setHydrated] = useState(false);
  const [weakness, setWeakness] = useState<WeaknessMap>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const w = loadWeakness();
    setWeakness(w);
    setQuestions(buildSession(w));
    setHydrated(true);
  }, []);

  function restart() {
    const w = loadWeakness();
    setWeakness(w);
    setQuestions(buildSession(w));
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setDone(false);
  }

  // Top fraquezas (computado antes de early returns para respeitar regra dos hooks)
  const topWeakness = useMemo(() => {
    return Object.entries(weakness)
      .map(([placa, w]) => ({
        placa: placa as PlacaId,
        rate: w.seen > 0 ? w.wrong / w.seen : 0,
        wrong: w.wrong,
        seen: w.seen,
      }))
      .filter((x) => x.wrong > 0)
      .sort((a, b) => b.rate - a.rate || b.wrong - a.wrong)
      .slice(0, 3);
  }, [weakness]);

  if (!hydrated || !questions.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center text-muted-foreground">
        Preparando treino de placas…
      </div>
    );
  }

  const q = questions[Math.min(index, questions.length - 1)];

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    // Atualiza fraquezas
    const placaId = q.placa as PlacaId;
    const prev = weakness[placaId] ?? { seen: 0, wrong: 0 };
    const isWrong = i !== q.correctIndex;
    const updated: WeaknessMap = {
      ...weakness,
      [placaId]: {
        seen: prev.seen + 1,
        wrong: prev.wrong + (isWrong ? 1 : 0),
        lastWrongAt: isWrong ? Date.now() : prev.lastWrongAt,
      },
    };
    setWeakness(updated);
    saveWeakness(updated);
  }

  function next() {
    const newAnswers = [...answers];
    newAnswers[index] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
    }
  }

  const score = answers.reduce<number>(
    (acc, a, i) => acc + (a !== null && a === questions[i]?.correctIndex ? 1 : 0),
    0,
  );
  const progress =
    ((Math.min(index, questions.length) + (selected !== null ? 1 : 0)) /
      questions.length) *
    100;




  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary-glow font-semibold flex items-center gap-2">
            <TrafficCone className="h-4 w-4" /> Placas · Treino adaptativo
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-1">
            Placas que <span className="gradient-text">mais caem</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Prioriza automaticamente suas fraquezas + maior incidência.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Questão</p>
          <p className="text-xl font-display font-bold">
            {Math.min(index + 1, questions.length)}
            <span className="text-muted-foreground text-sm font-normal">
              {" "}
              / {questions.length}
            </span>
          </p>
        </div>
      </div>

      {/* Painel de fraquezas */}
      {topWeakness.length > 0 && !done && (
        <div className="mb-4 rounded-2xl border border-destructive/25 bg-destructive/5 p-3 flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 text-xs text-destructive shrink-0">
            <Target className="h-4 w-4" />
            <span className="font-semibold uppercase tracking-wider">
              Suas fraquezas
            </span>
          </div>
          <div className="flex items-center gap-2">
            {topWeakness.map((w) => (
              <div
                key={w.placa}
                className="flex items-center gap-2 rounded-xl bg-background/50 border border-border/40 pl-2 pr-3 py-1.5"
                title={`${w.wrong}/${w.seen} erros`}
              >
                <Placa id={w.placa} size={32} className="!p-1 !rounded-md" />
                <span className="text-xs font-semibold">
                  {Math.round(w.rate * 100)}%
                  <span className="text-[10px] text-muted-foreground ml-1">
                    erro
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="h-2 rounded-full bg-secondary overflow-hidden mb-6">
        <motion.div
          className="h-full gradient-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {!done && (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-3xl p-6 md:p-8 shadow-card"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`text-xs px-2.5 py-1 rounded-full border ${INCIDENCE_META[q.incidence].className}`}
              >
                {INCIDENCE_META[q.incidence].emoji}{" "}
                {INCIDENCE_META[q.incidence].label}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-border bg-secondary/50">
                Código oficial: {q.placa}
              </span>
            </div>

            {/* Placa centralizada e grande */}
            <div className="flex justify-center my-4">
              {q.placa && <Placa id={q.placa} size={200} />}
            </div>

            <h2 className="text-lg md:text-xl font-medium leading-relaxed text-center">
              {q.statement}
            </h2>

            <div className="mt-6 space-y-2.5">
              {q.options.map((opt, i) => {
                const isSel = selected === i;
                const isCorrect = i === q.correctIndex;
                const reveal = selected !== null;
                const state = !reveal
                  ? "idle"
                  : isCorrect
                    ? "correct"
                    : isSel
                      ? "wrong"
                      : "muted";

                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={selected !== null}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                      state === "correct"
                        ? "border-success/50 bg-success/10"
                        : state === "wrong"
                          ? "border-destructive/50 bg-destructive/10"
                          : state === "muted"
                            ? "border-border bg-secondary/30 opacity-60"
                            : "border-border bg-secondary/50 hover:border-primary/40 hover:bg-secondary"
                    } ${selected === null ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm border ${
                        state === "correct"
                          ? "bg-success text-success-foreground border-success"
                          : state === "wrong"
                            ? "bg-destructive text-destructive-foreground border-destructive"
                            : "bg-background/40 border-border"
                      }`}
                    >
                      {state === "correct" ? (
                        <Check className="h-4 w-4" />
                      ) : state === "wrong" ? (
                        <X className="h-4 w-4" />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </div>
                    <span className="text-sm md:text-base pt-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 p-5 rounded-2xl border ${
                    selected === q.correctIndex
                      ? "border-success/30 bg-success/5"
                      : "border-destructive/30 bg-destructive/5"
                  }`}
                >
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-warning" />
                    {selected === q.correctIndex
                      ? "Mandou bem! Fixa essa:"
                      : "Quase! Memorize agora:"}
                  </p>
                  <p className="text-sm font-medium mb-2">
                    ✅ <span className="text-success">{q.options[q.correctIndex]}</span>
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {q.detailedExplanation ?? q.explanation}
                  </p>
                  {q.tip && (
                    <p className="text-sm mt-3 p-2 rounded-lg bg-primary/10 text-primary-glow">
                      💡 <span className="font-semibold">Macete:</span> {q.tip}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {selected !== null && (
              <button
                onClick={next}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
              >
                {index + 1 >= questions.length ? "Ver resultado" : "Próxima placa"}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 md:p-8 shadow-glow"
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <Trophy className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-display font-bold">
              {score}/{questions.length}
            </h2>
            <p className="text-muted-foreground mt-1">
              {score === questions.length
                ? "Perfeito! Você dominou esta rodada de placas."
                : "Boa! Suas fraquezas foram registradas — a próxima rodada vai focar nelas."}
            </p>
          </div>

          {/* Resumo placa a placa */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {questions.map((qq, i) => {
              const correct = answers[i] === qq.correctIndex;
              return (
                <div
                  key={qq.id}
                  className={`rounded-2xl p-3 border flex items-center gap-3 ${
                    correct
                      ? "border-success/30 bg-success/5"
                      : "border-destructive/30 bg-destructive/5"
                  }`}
                >
                  {qq.placa && (
                    <Placa id={qq.placa} size={44} className="!p-1.5 !rounded-lg" />
                  )}
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {qq.placa}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        correct ? "text-success" : "text-destructive"
                      }`}
                    >
                      {correct ? "Acertou" : "Revisar"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={restart}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
            >
              <RotateCcw className="h-4 w-4" /> Nova rodada adaptativa
            </button>
          </div>
          <p className="text-[11px] text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" /> A próxima rodada prioriza as placas
            que você mais errou.
          </p>
        </motion.div>
      )}
    </div>
  );
}

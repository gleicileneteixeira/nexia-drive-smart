import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  PencilLine,
  Eye,
  Timer,
  Shapes,
  ArrowRight,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
  Check,
  X,
  Play,
} from "lucide-react";
import memoriaImg from "@/assets/psico-memoria.png";

export const Route = createFileRoute("/psicotecnico")({
  component: PsicoPage,
  head: () => ({
    meta: [
      { title: "Simulador Psicotécnico DETRAN — Nexia" },
      {
        name: "description",
        content:
          "Treine os 4 testes do exame psicotécnico do DETRAN: palográfico (risquinhos), atenção, memória rápida e raciocínio lógico.",
      },
    ],
  }),
});

type Stage = "hub" | "palografico" | "atencao" | "memoria" | "logico" | "result";

interface ScoreMap {
  palografico?: {
    strokes: number;
    lines: number;
    consistency: number;
    avgWidth: number;
    avgHeight: number;
  };
  atencao?: { correct: number; total: number };
  memoria?: { items: number };
  logico?: { correct: number; total: number };
}

// ===================== Speech (audio explicativo) =====================
function useSpeech() {
  const [enabled, setEnabled] = useState(true);
  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;
      try {
        window.speechSynthesis.cancel();
        if (!enabled) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "pt-BR";
        u.rate = 1;
        u.pitch = 1;
        window.speechSynthesis.speak(u);
      } catch {}
    },
    [enabled],
  );
  const stop = useCallback(() => {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }, []);
  return { enabled, setEnabled, speak, stop };
}

// ===================== HUB =====================
function PsicoPage() {
  const [stage, setStage] = useState<Stage>("hub");
  const [scores, setScores] = useState<ScoreMap>({});
  const speech = useSpeech();

  useEffect(() => () => speech.stop(), [speech]);

  function go(next: Stage) {
    speech.stop();
    setStage(next);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
      <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary-glow font-semibold flex items-center gap-2">
            <Brain className="h-4 w-4" /> Exame Psicotécnico
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-1">
            Simulador <span className="gradient-text">Psicotécnico</span> DETRAN
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Os 4 testes oficiais. Treine antes do dia da avaliação.
          </p>
        </div>
        <button
          onClick={() => speech.setEnabled((v) => !v)}
          className="px-3 py-2 rounded-xl glass text-xs flex items-center gap-2"
        >
          {speech.enabled ? (
            <Volume2 className="h-4 w-4 text-primary" />
          ) : (
            <VolumeX className="h-4 w-4 text-muted-foreground" />
          )}
          {speech.enabled ? "Áudio ligado" : "Áudio mudo"}
        </button>
      </div>

      {stage === "hub" && (
        <Hub
          onPick={(s) => {
            go(s);
          }}
          scores={scores}
          speech={speech}
        />
      )}
      {stage === "palografico" && (
        <Palografico
          speech={speech}
          onDone={(r) => {
            setScores((s) => ({ ...s, palografico: r }));
            go("atencao");
          }}
        />
      )}
      {stage === "atencao" && (
        <Atencao
          speech={speech}
          onDone={(r) => {
            setScores((s) => ({ ...s, atencao: r }));
            go("memoria");
          }}
        />
      )}
      {stage === "memoria" && (
        <Memoria
          speech={speech}
          onDone={(r) => {
            setScores((s) => ({ ...s, memoria: r }));
            go("logico");
          }}
        />
      )}
      {stage === "logico" && (
        <Logico
          speech={speech}
          onDone={(r) => {
            setScores((s) => ({ ...s, logico: r }));
            go("result");
          }}
        />
      )}
      {stage === "result" && (
        <Result
          scores={scores}
          onRestart={() => {
            setScores({});
            go("hub");
          }}
        />
      )}
    </div>
  );
}

// ===================== HUB CARDS =====================
const TESTS: {
  id: Stage;
  title: string;
  desc: string;
  icon: typeof Brain;
  accent: string;
}[] = [
  {
    id: "palografico",
    title: "Teste dos Risquinhos",
    desc: "Palográfico — ritmo, constância e produtividade.",
    icon: PencilLine,
    accent: "from-primary to-primary-glow",
  },
  {
    id: "atencao",
    title: "Teste de Atenção",
    desc: "Siga a linha certa e marque a figura igual.",
    icon: Eye,
    accent: "from-warning to-destructive",
  },
  {
    id: "memoria",
    title: "Memória Rápida",
    desc: "Memorize a cena e liste o máximo de objetos.",
    icon: Timer,
    accent: "from-destructive to-warning",
  },
  {
    id: "logico",
    title: "Raciocínio Lógico",
    desc: "Figuras geométricas — encontre o padrão.",
    icon: Shapes,
    accent: "from-primary-glow to-primary",
  },
];

function Hub({
  onPick,
  speech,
}: {
  onPick: (s: Stage) => void;
  scores: ScoreMap;
  speech: ReturnType<typeof useSpeech>;
}) {
  useEffect(() => {
    speech.speak(
      "Bem-vindo ao simulador psicotécnico do DETRAN. Você fará quatro testes: risquinhos, atenção, memória rápida e raciocínio lógico. Toque em começar para iniciar.",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl p-6 shadow-card">
        <p className="text-sm text-muted-foreground">
          A avaliação completa leva cerca de <strong>8 minutos</strong>. Antes
          de cada teste, um áudio explica o que fazer. Vamos juntos.
        </p>
        <button
          onClick={() => onPick("palografico")}
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
        >
          <Play className="h-4 w-4" /> Começar do início
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TESTS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onPick(t.id)}
              className="text-left glass rounded-2xl p-5 hover:bg-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center mb-3 shadow-card`}
              >
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            </button>
          );
        })}
      </div>
      <Link
        to="/"
        className="block text-center text-xs text-muted-foreground hover:text-foreground"
      >
        ← Voltar ao início
      </Link>
    </div>
  );
}

// ===================== Drawing canvas helper =====================
function useDrawCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const strokesRef = useRef<
    { minX: number; maxX: number; minY: number; maxY: number }[]
  >([]);
  const [, force] = useState(0);

  const setup = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const targetW = Math.floor(rect.width * dpr);
    const targetH = Math.floor(rect.height * dpr);
    // Avoid re-init mid-draw or on noisy resize events (mobile URL bar)
    if (c.width === targetW && c.height === targetH) return;
    if (drawingRef.current) return;
    c.width = targetW;
    c.height = targetH;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0a0a0a";
  }, []);

  useEffect(() => {
    setup();
    const c = canvasRef.current;
    if (!c || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setup());
    ro.observe(c);
    return () => ro.disconnect();
  }, [setup]);

  function pos(e: PointerEvent | React.PointerEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    // Scale CSS-pixel coords by any layout scaling (e.g. transforms)
    const sx = r.width === 0 ? 1 : c.clientWidth / r.width;
    const sy = r.height === 0 ? 1 : c.clientHeight / r.height;
    return {
      x: (e.clientX - r.left) * sx,
      y: (e.clientY - r.top) * sy,
    };
  }

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drawingRef.current = true;
    const p = pos(e);
    lastRef.current = p;
    strokeCountRef.current += 1;
    strokesRef.current.push({ minX: p.x, maxX: p.x, minY: p.y, maxY: p.y });
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();
    }
    force((n) => n + 1);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !lastRef.current) return;
    const native = e.nativeEvent as PointerEvent & {
      getCoalescedEvents?: () => PointerEvent[];
    };
    const events =
      native.getCoalescedEvents && native.getCoalescedEvents().length
        ? native.getCoalescedEvents()
        : [native];
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    const stroke = strokesRef.current[strokesRef.current.length - 1];
    for (const ev of events) {
      const p = pos(ev);
      ctx.lineTo(p.x, p.y);
      lastRef.current = p;
      if (stroke) {
        if (p.x < stroke.minX) stroke.minX = p.x;
        if (p.x > stroke.maxX) stroke.maxX = p.x;
        if (p.y < stroke.minY) stroke.minY = p.y;
        if (p.y > stroke.maxY) stroke.maxY = p.y;
      }
    }
    ctx.stroke();
  };
  const onPointerUp = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clear = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.restore();
    strokeCountRef.current = 0;
    strokesRef.current = [];
    force((n) => n + 1);
  };

  return {
    canvasRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    clear,
    strokeCount: strokeCountRef.current,
    strokesRef,
  };
}

// ===================== TEST 1: PALOGRÁFICO =====================
function Palografico({
  speech,
  onDone,
}: {
  speech: ReturnType<typeof useSpeech>;
  onDone: (r: {
    strokes: number;
    lines: number;
    consistency: number;
    avgWidth: number;
    avgHeight: number;
  }) => void;
}) {
  const TOTAL_LINES = 6;
  const SECS_PER_LINE = 8;
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [line, setLine] = useState(0);
  const [time, setTime] = useState(SECS_PER_LINE);
  const [perLine, setPerLine] = useState<
    { count: number; avgW: number; avgH: number }[]
  >([]);
  const draw = useDrawCanvas();
  const lastCountRef = useRef(0);
  const strokeMarkerRef = useRef(0);

  useEffect(() => {
    if (phase !== "intro") return;
    speech.speak(
      "Teste dos risquinhos, também chamado palográfico. Você verá três traços de modelo no topo. Repita o padrão livremente na folha em branco abaixo, o mais rápido e constante possível. Gire o celular para a horizontal para ter mais espaço. Toque em iniciar quando estiver pronto.",
    );
  }, [phase, speech]);

  useEffect(() => {
    if (phase !== "running") return;
    if (time <= 0) {
      // próxima linha
      const count = draw.strokeCount - lastCountRef.current;
      lastCountRef.current = draw.strokeCount;
      const all = draw.strokesRef.current;
      const slice = all.slice(strokeMarkerRef.current);
      strokeMarkerRef.current = all.length;
      const widths = slice.map((s) => s.maxX - s.minX);
      const heights = slice.map((s) => s.maxY - s.minY);
      const avgW =
        widths.length > 0
          ? widths.reduce((a, b) => a + b, 0) / widths.length
          : 0;
      const avgH =
        heights.length > 0
          ? heights.reduce((a, b) => a + b, 0) / heights.length
          : 0;
      setPerLine((p) => [...p, { count, avgW, avgH }]);
      if (line + 1 >= TOTAL_LINES) {
        setPhase("done");
        speech.speak("Tempo encerrado. Vamos para o próximo teste.");
      } else {
        speech.speak("Tempo! Próxima rodada.");
        setLine((l) => l + 1);
        setTime(SECS_PER_LINE);
        draw.clear();
        lastCountRef.current = 0;
        strokeMarkerRef.current = 0;
      }

      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, time, line, draw.strokeCount, speech]);

  function finish() {
    const counts = perLine.map((p) => p.count);
    const total = counts.reduce((a, b) => a + b, 0);
    const avg = total / Math.max(1, counts.length);
    const variance =
      counts.reduce((acc, n) => acc + Math.pow(n - avg, 2), 0) /
      Math.max(1, counts.length);
    const consistency = Math.max(0, Math.min(100, 100 - Math.sqrt(variance) * 10));
    const avgWidth =
      perLine.length > 0
        ? perLine.reduce((a, b) => a + b.avgW, 0) / perLine.length
        : 0;
    const avgHeight =
      perLine.length > 0
        ? perLine.reduce((a, b) => a + b.avgH, 0) / perLine.length
        : 0;
    onDone({
      strokes: total,
      lines: perLine.length,
      consistency,
      avgWidth,
      avgHeight,
    });
  }

  return (
    <div className="glass rounded-3xl p-5 md:p-6 shadow-card">
      <TestHeader
        title="1/4 · Teste dos Risquinhos"
        subtitle="Palográfico — produtividade e constância"
      />

      {phase === "intro" && (
        <Intro
          bullets={[
            "Repita o padrão dos 3 risquinhos verticais (| | |) com o dedo.",
            "Sem linhas guia: desenhe livremente na folha em branco.",
            "Ritmo ideal: cerca de 1 traço por segundo.",
            "São 6 rodadas; a tela limpa ao trocar de rodada.",
            "Em celular, gire para a horizontal para ter mais espaço.",
          ]}
          onStart={() => {
            speech.stop();
            draw.clear();
            lastCountRef.current = 0;
            strokeMarkerRef.current = 0;
            setPerLine([]);
            setLine(0);
            setTime(SECS_PER_LINE);
            setPhase("running");
          }}
          speech={speech}
          replayText="Repita os três risquinhos do modelo com o dedo, na folha em branco. Gire o celular para a horizontal."
        />
      )}

      {phase === "running" && (
        <div>
          <div className="md:hidden mb-2 text-[11px] text-warning bg-warning/10 border border-warning/30 rounded-lg px-3 py-1.5">
            Dica: gire o celular na horizontal para uma área de desenho maior.
          </div>

          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="font-semibold">
              Rodada {line + 1}/{TOTAL_LINES}
            </span>
            <span
              className={`font-display text-lg ${
                time <= 2 ? "text-destructive" : "text-foreground"
              }`}
            >
              {time}s
            </span>
          </div>

          {/* Modelo: 3 risquinhos iniciais */}
          <div className="rounded-t-2xl border border-b-0 border-border bg-white px-4 py-3 flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">
              Modelo
            </span>
            <div className="flex gap-3 text-zinc-900 font-bold text-2xl leading-none">
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <span className="ml-auto text-[11px] text-zinc-500">
              Repita o padrão livremente abaixo
            </span>
          </div>

          <div className="relative rounded-b-2xl overflow-hidden border border-border bg-white">
            <canvas
              ref={draw.canvasRef}
              onPointerDown={draw.onPointerDown}
              onPointerMove={draw.onPointerMove}
              onPointerUp={draw.onPointerUp}
              onPointerCancel={draw.onPointerUp}
              onPointerLeave={draw.onPointerUp}
              className="w-full block touch-none select-none"
              style={{
                touchAction: "none",
                aspectRatio: "16 / 9",
                maxHeight: "70vh",
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setTime(0)}
              className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold"
            >
              Tempo! (próxima)
            </button>
            <button
              onClick={() => {
                draw.clear();
                lastCountRef.current = 0;
                strokeMarkerRef.current = 0;
              }}
              className="px-4 py-2 rounded-xl glass text-sm"
            >
              Limpar área
            </button>
            <div className="text-xs text-muted-foreground flex-1 self-center text-right">
              Traços nesta rodada:{" "}
              <strong>{draw.strokeCount - lastCountRef.current}</strong>
            </div>
          </div>
        </div>
      )}

      {phase === "done" && (
        <DoneNext
          summary={
            `${perLine.reduce((a, b) => a + b.count, 0)} traços em ${perLine.length} rodadas · ` +
            `largura média ${Math.round(
              perLine.reduce((a, b) => a + b.avgW, 0) /
                Math.max(1, perLine.length),
            )}px · altura média ${Math.round(
              perLine.reduce((a, b) => a + b.avgH, 0) /
                Math.max(1, perLine.length),
            )}px`
          }
          onNext={finish}
        />
      )}
    </div>
  );
}

// ===================== TEST 2: ATENÇÃO =====================
// Linhas embaralhadas: 4 entradas → 4 saídas com figuras. O usuário escolhe
// qual figura está conectada à entrada destacada.
type AtItem = { id: number; shape: "circle" | "square" | "triangle" | "diamond" };
const AT_ITEMS: AtItem[] = [
  { id: 1, shape: "circle" },
  { id: 2, shape: "square" },
  { id: 3, shape: "triangle" },
  { id: 4, shape: "diamond" },
];

const AT_ROUNDS = [
  { startIndex: 0, endIndex: 2 }, // 1 → triângulo
  { startIndex: 1, endIndex: 0 }, // 2 → círculo
  { startIndex: 2, endIndex: 3 }, // 3 → diamante
  { startIndex: 3, endIndex: 1 }, // 4 → quadrado
];

function Shape({ shape, size = 28 }: { shape: AtItem["shape"]; size?: number }) {
  const s = size;
  if (shape === "circle")
    return (
      <svg width={s} height={s} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="14" fill="#FFB020" stroke="#222" strokeWidth="2" />
      </svg>
    );
  if (shape === "square")
    return (
      <svg width={s} height={s} viewBox="0 0 40 40">
        <rect x="8" y="8" width="24" height="24" fill="#FFB020" stroke="#222" strokeWidth="2" />
      </svg>
    );
  if (shape === "triangle")
    return (
      <svg width={s} height={s} viewBox="0 0 40 40">
        <polygon points="20,6 34,32 6,32" fill="#FFB020" stroke="#222" strokeWidth="2" />
      </svg>
    );
  return (
    <svg width={s} height={s} viewBox="0 0 40 40">
      <polygon points="20,4 36,20 20,36 4,20" fill="#FFB020" stroke="#222" strokeWidth="2" />
    </svg>
  );
}

function Atencao({
  speech,
  onDone,
}: {
  speech: ReturnType<typeof useSpeech>;
  onDone: (r: { correct: number; total: number }) => void;
}) {
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    if (phase === "intro")
      speech.speak(
        "Teste de atenção. Siga a linha que sai da entrada destacada, em azul, até a figura de chegada. Em seguida, marque a figura igual à de chegada. Use o dedo se quiser para seguir a linha.",
      );
  }, [phase, speech]);

  const r = AT_ROUNDS[round];
  const targetShape = AT_ITEMS[r?.endIndex ?? 0].shape;
  // Embaralha alternativas
  const alts = useMemo(() => {
    const ids = AT_ITEMS.map((x) => x.shape);
    return ids.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  function pick(shape: AtItem["shape"]) {
    if (picked !== null) return;
    const isRight = shape === targetShape;
    setPicked(alts.indexOf(shape));
    if (isRight) setCorrect((c) => c + 1);
    setTimeout(() => {
      if (round + 1 >= AT_ROUNDS.length) {
        setPhase("done");
      } else {
        setRound((x) => x + 1);
        setPicked(null);
      }
    }, 900);
  }

  // SVG das "minhocas" entre entrada e saída
  function Worms() {
    const ys = [40, 110, 180, 250];
    return (
      <svg viewBox="0 0 400 290" className="w-full h-[290px]">
        {AT_ROUNDS.map((rd, i) => {
          const y1 = ys[rd.startIndex];
          const y2 = ys[rd.endIndex];
          const active = i === round;
          const mid = 200 + (i % 2 === 0 ? -20 : 20);
          const d = `M 60 ${y1} C ${mid} ${y1}, ${mid} ${y2}, 340 ${y2}`;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={active ? "#3B82F6" : "#94A3B8"}
              strokeWidth={active ? 4 : 2}
              strokeLinecap="round"
              strokeDasharray={active ? "0" : "6 4"}
              opacity={active ? 1 : 0.45}
            />
          );
        })}
        {ys.map((y, i) => (
          <g key={`L${i}`}>
            <circle
              cx={40}
              cy={y}
              r={18}
              fill={i === r.startIndex ? "#3B82F6" : "#E5E7EB"}
              stroke="#1f2937"
              strokeWidth="2"
            />
            <text
              x={40}
              y={y + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={i === r.startIndex ? "#fff" : "#111"}
            >
              {i + 1}
            </text>
          </g>
        ))}
        {ys.map((y, i) => {
          const it = AT_ITEMS[i];
          return (
            <g key={`R${i}`} transform={`translate(340, ${y - 18})`}>
              <rect
                x={-2}
                y={-2}
                width={40}
                height={40}
                rx={6}
                fill="#fff"
                stroke="#1f2937"
                strokeWidth="2"
              />
              <foreignObject x={0} y={0} width={36} height={36}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Shape shape={it.shape} size={28} />
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <div className="glass rounded-3xl p-5 md:p-6 shadow-card">
      <TestHeader
        title="2/4 · Teste de Atenção"
        subtitle="Siga a linha azul e marque a figura igual"
      />
      {phase === "intro" && (
        <Intro
          bullets={[
            "Veja a entrada destacada em azul (à esquerda).",
            "Siga a linha contínua até a figura de chegada.",
            "Marque, abaixo, a figura igual à de chegada.",
            "Quanto mais rápido e certo, melhor.",
          ]}
          onStart={() => {
            speech.stop();
            setRound(0);
            setCorrect(0);
            setPicked(null);
            setPhase("running");
          }}
          speech={speech}
          replayText="Siga a linha azul da entrada até a figura de chegada e marque a figura igual."
        />
      )}
      {phase === "running" && (
        <div>
          <div className="text-sm font-semibold mb-2">
            Rodada {round + 1}/{AT_ROUNDS.length} · Acertos: {correct}
          </div>
          <div className="rounded-2xl bg-white border border-border p-2">
            <Worms />
          </div>
          <p className="text-xs text-muted-foreground mt-3 mb-1">
            Qual figura é igual à de chegada?
          </p>
          <div className="grid grid-cols-4 gap-2">
            {alts.map((sh, i) => {
              const isPicked = picked === i;
              const isCorrect = sh === targetShape;
              const reveal = picked !== null;
              return (
                <button
                  key={i}
                  onClick={() => pick(sh)}
                  className={`aspect-square rounded-2xl border-2 flex items-center justify-center bg-white transition-all ${
                    reveal && isCorrect
                      ? "border-success bg-success/10"
                      : reveal && isPicked
                        ? "border-destructive bg-destructive/10"
                        : "border-border hover:border-primary/50"
                  }`}
                >
                  <Shape shape={sh} size={44} />
                </button>
              );
            })}
          </div>
        </div>
      )}
      {phase === "done" && (
        <DoneNext
          summary={`${correct}/${AT_ROUNDS.length} acertos de atenção`}
          onNext={() => onDone({ correct, total: AT_ROUNDS.length })}
        />
      )}
    </div>
  );
}

// ===================== TEST 3: MEMÓRIA RÁPIDA =====================
const MEM_REFERENCE_OBJECTS = [
  "casa", "árvore", "sol", "balão", "avião", "carro", "moto", "barco",
  "bicicleta", "guarda-chuva", "cadeira", "peixe", "ferro", "vela",
  "ponte", "pessoa", "pipa", "foice", "placa",
];

function Memoria({
  speech,
  onDone,
}: {
  speech: ReturnType<typeof useSpeech>;
  onDone: (r: { items: number }) => void;
}) {
  const MEM_SECS = 30;
  const WRITE_SECS = 60;
  const [phase, setPhase] = useState<"intro" | "memorize" | "write" | "done">(
    "intro",
  );
  const [time, setTime] = useState(MEM_SECS);
  const [text, setText] = useState("");

  useEffect(() => {
    if (phase === "intro")
      speech.speak(
        "Teste de memória rápida. Você verá uma cena por 30 segundos. Memorize o máximo de objetos que conseguir. Depois, você terá 1 minuto para escrever tudo que lembrar.",
      );
  }, [phase, speech]);

  useEffect(() => {
    if (phase !== "memorize" && phase !== "write") return;
    if (time <= 0) {
      if (phase === "memorize") {
        speech.speak("Tempo! Agora escreva tudo que lembrar.");
        setPhase("write");
        setTime(WRITE_SECS);
      } else {
        setPhase("done");
        speech.speak("Tempo encerrado.");
      }
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, time, speech]);

  function finish() {
    const items = text
      .toLowerCase()
      .split(/[\n,;]+/)
      .map((x) => x.trim())
      .filter(Boolean);
    const matched = items.filter((w) =>
      MEM_REFERENCE_OBJECTS.some((r) => w.includes(r) || r.includes(w)),
    );
    onDone({ items: matched.length });
  }

  return (
    <div className="glass rounded-3xl p-5 md:p-6 shadow-card">
      <TestHeader
        title="3/4 · Memória Rápida"
        subtitle="Memorize e liste o máximo de objetos"
      />
      {phase === "intro" && (
        <Intro
          bullets={[
            "Você verá uma cena por 30 segundos.",
            "Memorize o maior número de objetos possível.",
            "Depois, terá 60 segundos para escrever a lista.",
            "Separe os itens por vírgula ou por linha.",
          ]}
          onStart={() => {
            speech.stop();
            setText("");
            setTime(MEM_SECS);
            setPhase("memorize");
          }}
          speech={speech}
          replayText="Memorize a cena por trinta segundos. Depois liste tudo que conseguir lembrar."
        />
      )}
      {phase === "memorize" && (
        <div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-semibold">Memorize agora</span>
            <span
              className={`font-display text-lg ${
                time <= 5 ? "text-destructive" : "text-foreground"
              }`}
            >
              {time}s
            </span>
          </div>
          <div className="rounded-2xl bg-white border border-border overflow-hidden flex justify-center">
            <img
              src={memoriaImg}
              alt="Cena para memorizar"
              className="max-h-[70vh] w-auto"
              style={{ aspectRatio: "9/16", objectFit: "contain" }}
            />
          </div>
          <button
            onClick={() => setTime(0)}
            className="mt-3 px-4 py-2 rounded-xl glass text-sm"
          >
            Já memorizei →
          </button>
        </div>
      )}
      {phase === "write" && (
        <div>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-semibold">Escreva o que lembrar</span>
            <span
              className={`font-display text-lg ${
                time <= 5 ? "text-destructive" : "text-foreground"
              }`}
            >
              {time}s
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ex: casa, árvore, carro, balão..."
            className="w-full h-48 p-4 rounded-2xl bg-background/60 border border-border text-sm leading-relaxed"
          />
          <button
            onClick={() => setTime(0)}
            className="mt-3 px-4 py-2 rounded-xl glass text-sm"
          >
            Terminei →
          </button>
        </div>
      )}
      {phase === "done" && <DoneNext summary="Memória registrada" onNext={finish} />}
    </div>
  );
}

// ===================== TEST 4: RACIOCÍNIO LÓGICO =====================
type LogOpt = { key: string; render: () => React.ReactNode };
type LogQuestion = {
  question: string;
  prompt?: () => React.ReactNode;
  options: LogOpt[];
  correct: string;
  explain: string;
};

type ShapeKind = "triangle" | "square" | "circle" | "diamond" | "star" | "pentagon";

// Paleta de referência (azul-marinho, verde, amarelo mostarda, vermelho tijolo)
const NAVY = "#1e2a5e";
const GRN = "#3aa455";
const YLW = "#e8a93a";
const RED = "#c8392e";
const BLU = NAVY; // compat

function CShape({
  kind,
  size = 64,
  color = NAVY,
  rotate = 0,
}: {
  kind: ShapeKind;
  size?: number;
  color?: string;
  rotate?: number;
}) {
  const t = `rotate(${rotate} 20 20)`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <g transform={t}>
        {kind === "circle" && <circle cx="20" cy="20" r="15" fill={color} />}
        {kind === "square" && <rect x="6" y="6" width="28" height="28" fill={color} />}
        {kind === "triangle" && <polygon points="20,5 35,33 5,33" fill={color} />}
        {kind === "diamond" && <polygon points="20,3 37,20 20,37 3,20" fill={color} />}
        {kind === "star" && (
          <polygon
            points="20,4 24,15 36,15 26,22 30,34 20,27 10,34 14,22 4,15 16,15"
            fill={color}
          />
        )}
        {kind === "pentagon" && (
          <polygon points="20,4 36,16 30,34 10,34 4,16" fill={color} />
        )}
      </g>
    </svg>
  );
}

const tri = (key: string, color = NAVY) => (
  <CShape key={key} kind="triangle" size={64} color={color} />
);
const sq = (key: string, color = NAVY) => (
  <CShape key={key} kind="square" size={64} color={color} />
);
const ci = (key: string, color = NAVY) => (
  <CShape key={key} kind="circle" size={64} color={color} />
);
const di = (key: string, color = NAVY) => (
  <CShape key={key} kind="diamond" size={64} color={color} />
);
const st = (key: string, color = NAVY) => (
  <CShape key={key} kind="star" size={64} color={color} />
);

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-1 justify-center items-center flex-wrap">{children}</div>;
}

function Arrow({
  dir,
  size = 56,
  color = NAVY,
}: {
  dir: "up" | "right" | "down" | "left";
  size?: number;
  color?: string;
}) {
  const rot = { up: -90, right: 0, down: 90, left: 180 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <g transform={`rotate(${rot} 20 20)`}>
        {/* Seta cheia estilo bloco */}
        <polygon points="4,15 22,15 22,8 36,20 22,32 22,25 4,25" fill={color} />
      </g>
    </svg>
  );
}

function Dots({ n }: { n: number }) {
  const arr = Array.from({ length: n });
  const cols = Math.min(n, 4);
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {arr.map((_, i) => (
        <span key={i} className="block w-3 h-3 rounded-full" style={{ background: NAVY }} />
      ))}
    </div>
  );
}

function Grid2x2({
  fill,
  color = NAVY,
}: {
  fill: Array<0 | 1 | 2 | 3>;
  color?: string;
}) {
  const cell = (i: 0 | 1 | 2 | 3) => {
    const x = i % 2 === 0 ? 4 : 33;
    const y = i < 2 ? 4 : 33;
    return fill.includes(i) ? (
      <rect key={i} x={x} y={y} width="27" height="27" fill={color} />
    ) : null;
  };
  return (
    <svg width="72" height="72" viewBox="0 0 64 64">
      <rect x="1" y="1" width="62" height="62" fill="none" stroke="#bfc4d1" strokeWidth="1.5" />
      <line x1="32" y1="1" x2="32" y2="63" stroke="#bfc4d1" strokeWidth="1.5" />
      <line x1="1" y1="32" x2="63" y2="32" stroke="#bfc4d1" strokeWidth="1.5" />
      {([0, 1, 2, 3] as const).map(cell)}
    </svg>
  );
}

// Célula da matriz 2x2 estilo psicotécnico
type MCell =
  | { type: "shape"; kind: ShapeKind; color?: string; rotate?: number }
  | { type: "arrow"; dir: "up" | "right" | "down" | "left"; color?: string }
  | { type: "q" }
  | { type: "empty" };

function MatrixCell({ c }: { c: MCell }) {
  return (
    <div
      className="aspect-square bg-white flex items-center justify-center"
      style={{ border: "1.5px solid #9aa0ad" }}
    >
      {c.type === "shape" && (
        <CShape kind={c.kind} color={c.color ?? NAVY} rotate={c.rotate ?? 0} size={78} />
      )}
      {c.type === "arrow" && <Arrow dir={c.dir} color={c.color ?? NAVY} size={68} />}
      {c.type === "q" && (
        <span className="text-5xl font-light text-zinc-400">?</span>
      )}
    </div>
  );
}

function Matrix2x2({ cells }: { cells: [MCell, MCell, MCell, MCell] }) {
  return (
    <div className="mx-auto grid grid-cols-2 gap-2 max-w-[280px]">
      {cells.map((c, i) => (
        <MatrixCell key={i} c={c} />
      ))}
    </div>
  );
}

// Helper: opção como célula única (mesmo estilo)
const optShape = (kind: ShapeKind, color = NAVY) => () => (
  <div
    className="aspect-square w-full flex items-center justify-center bg-white"
    style={{ border: "1.5px solid #9aa0ad" }}
  >
    <CShape kind={kind} color={color} size={68} />
  </div>
);
const optArrow = (dir: "up" | "right" | "down" | "left", color = NAVY) => () => (
  <div
    className="aspect-square w-full flex items-center justify-center bg-white"
    style={{ border: "1.5px solid #9aa0ad" }}
  >
    <Arrow dir={dir} color={color} size={60} />
  </div>
);

// Helpers para montar células da matriz
const sC = (kind: ShapeKind, color = NAVY, rotate = 0): MCell => ({
  type: "shape",
  kind,
  color,
  rotate,
});
const aC = (dir: "up" | "right" | "down" | "left", color = NAVY): MCell => ({
  type: "arrow",
  dir,
  color,
});
const Q: MCell = { type: "q" };

// Cada questão mostra uma matriz 2x2 com 3 figuras + "?" e 4 alternativas A/B/C/D
const LOG_QUESTIONS: LogQuestion[] = [
  // 1 — repetição simples
  {
    question: "Observe a matriz e descubra a figura que completa o conjunto:",
    prompt: () => (
      <Matrix2x2 cells={[sC("diamond"), sC("diamond"), sC("diamond"), Q]} />
    ),
    options: [
      { key: "A", render: optShape("circle") },
      { key: "B", render: optShape("diamond") },
      { key: "C", render: optShape("square") },
      { key: "D", render: optShape("diamond", GRN) },
    ],
    correct: "B",
    explain: "Todas as células contêm o mesmo losango azul; a quarta segue o padrão.",
  },
  // 2 — repetição com cor
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[sC("circle", YLW), sC("circle", YLW), sC("circle", YLW), Q]}
      />
    ),
    options: [
      { key: "A", render: optShape("circle", YLW) },
      { key: "B", render: optShape("square", YLW) },
      { key: "C", render: optShape("triangle", YLW) },
      { key: "D", render: optShape("circle", NAVY) },
    ],
    correct: "A",
    explain: "As três células mostram o mesmo círculo amarelo; a quarta repete o padrão.",
  },
  // 3 — par por linha (cada linha tem losango + círculo)
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("diamond"), sC("circle"), sC("diamond"), Q]} />
    ),
    options: [
      { key: "A", render: optShape("diamond") },
      { key: "B", render: optShape("square") },
      { key: "C", render: optShape("circle") },
      { key: "D", render: optShape("triangle") },
    ],
    correct: "C",
    explain: "Cada linha contém um losango e um círculo. A linha de baixo precisa do círculo.",
  },
  // 4 — coluna constante (quadrado na 2ª coluna)
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("triangle"), sC("square"), Q, sC("square")]} />
    ),
    options: [
      { key: "A", render: optShape("square") },
      { key: "B", render: optShape("circle") },
      { key: "C", render: optShape("triangle") },
      { key: "D", render: optShape("diamond") },
    ],
    correct: "C",
    explain: "A 2ª coluna tem quadrados e a 1ª tem triângulos. Falta o triângulo embaixo.",
  },
  // 5 — alternância de cor por coluna
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[sC("circle", RED), sC("circle", NAVY), sC("circle", RED), Q]}
      />
    ),
    options: [
      { key: "A", render: optShape("circle", RED) },
      { key: "B", render: optShape("circle", NAVY) },
      { key: "C", render: optShape("circle", GRN) },
      { key: "D", render: optShape("circle", YLW) },
    ],
    correct: "B",
    explain: "1ª coluna sempre vermelha, 2ª coluna sempre azul. Falta o círculo azul.",
  },
  // 6 — setas todas iguais
  {
    question: "Qual seta completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[aC("left"), aC("left"), aC("left"), Q]} />
    ),
    options: [
      { key: "A", render: optArrow("right") },
      { key: "B", render: optArrow("left") },
      { key: "C", render: optArrow("up") },
      { key: "D", render: optArrow("down") },
    ],
    correct: "B",
    explain: "Todas as setas apontam para a esquerda; a quarta segue o padrão.",
  },
  // 7 — rotação 90° horário (cima → direita → baixo → esquerda)
  {
    question: "As setas giram 90° no sentido horário. Qual completa?",
    prompt: () => (
      <Matrix2x2 cells={[aC("up"), aC("right"), aC("down"), Q]} />
    ),
    options: [
      { key: "A", render: optArrow("up") },
      { key: "B", render: optArrow("right") },
      { key: "C", render: optArrow("down") },
      { key: "D", render: optArrow("left") },
    ],
    correct: "D",
    explain: "Cima → direita → baixo → esquerda (giro de 90° horário).",
  },
  // 8 — par triângulo+losango por linha
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("triangle"), sC("diamond"), sC("triangle"), Q]} />
    ),
    options: [
      { key: "A", render: optShape("triangle") },
      { key: "B", render: optShape("circle") },
      { key: "C", render: optShape("diamond") },
      { key: "D", render: optShape("square") },
    ],
    correct: "C",
    explain: "Cada linha tem triângulo seguido de losango. Falta o losango.",
  },
  // 9 — coluna esquerda = círculo
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("circle"), sC("square"), Q, sC("square")]} />
    ),
    options: [
      { key: "A", render: optShape("circle") },
      { key: "B", render: optShape("square") },
      { key: "C", render: optShape("diamond") },
      { key: "D", render: optShape("triangle") },
    ],
    correct: "A",
    explain: "A 1ª coluna tem círculos; a 2ª tem quadrados. Falta o círculo embaixo.",
  },
  // 10 — par de cores por linha
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[
          sC("diamond", GRN),
          sC("diamond", NAVY),
          sC("diamond", GRN),
          Q,
        ]}
      />
    ),
    options: [
      { key: "A", render: optShape("diamond", GRN) },
      { key: "B", render: optShape("diamond", NAVY) },
      { key: "C", render: optShape("circle", NAVY) },
      { key: "D", render: optShape("square", NAVY) },
    ],
    correct: "B",
    explain: "Em cada linha: losango verde + losango azul. Falta o losango azul.",
  },
  // 11 — diagonal igual
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("square"), sC("circle"), sC("circle"), Q]} />
    ),
    options: [
      { key: "A", render: optShape("circle") },
      { key: "B", render: optShape("square") },
      { key: "C", render: optShape("triangle") },
      { key: "D", render: optShape("diamond") },
    ],
    correct: "B",
    explain: "A diagonal principal (canto sup. esq. e inf. dir.) tem quadrados.",
  },
  // 12 — cor varia por linha, forma por coluna
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[
          sC("circle", NAVY),
          sC("diamond", NAVY),
          sC("circle", RED),
          Q,
        ]}
      />
    ),
    options: [
      { key: "A", render: optShape("circle", RED) },
      { key: "B", render: optShape("diamond", NAVY) },
      { key: "C", render: optShape("diamond", RED) },
      { key: "D", render: optShape("square", RED) },
    ],
    correct: "C",
    explain: "A linha de baixo é toda vermelha; a 2ª coluna são losangos. Logo: losango vermelho.",
  },
  // 13 — par cima/baixo
  {
    question: "Qual seta completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[aC("up"), aC("down"), aC("up"), Q]} />
    ),
    options: [
      { key: "A", render: optArrow("up") },
      { key: "B", render: optArrow("left") },
      { key: "C", render: optArrow("down") },
      { key: "D", render: optArrow("right") },
    ],
    correct: "C",
    explain: "Cada linha alterna seta para cima e seta para baixo.",
  },
  // 14 — quadrado + triângulo por linha
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("square"), sC("triangle"), sC("square"), Q]} />
    ),
    options: [
      { key: "A", render: optShape("square") },
      { key: "B", render: optShape("circle") },
      { key: "C", render: optShape("triangle") },
      { key: "D", render: optShape("diamond") },
    ],
    correct: "C",
    explain: "Cada linha: quadrado seguido de triângulo.",
  },
  // 15 — mesma forma, cores alternam por coluna
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[
          sC("triangle", NAVY),
          sC("triangle", GRN),
          sC("triangle", NAVY),
          Q,
        ]}
      />
    ),
    options: [
      { key: "A", render: optShape("triangle", NAVY) },
      { key: "B", render: optShape("triangle", GRN) },
      { key: "C", render: optShape("circle", GRN) },
      { key: "D", render: optShape("square", GRN) },
    ],
    correct: "B",
    explain: "A 1ª coluna é azul e a 2ª é verde; todas são triângulos.",
  },
  // 16 — três iguais + ?
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[
          sC("square", RED),
          sC("square", RED),
          sC("square", RED),
          Q,
        ]}
      />
    ),
    options: [
      { key: "A", render: optShape("circle", RED) },
      { key: "B", render: optShape("square", NAVY) },
      { key: "C", render: optShape("square", RED) },
      { key: "D", render: optShape("triangle", RED) },
    ],
    correct: "C",
    explain: "As três células mostram o quadrado vermelho; a quarta repete o padrão.",
  },
  // 17 — combinação cor+direção
  {
    question: "Qual seta completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[
          aC("left", RED),
          aC("right", NAVY),
          aC("left", RED),
          Q,
        ]}
      />
    ),
    options: [
      { key: "A", render: optArrow("left", NAVY) },
      { key: "B", render: optArrow("right", NAVY) },
      { key: "C", render: optArrow("right", RED) },
      { key: "D", render: optArrow("left", RED) },
    ],
    correct: "B",
    explain: "Cada linha: seta vermelha à esquerda + seta azul à direita.",
  },
  // 18 — cor muda por linha
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2
        cells={[
          sC("diamond", NAVY),
          sC("diamond", NAVY),
          sC("diamond", GRN),
          Q,
        ]}
      />
    ),
    options: [
      { key: "A", render: optShape("diamond", NAVY) },
      { key: "B", render: optShape("diamond", GRN) },
      { key: "C", render: optShape("circle", GRN) },
      { key: "D", render: optShape("square", GRN) },
    ],
    correct: "B",
    explain: "A linha de cima é azul, a de baixo é verde; todos são losangos.",
  },
  // 19 — círculo + triângulo
  {
    question: "Qual figura completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[sC("circle"), sC("triangle"), sC("circle"), Q]} />
    ),
    options: [
      { key: "A", render: optShape("square") },
      { key: "B", render: optShape("circle") },
      { key: "C", render: optShape("diamond") },
      { key: "D", render: optShape("triangle") },
    ],
    correct: "D",
    explain: "Cada linha: círculo seguido de triângulo.",
  },
  // 20 — todas iguais (setas para a direita)
  {
    question: "Qual seta completa a matriz?",
    prompt: () => (
      <Matrix2x2 cells={[aC("right"), aC("right"), aC("right"), Q]} />
    ),
    options: [
      { key: "A", render: optArrow("left") },
      { key: "B", render: optArrow("down") },
      { key: "C", render: optArrow("right") },
      { key: "D", render: optArrow("up") },
    ],
    correct: "C",
    explain: "Todas as setas apontam para a direita.",
  },
];

function Logico({
  speech,
  onDone,
}: {
  speech: ReturnType<typeof useSpeech>;
  onDone: (r: { correct: number; total: number }) => void;
}) {
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    if (phase === "intro")
      speech.speak(
        "Teste de raciocínio lógico. Olhe as figuras geométricas e escolha a alternativa que responde à pergunta. Pense com calma antes de marcar.",
      );
  }, [phase, speech]);

  const q = LOG_QUESTIONS[i];

  function next() {
    setPicked(null);
    if (i + 1 >= LOG_QUESTIONS.length) {
      setPhase("done");
    } else {
      setI(i + 1);
    }
  }

  return (
    <div className="glass rounded-3xl p-5 md:p-6 shadow-card">
      <TestHeader
        title="4/4 · Raciocínio Lógico"
        subtitle="Figuras geométricas — encontre o padrão"
      />
      {phase === "intro" && (
        <Intro
          bullets={[
            `${LOG_QUESTIONS.length} questões de figuras, padrões e sequências.`,
            "Cada pergunta tem 4 alternativas (A, B, C, D).",
            "Modo treino: ao errar, mostramos a explicação do padrão.",
            "Analise lados, posição, cor e rotação com calma.",
          ]}
          onStart={() => {
            speech.stop();
            setI(0);
            setCorrect(0);
            setPicked(null);
            setPhase("running");
          }}
          speech={speech}
          replayText="Escolha a alternativa correta para cada pergunta de figuras geométricas."
        />
      )}
      {phase === "running" && (
        <div>
          <div className="text-sm font-semibold mb-2">
            Questão {i + 1}/{LOG_QUESTIONS.length} · Acertos: {correct}
          </div>
          <p className="text-base md:text-lg font-medium mb-4">{q.question}</p>
          {q.prompt && <div className="mb-5">{q.prompt()}</div>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {q.options.map((opt) => {
              const isPicked = picked === opt.key;
              const isCorrect = q.correct === opt.key;
              const reveal = picked !== null;
              return (
                <button
                  key={opt.key}
                  onClick={() => {
                    if (picked !== null) return;
                    setPicked(opt.key);
                    if (opt.key === q.correct) setCorrect((c) => c + 1);
                  }}
                  className={`rounded-2xl border-2 bg-white p-4 flex flex-col items-center gap-2 transition-all ${
                    reveal && isCorrect
                      ? "border-success bg-success/10"
                      : reveal && isPicked
                        ? "border-destructive bg-destructive/10"
                        : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="self-start text-xs font-bold text-zinc-700">
                    {opt.key}
                  </span>
                  {opt.render()}
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {picked !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-2xl border ${
                  picked === q.correct
                    ? "border-success/40 bg-success/5"
                    : "border-destructive/40 bg-destructive/5"
                }`}
              >
                <p className="text-sm font-semibold flex items-center gap-2">
                  {picked === q.correct ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                  Resposta: {q.correct}
                </p>
                <p className="text-sm text-foreground/90 mt-1">{q.explain}</p>
                <button
                  onClick={next}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold"
                >
                  {i + 1 >= LOG_QUESTIONS.length ? "Ver resultado" : "Próxima"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {phase === "done" && (
        <DoneNext
          summary={`${correct}/${LOG_QUESTIONS.length} acertos lógicos`}
          onNext={() => onDone({ correct, total: LOG_QUESTIONS.length })}
        />
      )}
    </div>
  );
}

// ===================== Shared components =====================
function TestHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <p className="text-xs uppercase tracking-widest text-primary-glow font-semibold">
        {title}
      </p>
      <h2 className="text-xl font-display font-bold">{subtitle}</h2>
    </div>
  );
}

function Intro({
  bullets,
  onStart,
  speech,
  replayText,
}: {
  bullets: string[];
  onStart: () => void;
  speech: ReturnType<typeof useSpeech>;
  replayText: string;
}) {
  return (
    <div>
      <ul className="space-y-2 mb-4">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="text-sm flex items-start gap-2 p-3 rounded-xl bg-secondary/40 border border-border"
          >
            <span className="text-primary font-bold">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
        >
          <Play className="h-4 w-4" /> Iniciar
        </button>
        <button
          onClick={() => speech.speak(replayText)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass text-sm"
        >
          <Volume2 className="h-4 w-4" /> Ouvir novamente
        </button>
      </div>
    </div>
  );
}

function DoneNext({
  summary,
  onNext,
}: {
  summary: string;
  onNext: () => void;
}) {
  return (
    <div className="text-center py-6">
      <Check className="h-10 w-10 text-success mx-auto" />
      <p className="mt-2 font-semibold">{summary}</p>
      <button
        onClick={onNext}
        className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
      >
        Continuar <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Result({
  scores,
  onRestart,
}: {
  scores: ScoreMap;
  onRestart: () => void;
}) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 shadow-glow">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4 shadow-glow">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-display font-bold">
          Avaliação Psicotécnica Concluída
        </h2>
        <p className="text-muted-foreground mt-1">
          Veja seu desempenho em cada teste.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        <ResultCard
          title="Risquinhos (palográfico)"
          lines={[
            `Traços totais: ${scores.palografico?.strokes ?? 0}`,
            `Linhas concluídas: ${scores.palografico?.lines ?? 0}`,
            `Constância: ${Math.round(scores.palografico?.consistency ?? 0)}%`,
          ]}
        />
        <ResultCard
          title="Atenção"
          lines={[
            `Acertos: ${scores.atencao?.correct ?? 0}/${scores.atencao?.total ?? 0}`,
          ]}
        />
        <ResultCard
          title="Memória rápida"
          lines={[`Objetos lembrados: ${scores.memoria?.items ?? 0}`]}
        />
        <ResultCard
          title="Raciocínio lógico"
          lines={[
            `Acertos: ${scores.logico?.correct ?? 0}/${scores.logico?.total ?? 0}`,
          ]}
        />
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={onRestart}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
        >
          <RotateCcw className="h-4 w-4" /> Refazer avaliação
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass font-semibold"
        >
          Início
        </Link>
      </div>
    </div>
  );
}

function ResultCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="mt-1 space-y-0.5">
        {lines.map((l, i) => (
          <p key={i} className="text-sm font-semibold">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

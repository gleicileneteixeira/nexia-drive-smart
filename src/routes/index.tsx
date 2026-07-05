import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import {
  Sparkles,
  Flame,
  Zap,
  TrafficCone,
  Trophy,
  Target,
  TrendingUp,
  Brain,
  Library,
} from "lucide-react";
import { CATEGORY_LABELS } from "@/data/questions";

export const Route = createFileRoute("/")({
  component: HomeGate,
  head: () => ({
    meta: [
      { title: "Nexia Simulado DETRAN — As questões que realmente caem" },
      {
        name: "description",
        content:
          "Plataforma inteligente de simulados para a prova teórica do DETRAN. Foque no que mais cai e seja aprovado rápido.",
      },
    ],
  }),
});

const QUICK = [
  {
    to: "/simulado",
    label: "Simulado Rápido",
    desc: "30 questões inteligentes",
    icon: Sparkles,
    accent: "from-primary to-primary-glow",
  },
  {
    to: "/mais-caem",
    label: "Mais Caem",
    desc: "Foco no que importa",
    icon: Flame,
    accent: "from-destructive to-warning",
  },
  {
    to: "/placas",
    label: "Placas Mais Caem",
    desc: "Treino adaptativo de placas",
    icon: TrafficCone,
    accent: "from-warning to-destructive",
  },
  {
    to: "/psicotecnico",
    label: "Psicotécnico",
    desc: "4 testes do exame oficial",
    icon: Brain,
    accent: "from-primary-glow to-primary",
  },
  {
    to: "/turbo",
    label: "Revisão Turbo",
    desc: "Memorize no swipe",
    icon: Zap,
    accent: "from-warning to-warning",
  },
  {
    to: "/biblioteca",
    label: "Biblioteca",
    desc: "Livros e materiais",
    icon: Library,
    accent: "from-primary to-warning",
  },
] as const;

const PERFORMANCE = [
  { cat: "Legislação", v: 84 },
  { cat: "Placas", v: 92 },
  { cat: "Direção Def.", v: 71 },
  { cat: "Primeiros Soc.", v: 58 },
  { cat: "Infrações", v: 78 },
  { cat: "Prioridade", v: 65 },
];

const PROGRESS = [{ name: "progresso", value: 76, fill: "var(--color-primary)" }];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-8">
      {/* Hero */}
      <section className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 glass rounded-3xl p-6 md:p-8 shadow-card relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm uppercase tracking-widest text-primary-glow font-semibold">
              Bem-vindo de volta
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-bold mt-2">
              Você está a <span className="gradient-text">7 dias</span> da sua
              aprovação.
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Continue treinando com as questões que mais caem. Seu desempenho
              sobe a cada simulado.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/simulado"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <Sparkles className="h-5 w-5" />
                Iniciar Simulado
              </Link>
              <Link
                to="/turbo"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass font-semibold hover:bg-accent/30 transition-colors"
              >
                <Zap className="h-5 w-5 text-warning" />
                Revisão Turbo
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6 shadow-card relative overflow-hidden"
        >
          <p className="text-sm text-muted-foreground">Progresso geral</p>
          <div className="h-40 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={PROGRESS}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  tick={false}
                />
                <RadialBar dataKey="value" cornerRadius={20} background />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="-mt-32 text-center pointer-events-none">
            <p className="text-4xl font-display font-bold gradient-text">76%</p>
            <p className="text-xs text-muted-foreground">de acertos</p>
          </div>
          <div className="mt-20 grid grid-cols-3 gap-2 text-center">
            <Stat label="Resp." value="412" />
            <Stat label="XP" value="3.420" />
            <Stat label="Nível" value="7" />
          </div>
        </motion.div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {QUICK.map((q, i) => {
          const Icon = q.icon;
          return (
            <motion.div
              key={q.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Link
                to={q.to}
                className="group block glass rounded-2xl p-4 hover:bg-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-glow h-full"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${q.accent} flex items-center justify-center mb-3 shadow-card`}
                >
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-semibold text-sm">{q.label}</p>
                <p className="text-xs text-muted-foreground">{q.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </section>

      {/* Performance chart */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 glass rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-display font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Desempenho por categoria
              </h2>
              <p className="text-xs text-muted-foreground">
                % de acertos nos últimos simulados
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE} margin={{ left: -16 }}>
                <XAxis
                  dataKey="cat"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-accent)", opacity: 0.3 }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="v" radius={[8, 8, 0, 0]}>
                  {PERFORMANCE.map((d, i) => (
                    <Cell
                      key={i}
                      fill={
                        d.v >= 80
                          ? "var(--color-success)"
                          : d.v >= 65
                            ? "var(--color-primary)"
                            : "var(--color-destructive)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 shadow-card">
          <h2 className="text-lg font-display font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-destructive" />
            Pontos fracos
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Foque aqui para destravar
          </p>
          <ul className="space-y-3">
            {[
              { cat: "primeiros-socorros", v: 58 },
              { cat: "prioridade", v: 65 },
              { cat: "direcao-defensiva", v: 71 },
            ].map((w) => (
              <li key={w.cat} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>
                    {CATEGORY_LABELS[w.cat as keyof typeof CATEGORY_LABELS]}
                  </span>
                  <span className="text-muted-foreground">{w.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w.v}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      w.v < 70
                        ? "bg-destructive"
                        : "bg-warning"
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Medalhas */}
      <section className="glass rounded-3xl p-6 shadow-card">
        <h2 className="text-lg font-display font-bold flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-warning" />
          Medalhas recentes
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { e: "🚦", n: "Mestre das Placas" },
            { e: "🧠", n: "Caçador de Pegadinhas" },
            { e: "🛡️", n: "Direção Defensiva" },
            { e: "🔥", n: "Streak 7 dias" },
            { e: "⚡", n: "Reflexo Rápido" },
          ].map((m) => (
            <div
              key={m.n}
              className="shrink-0 w-32 rounded-2xl glass p-3 text-center"
            >
              <div className="text-3xl mb-1">{m.e}</div>
              <p className="text-xs font-medium leading-tight">{m.n}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-base font-display font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

import { motion } from "framer-motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10";
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <div className="flex items-center gap-2.5">
      <motion.div
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={`${dims} aspect-square rounded-xl gradient-primary flex items-center justify-center shadow-glow`}
      >
        <span className="font-display font-bold text-primary-foreground text-lg">
          N
        </span>
      </motion.div>
      <div className="flex flex-col leading-tight">
        <span className={`font-display font-bold ${text}`}>
          Nexia<span className="gradient-text"> Simulado</span>
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          DETRAN · As que realmente caem
        </span>
      </div>
    </div>
  );
}

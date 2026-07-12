import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X, Loader2 } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const RATED_KEY = "nexia:rating:rated";
const DISMISSED_AT_KEY = "nexia:rating:dismissedAt";
const SESSION_SHOWN_KEY = "nexia:rating:sessionShown";
const SESSION_START_KEY = "nexia:rating:sessionStart";
const COOLDOWN_MS = 1000 * 60 * 60 * 24 * 3; // 3 dias
const MIN_SESSION_MS = 1000 * 60; // 1 minuto na sessão antes do gatilho de troca de aba

function canPrompt(): boolean {
  if (typeof window === "undefined") return false;
  if (window.localStorage.getItem(RATED_KEY) === "1") return false;
  if (window.sessionStorage.getItem(SESSION_SHOWN_KEY) === "1") return false;
  const dismissed = Number(window.localStorage.getItem(DISMISSED_AT_KEY) ?? 0);
  if (dismissed && Date.now() - dismissed < COOLDOWN_MS) return false;
  return true;
}

function markShownThisSession() {
  try {
    window.sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
  } catch {}
}

export function triggerRatingPrompt(reason: "simulado-done" | "route-change" | "login" | "manual") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("nexia:rating:trigger", { detail: { reason } }));
}

export function RatingPrompt() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [manual, setManual] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existingLoaded, setExistingLoaded] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);
  const lastPath = useRef<string>(pathname);

  // Marca início de sessão do usuário
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.sessionStorage.getItem(SESSION_START_KEY)) {
      window.sessionStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }
  }, []);

  // Sincroniza "já avaliou" a partir do banco quando faz login
  useEffect(() => {
    if (!user) {
      setExistingLoaded(false);
      setHasExisting(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("app_ratings")
        .select("rating, comment")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        window.localStorage.setItem(RATED_KEY, "1");
        setHasExisting(true);
        setRating(data.rating ?? 0);
        setComment(data.comment ?? "");
      } else {
        window.localStorage.removeItem(RATED_KEY);
        setHasExisting(false);
      }
      setExistingLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Gatilho por troca de aba (após min. sessão)
  useEffect(() => {
    if (!user || !existingLoaded) return;
    if (pathname === lastPath.current) return;
    const prev = lastPath.current;
    lastPath.current = pathname;
    if (prev === "/auth" || pathname === "/auth") return;
    const start = Number(window.sessionStorage.getItem(SESSION_START_KEY) ?? Date.now());
    if (Date.now() - start < MIN_SESSION_MS) return;
    if (!canPrompt()) return;
    setManual(false);
    setOpen(true);
    markShownThisSession();
  }, [pathname, user, existingLoaded]);

  // Gatilho por evento custom (fim de simulado, login, manual)
  useEffect(() => {
    function onTrigger(e: Event) {
      const detail = (e as CustomEvent).detail as { reason?: string } | undefined;
      const reason = detail?.reason ?? "manual";
      if (!user) return;
      if (reason === "manual") {
        setManual(true);
        setOpen(true);
        return;
      }
      if (!canPrompt()) return;
      setManual(false);
      setOpen(true);
      markShownThisSession();
    }
    window.addEventListener("nexia:rating:trigger", onTrigger as EventListener);
    return () => window.removeEventListener("nexia:rating:trigger", onTrigger as EventListener);
  }, [user]);

  function dismiss() {
    if (!manual) {
      window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    }
    setOpen(false);
  }

  async function submit() {
    if (!user || rating < 1) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("app_ratings")
      .upsert(
        {
          user_id: user.id,
          rating,
          comment: comment.trim() ? comment.trim() : null,
        },
        { onConflict: "user_id" },
      );
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível salvar sua avaliação.");
      return;
    }
    window.localStorage.setItem(RATED_KEY, "1");
    window.localStorage.removeItem(DISMISSED_AT_KEY);
    setHasExisting(true);
    setOpen(false);
    toast.success(hasExisting ? "Avaliação atualizada. Valeu!" : "Obrigado pela avaliação!");
  }

  if (!user) return null;

  const active = hover || rating;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-background/70 backdrop-blur-sm p-3"
          onClick={dismiss}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-3xl w-full max-w-md p-6 shadow-glow border border-border/50 relative"
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs uppercase tracking-widest text-primary-glow font-semibold">
              {hasExisting ? "Atualize sua avaliação" : "Como está sua experiência?"}
            </p>
            <h2 className="text-xl font-display font-bold mt-1">
              {hasExisting ? "Mudou de ideia? Reavalie o app." : "Sua nota ajuda a melhorar o app."}
            </h2>

            <div className="flex justify-center gap-1.5 my-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(n)}
                  className="p-1 transition-transform hover:scale-110 active:scale-95"
                  aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`h-9 w-9 ${
                      n <= active
                        ? "fill-warning text-warning"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <label className="text-xs font-semibold text-muted-foreground">
              Comentário (opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))}
              rows={3}
              placeholder="Conta pra gente o que você achou…"
              className="mt-1 w-full rounded-xl bg-background/50 border border-border p-3 text-sm resize-none focus:outline-none focus:border-primary/50"
            />

            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={dismiss}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary"
              >
                Agora não
              </button>
              <button
                onClick={submit}
                disabled={rating < 1 || submitting}
                className="flex-1 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-glow disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {hasExisting ? "Atualizar" : "Enviar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
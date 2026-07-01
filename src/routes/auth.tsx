import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Entrar — Nexia DETRAN" }] }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [employment, setEmployment] = useState<"carteira_assinada" | "autonomo" | "nao_trabalha" | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!name.trim() || !cpf.trim() || !phone.trim() || !employment) {
          throw new Error("Preencha nome, CPF, telefone e vínculo de trabalho.");
        }
        const cpfDigits = cpf.replace(/\D/g, "");
        if (cpfDigits.length !== 11) throw new Error("CPF deve conter 11 dígitos.");
        const { data: signUpData, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              display_name: name || email,
              cpf: cpfDigits,
              phone,
              employment_status: employment,
            },
          },
        });
        if (error) throw error;
        const userId = signUpData.user?.id;
        if (userId) {
          const { error: pErr } = await supabase.from("profiles").upsert({
            id: userId,
            display_name: name || email,
            email,
            cpf: cpfDigits,
            phone,
            employment_status: employment,
          });
          if (pErr) throw pErr;
        }
        toast.success("Conta criada! Verifique seu email se necessário.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vinda de volta!");
      }
      navigate({ to: "/simulado" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="glass rounded-3xl p-8 shadow-card">
        <h1 className="text-2xl font-display font-bold mb-1">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login" ? "Acesse sua conta admin" : "Crie uma conta nova"}
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  required
                  inputMode="numeric"
                  placeholder="Somente números"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                <Input
                  id="phone"
                  required
                  inputMode="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employment">Vínculo de trabalho</Label>
                <select
                  id="employment"
                  required
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value as typeof employment)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
                >
                  <option value="">Selecione…</option>
                  <option value="carteira_assinada">Carteira assinada</option>
                  <option value="autonomo">Autônomo(a)</option>
                  <option value="nao_trabalha">Não trabalho no momento</option>
                </select>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center"
        >
          {mode === "login" ? "Não tem conta? Criar uma" : "Já tem conta? Entrar"}
        </button>
        <Link to="/" className="mt-2 block text-xs text-muted-foreground text-center hover:text-foreground">
          ← Voltar para o início
        </Link>
      </div>
    </div>
  );
}

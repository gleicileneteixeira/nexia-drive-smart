import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, User, ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Entrar — Nexia DETRAN" }] }),
});

type Employment = "clt" | "autonomo" | "estudante" | "trabalha_estuda" | "desempregado" | "outro";

function AuthPage() {
  const navigate = useNavigate();
  const [portal, setPortal] = useState<"user" | "admin">("user");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [employment, setEmployment] = useState<Employment | "">("");
  const [employmentOther, setEmploymentOther] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: portal === "admin" ? "/admin" : "/" });
    });
  }, [navigate, portal]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!name.trim() || !phone.trim() || !employment) {
          throw new Error("Preencha todos os campos obrigatórios.");
        }
        if (employment === "outro" && !employmentOther.trim()) {
          throw new Error("Descreva sua situação profissional.");
        }
        const { data: signUpData, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              display_name: name,
              phone,
              employment_status: employment,
            },
          },
        });
        if (error) {
          if (error.message.toLowerCase().includes("already")) {
            throw new Error("Este e-mail já está cadastrado. Faça login.");
          }
          throw error;
        }
        const userId = signUpData.user?.id;
        if (userId) {
          const { error: pErr } = await supabase.from("profiles").upsert({
            id: userId,
            display_name: name,
            email,
            phone,
            employment_status: employment,
            employment_other: employment === "outro" ? employmentOther : null,
          });
          if (pErr) {
            if (pErr.code === "23505") throw new Error("Este e-mail já está cadastrado.");
            throw pErr;
          }
        }
        toast.success("Conta criada! Bem-vinda(o).");
        navigate({ to: "/" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vinda(o) de volta!");
        navigate({ to: portal === "admin" ? "/admin" : "/" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  }

  async function onForgot(e: React.FormEvent) {
    e.preventDefault();
    setForgotLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Enviamos um link de redefinição para seu e-mail.");
      setForgotOpen(false);
      setForgotEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setForgotLoading(false);
    }
  }

  const isAdminPortal = portal === "admin";

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Link to="/" className="text-xs text-muted-foreground flex items-center gap-1 mb-3 hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Início
      </Link>
      <Tabs value={portal} onValueChange={(v) => { setPortal(v as "user" | "admin"); setMode("login"); }}>
        <TabsList className="grid grid-cols-2 w-full h-11 mb-4">
          <TabsTrigger value="user" className="gap-2"><User className="h-4 w-4" /> Usuário</TabsTrigger>
          <TabsTrigger value="admin" className="gap-2"><ShieldCheck className="h-4 w-4" /> Gestão</TabsTrigger>
        </TabsList>

        <TabsContent value="user" />
        <TabsContent value="admin" />
      </Tabs>

      <div className={`glass rounded-3xl p-7 shadow-card border ${isAdminPortal ? "border-primary/40" : "border-border/40"}`}>
        {isAdminPortal && (
          <div className="mb-4 flex items-center gap-2 text-xs text-primary bg-primary/10 rounded-lg px-3 py-2">
            <ShieldCheck className="h-4 w-4" /> Acesso restrito à equipe de gestão.
          </div>
        )}
        <h1 className="text-2xl font-display font-bold mb-1">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="text-sm text-muted-foreground mb-5">
          {isAdminPortal
            ? "Acesso administrativo"
            : mode === "login"
            ? "Acesse sua conta"
            : "Cadastro rápido — comece agora"}
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && !isAdminPortal && (
            <>
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input id="phone" required inputMode="tel" placeholder="(00) 00000-0000"
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="employment">Situação profissional *</Label>
                <Select value={employment} onValueChange={(v) => setEmployment(v as Employment)}>
                  <SelectTrigger id="employment" className="h-9 w-full text-base md:text-sm">
                    <SelectValue placeholder="Selecione…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clt">CLT</SelectItem>
                    <SelectItem value="autonomo">Autônomo(a)</SelectItem>
                    <SelectItem value="estudante">Estudante</SelectItem>
                    <SelectItem value="trabalha_estuda">Trabalha e Estuda</SelectItem>
                    <SelectItem value="desempregado">Desempregado(a)</SelectItem>
                    <SelectItem value="outro">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {employment === "outro" && (
                <div>
                  <Label htmlFor="empOther">Descreva *</Label>
                  <Input id="empOther" required value={employmentOther}
                    onChange={(e) => setEmploymentOther(e.target.value)} />
                </div>
              )}

            </>
          )}
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input id="email" type="email" required autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha *</Label>
            <div className="relative">
              <Input id="password" type={showPw ? "text" : "password"} required minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShowPw((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}>
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mode === "login" && (
              <button type="button" onClick={() => { setForgotEmail(email); setForgotOpen(true); }}
                className="mt-2 text-xs text-primary hover:underline">
                Esqueceu sua senha?
              </button>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>
        {!isAdminPortal && (
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center">
            {mode === "login" ? "Não tem conta? Criar uma" : "Já tem conta? Entrar"}
          </button>
        )}
      </div>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recuperar senha</DialogTitle>
            <DialogDescription>
              Informe seu e-mail. Enviaremos um link seguro para você redefinir sua senha.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onForgot} className="space-y-4">
            <div>
              <Label htmlFor="forgotEmail">E-mail</Label>
              <Input id="forgotEmail" type="email" required
                value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={forgotLoading} className="w-full">
                {forgotLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Enviar link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

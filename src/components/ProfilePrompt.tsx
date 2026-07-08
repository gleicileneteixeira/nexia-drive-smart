import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { formatCpf, isValidCpf } from "@/lib/cpf";

type Employment =
  | "carteira_assinada"
  | "autonomo"
  | "estudante"
  | "trabalha_estuda"
  | "desempregado"
  | "outro";

const EMPLOYMENT_LABELS: Record<Employment, string> = {
  carteira_assinada: "CLT",
  autonomo: "Autônomo(a)",
  estudante: "Estudante",
  trabalha_estuda: "Trabalha e Estuda",
  desempregado: "Desempregado(a)",
  outro: "Outros",
};

const employmentToDb: Record<Employment, string> = {
  carteira_assinada: "carteira_assinada",
  autonomo: "autonomo",
  estudante: "nao_trabalha",
  trabalha_estuda: "carteira_assinada",
  desempregado: "nao_trabalha",
  outro: "nao_trabalha",
};

export function ProfilePrompt() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [employment, setEmployment] = useState<Employment | "">("");
  const [employmentOther, setEmploymentOther] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, email, cpf, phone, employment_status, employment_other")
        .eq("id", user.id)
        .maybeSingle();

      const name = data?.display_name ?? user.user_metadata?.display_name ?? "";
      const mail = data?.email ?? user.email ?? "";
      const profileCpf = data?.cpf ?? "";
      const profilePhone = data?.phone ?? "";
      const status = normalizeStatus(data?.employment_status ?? user.user_metadata?.employment_status ?? "");

      setDisplayName(name);
      setEmail(mail);
      setCpf(profileCpf);
      setPhone(profilePhone);
      setEmployment(status as Employment | "");
      setEmploymentOther(data?.employment_other ?? "");

      if (!name.trim() || !profileCpf.trim() || !profilePhone.trim() || !status) {
        setOpen(true);
      }
      setLoading(false);
    })();
  }, [user]);

  function normalizeStatus(status: string): string {
    if (!status) return "";
    const map: Record<string, Employment> = {
      clt: "carteira_assinada",
      carteira_assinada: "carteira_assinada",
      autonomo: "autonomo",
      estudante: "estudante",
      trabalha_estuda: "trabalha_estuda",
      desempregado: "desempregado",
      nao_trabalha: "desempregado",
      outro: "outro",
    };
    return map[status] ?? status;
  }

  async function handleSave() {
    if (!user) return;

    if (!displayName.trim()) {
      toast.error("Preencha seu nome completo.");
      return;
    }
    if (!cpf.trim()) {
      toast.error("Preencha seu CPF.");
      return;
    }
    if (!isValidCpf(cpf)) {
      toast.error("CPF inválido. Verifique os números digitados.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Preencha seu telefone.");
      return;
    }
    if (!employment) {
      toast.error("Selecione sua situação profissional.");
      return;
    }
    if (employment === "outro" && !employmentOther.trim()) {
      toast.error("Descreva sua situação profissional.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName.trim(),
        email,
        cpf,
        phone: phone.trim() || null,
        employment_status: employmentToDb[employment as Employment] ?? employment,
        employment_other: employment === "outro" ? employmentOther.trim() : null,
      });

      if (error) {
        if (error.code === "23505") {
          if (error.message?.toLowerCase().includes("cpf")) {
            throw new Error("Este CPF já está cadastrado em outra conta. Verifique ou entre em contato com o suporte.");
          }
          throw new Error("Este e-mail já está cadastrado.");
        }
        throw error;
      }

      toast.success("Cadastro atualizado!");
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !open) return null;

  const missingCpf = !cpf.trim();
  const missingPhone = !phone.trim();
  const missingEmployment = !employment;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card rounded-2xl p-6 max-w-md w-full shadow-xl border max-h-[90vh] overflow-y-auto">
        <h2 className="font-display font-bold text-xl mb-1">Complete seu cadastro</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Para continuar, preencha os campos abaixo. Você pode editar os dados já cadastrados.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="pp-name">Nome completo *</Label>
            <Input
              id="pp-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <Label htmlFor="pp-email">E-mail (não editável)</Label>
            <div className="relative">
              <Input id="pp-email" value={email} disabled readOnly className="pr-10" />
              <Lock className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div>
            <Label htmlFor="pp-cpf">CPF *</Label>
            <Input
              id="pp-cpf"
              inputMode="numeric"
              maxLength={14}
              value={formatCpf(cpf)}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              className={missingCpf ? "border-warning" : ""}
            />
            {missingCpf && (
              <p className="text-xs text-warning mt-1">Preencha seu CPF para continuar.</p>
            )}
          </div>

          <div>
            <Label htmlFor="pp-phone">Telefone *</Label>
            <Input
              id="pp-phone"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              className={missingPhone ? "border-warning" : ""}
            />
            {missingPhone && (
              <p className="text-xs text-warning mt-1">Preencha seu telefone para continuar.</p>
            )}
          </div>

          <div>
            <Label htmlFor="pp-employment">Situação profissional *</Label>
            <Select value={employment} onValueChange={(v) => setEmployment(v as Employment)}>
              <SelectTrigger
                id="pp-employment"
                className={`h-9 w-full text-base md:text-sm ${missingEmployment ? "border-warning" : ""}`}
              >
                <SelectValue placeholder="Selecione…" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(EMPLOYMENT_LABELS) as Employment[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {EMPLOYMENT_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {missingEmployment && (
              <p className="text-xs text-warning mt-1">Selecione sua situação profissional.</p>
            )}
          </div>

          {employment === "outro" && (
            <div>
              <Label htmlFor="pp-empOther">Descreva *</Label>
              <Input
                id="pp-empOther"
                value={employmentOther}
                onChange={(e) => setEmploymentOther(e.target.value)}
                placeholder="Descreva sua situação"
              />
            </div>
          )}

          <Button className="w-full mt-2" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar e continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

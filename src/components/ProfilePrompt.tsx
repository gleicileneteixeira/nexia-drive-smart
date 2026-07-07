import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ProfilePrompt() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [phone, setPhone] = useState("");
  const [employment, setEmployment] = useState<string>("");
  const [employmentOther, setEmploymentOther] = useState("");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("phone, employment_status, employment_other")
        .eq("id", user.id)
        .maybeSingle();
      if (data && (!data.phone || !data.employment_status)) {
        setPhone(data.phone ?? "");
        setEmployment(data.employment_status ?? "");
        setEmploymentOther(data.employment_other ?? "");
        setOpen(true);
      }
      setLoading(false);
    })();
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        phone: phone || null,
        employment_status: employment || null,
        employment_other: employment === "outro" ? employmentOther : null,
      });
      if (error) throw error;
      toast.success("Cadastro atualizado!");
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-card rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl border">
        <h2 className="font-display font-bold text-lg mb-1">Complete seu cadastro</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Seu cadastro está incompleto. Preencha os campos abaixo para continuar.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="pp-phone">Telefone</Label>
            <Input id="pp-phone" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000" />
          </div>

          <div>
            <Label htmlFor="pp-employment">Situação profissional</Label>
            <Select value={employment} onValueChange={setEmployment}>
              <SelectTrigger id="pp-employment" className="h-9 w-full text-base md:text-sm">
                <SelectValue placeholder="Selecione…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carteira_assinada">CLT</SelectItem>
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
              <Label htmlFor="pp-empOther">Descreva</Label>
              <Input id="pp-empOther" value={employmentOther}
                onChange={(e) => setEmploymentOther(e.target.value)} />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)} disabled={saving}>
              Depois
            </Button>
            <Button className="flex-1" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

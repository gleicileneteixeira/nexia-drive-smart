import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLibraryItems, checkIsAdmin, type LibraryItem, type LibraryItemType } from "@/lib/library";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Pencil, LogOut, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Biblioteca" }] }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(user.email ?? null);
      const ok = await checkIsAdmin();
      setIsAdmin(ok);
      setChecking(false);
    })();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="glass rounded-3xl p-8">
          <h1 className="text-xl font-display font-bold mb-2">Acesso restrito</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Sua conta ({userEmail}) ainda não é administradora.
            Peça pro suporte liberar acesso admin.
          </p>
          <Button variant="outline" onClick={signOut} className="w-full">
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
          <Link to="/" className="block mt-3 text-xs text-muted-foreground">← Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return <AdminDashboard email={userEmail} onSignOut={signOut} />;
}

function AdminDashboard({ email, onSignOut }: { email: string | null; onSignOut: () => void }) {
  const qc = useQueryClient();
  const { data: items = [], refetch } = useQuery({
    queryKey: ["library", "all"],
    queryFn: () => fetchLibraryItems(true),
  });
  const [editing, setEditing] = useState<LibraryItem | null>(null);

  async function onDelete(item: LibraryItem) {
    if (!confirm(`Apagar "${item.title}"?`)) return;
    const { error } = await supabase.from("library_items").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    toast.success("Apagado");
    qc.invalidateQueries({ queryKey: ["library"] });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <Link to="/" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Início
          </Link>
          <h1 className="text-2xl font-display font-bold">Painel Admin</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Button variant="outline" onClick={onSignOut} size="sm">
          <LogOut className="h-4 w-4 mr-2" /> Sair
        </Button>
      </div>

      <ItemForm
        editing={editing}
        onDone={() => {
          setEditing(null);
          refetch();
          qc.invalidateQueries({ queryKey: ["library"] });
        }}
      />

      <div className="glass rounded-2xl p-4">
        <h2 className="font-display font-bold mb-3">Itens ({items.length})</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/50">
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.item_type.toUpperCase()} · {item.published ? "Publicado" : "Rascunho"}
                  {item.is_paid && ` · R$ ${((item.price_cents ?? 0) / 100).toFixed(2)}`}
                </p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setEditing(item)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(item)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">Nenhum item ainda. Adicione abaixo.</p>}
        </div>
      </div>
    </div>
  );
}

function ItemForm({ editing, onDone }: { editing: LibraryItem | null; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState<LibraryItemType>("pdf");
  const [url, setUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [priceCents, setPriceCents] = useState("");
  const [published, setPublished] = useState(true);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description ?? "");
      setItemType(editing.item_type);
      setUrl(editing.url);
      setCoverUrl(editing.cover_url ?? "");
      setIsPaid(editing.is_paid);
      setPriceCents(editing.price_cents ? String(editing.price_cents) : "");
      setPublished(editing.published);
    }
  }, [editing]);

  function reset() {
    setTitle(""); setDescription(""); setItemType("pdf"); setUrl("");
    setCoverUrl(""); setIsPaid(false); setPriceCents(""); setPublished(true);
    setPdfFile(null); setCoverFile(null);
  }

  async function uploadToBucket(file: File, folder: string): Promise<string> {
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("library").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("library").getPublicUrl(path);
    return data.publicUrl;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let finalUrl = url;
      let finalCover = coverUrl;

      if (itemType === "pdf" && pdfFile) {
        finalUrl = await uploadToBucket(pdfFile, "pdfs");
      }
      if (coverFile) {
        finalCover = await uploadToBucket(coverFile, "covers");
      }

      if (!finalUrl) throw new Error("Informe a URL ou faça upload do arquivo");

      const payload = {
        title,
        description: description || null,
        item_type: itemType,
        url: finalUrl,
        cover_url: finalCover || null,
        is_paid: isPaid,
        price_cents: isPaid && priceCents ? parseInt(priceCents, 10) : null,
        published,
      };

      if (editing) {
        const { error } = await supabase.from("library_items").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Atualizado");
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase.from("library_items").insert({ ...payload, created_by: user?.id });
        if (error) throw error;
        toast.success("Item adicionado");
      }
      reset();
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold">{editing ? "Editar item" : "Adicionar item"}</h2>
        {editing && (
          <Button type="button" variant="ghost" size="sm" onClick={() => { reset(); onDone(); }}>
            Cancelar edição
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Título *</Label>
          <Input required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label>Tipo *</Label>
          <Select value={itemType} onValueChange={(v) => setItemType(v as LibraryItemType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Livrinho (PDF — vira página)</SelectItem>
              <SelectItem value="heyzine">Embed Heyzine (link de flipbook)</SelectItem>
              <SelectItem value="link">Link externo (site)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Descrição</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      </div>

      {itemType === "pdf" ? (
        <div>
          <Label>Arquivo PDF {editing ? "(opcional — manter atual se vazio)" : "*"}</Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
          />
          {editing && url && <p className="text-xs text-muted-foreground mt-1">Atual: {url.split("/").pop()}</p>}
        </div>
      ) : (
        <div>
          <Label>URL {itemType === "heyzine" ? "(ex: https://heyzine.com/flip-book/xxx.html)" : "(site externo)"} *</Label>
          <Input required={!editing} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
        </div>
      )}

      <div>
        <Label>Capa (imagem — opcional)</Label>
        <Input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} />
        {coverUrl && !coverFile && <p className="text-xs text-muted-foreground mt-1">Capa atual definida.</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-end">
        <div className="flex items-center gap-2">
          <Switch checked={isPaid} onCheckedChange={setIsPaid} id="paid" />
          <Label htmlFor="paid">Conteúdo pago</Label>
        </div>
        {isPaid && (
          <div>
            <Label>Preço (centavos)</Label>
            <Input type="number" value={priceCents} onChange={(e) => setPriceCents(e.target.value)} placeholder="ex: 1990 = R$ 19,90" />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Switch checked={published} onCheckedChange={setPublished} id="pub" />
          <Label htmlFor="pub">Publicado</Label>
        </div>
      </div>

      <Button type="submit" disabled={saving} className="w-full">
        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
        {editing ? "Salvar alterações" : "Adicionar à biblioteca"}
      </Button>
    </form>
  );
}

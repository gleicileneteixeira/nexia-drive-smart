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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Pencil, LogOut, ArrowLeft, Search, Download, Users, KeyRound, UserX } from "lucide-react";
import * as XLSX from "xlsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useServerFn } from "@tanstack/react-start";
import { adminResetUserPassword } from "@/lib/admin-users.functions";
import { sendPasswordReset, deleteUser } from "@/lib/admin-operations.server";

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

      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="users" className="gap-2"><Users className="h-4 w-4" /> Usuários</TabsTrigger>
          <TabsTrigger value="library" className="gap-2"><Upload className="h-4 w-4" /> Biblioteca</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <UsersPanel />
        </TabsContent>
        <TabsContent value="library" className="mt-4 space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

type ProfileRow = {
  id: string;
  display_name: string | null;
  email: string | null;
  cpf: string | null;
  phone: string | null;
  employment_status: string | null;
  employment_other: string | null;
  created_at: string;
};

const EMPLOYMENT_LABELS: Record<string, string> = {
  clt: "CLT",
  carteira_assinada: "CLT",
  autonomo: "Autônomo(a)",
  estudante: "Estudante",
  trabalha_estuda: "Trabalha e Estuda",
  desempregado: "Desempregado(a)",
  nao_trabalha: "Não trabalha",
  outro: "Outros",
};

const PAGE_SIZES = [10, 20, 50, 100] as const;

function UsersPanel() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [resetUser, setResetUser] = useState<ProfileRow | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const resetPasswordFn = useServerFn(adminResetUserPassword);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!resetUser) return;
    setResetLoading(true);
    try {
      await resetPasswordFn({ data: { userId: resetUser.id, newPassword } });
      toast.success(`Senha de ${resetUser.display_name ?? resetUser.email} redefinida.`);
      setResetUser(null);
      setNewPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao redefinir senha.");
    } finally {
      setResetLoading(false);
    }
  }

  const [deleteTarget, setDeleteTarget] = useState<ProfileRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, email, cpf, phone, employment_status, employment_other, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ProfileRow[];
    },
  });

  const filtered = users.filter((u) => {
    if (filter !== "all" && u.employment_status !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (u.display_name ?? "").toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q) ||
      (u.cpf ?? "").toLowerCase().includes(q) ||
      (u.phone ?? "").toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedUsers = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function buildRows() {
    return filtered.map((u) => ({
      Nome: u.display_name ?? "",
      "E-mail": u.email ?? "",
      Telefone: u.phone ?? "",
      "Situação profissional":
        u.employment_status === "outro"
          ? `Outros: ${u.employment_other ?? ""}`
          : EMPLOYMENT_LABELS[u.employment_status ?? ""] ?? (u.employment_status ?? ""),
      "Data de cadastro": new Date(u.created_at).toLocaleString("pt-BR"),
    }));
  }

  function exportXlsx() {
    const ws = XLSX.utils.json_to_sheet(buildRows());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuários");
    XLSX.writeFile(wb, `usuarios-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  function exportCsv() {
    const rows = buildRows();
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const escape = (v: unknown) => {
      const s = String(v ?? "");
      return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv =
      headers.join(",") + "\n" +
      rows.map((r) => headers.map((h) => escape((r as Record<string, unknown>)[h])).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `usuarios-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="glass rounded-2xl p-4 space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="search" className="text-xs">Pesquisar</Label>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome, e-mail ou telefone" className="pl-8" />
          </div>
        </div>
        <div className="min-w-[200px]">
          <Label className="text-xs">Situação</Label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
            <option value="all">Todas</option>
            <option value="clt">CLT</option>
            <option value="autonomo">Autônomo(a)</option>
            <option value="estudante">Estudante</option>
            <option value="trabalha_estuda">Trabalha e Estuda</option>
            <option value="desempregado">Desempregado(a)</option>
            <option value="outro">Outros</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
          <Button size="sm" onClick={exportXlsx} disabled={!filtered.length}>
            <Download className="h-4 w-4 mr-1" /> Excel
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        {isLoading ? "Carregando…" : `${filtered.length} de ${users.length} usuários`}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setDeleteTarget(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl border" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-bold text-lg mb-2 text-destructive">Excluir usuário</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Tem certeza? Esta ação <strong>não pode ser desfeita</strong>.
            </p>
            <p className="text-sm mb-4">
              {deleteTarget.display_name} &lt;{deleteTarget.email}&gt;
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancelar
              </Button>
              <Button variant="destructive" className="flex-1" disabled={deleting} onClick={async () => {
                setDeleting(true);
                try {
                  await deleteUser({ data: { userId: deleteTarget.id } });
                  toast.success("Usuário excluído");
                  setDeleteTarget(null);
                  qc.invalidateQueries({ queryKey: ["admin", "profiles"] });
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Erro");
                } finally {
                  setDeleting(false);
                }
              }}>
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border/40">
        <table className="w-full text-sm">
          <thead className="bg-background/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left px-3 py-2">Nome</th>
              <th className="text-left px-3 py-2">E-mail</th>
              <th className="text-left px-3 py-2">Telefone</th>
              <th className="text-left px-3 py-2">Situação</th>
              <th className="text-left px-3 py-2">Cadastro</th>
              <th className="text-right px-3 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-border/30">
                <td className="px-3 py-2">{u.display_name ?? "—"}</td>
                <td className="px-3 py-2">{u.email ?? "—"}</td>
                <td className="px-3 py-2">{u.phone ?? "—"}</td>
                <td className="px-3 py-2">
                  {u.employment_status === "outro"
                    ? `Outro: ${u.employment_other ?? ""}`
                    : EMPLOYMENT_LABELS[u.employment_status ?? ""] ?? (u.employment_status ?? "—")}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{new Date(u.created_at).toLocaleDateString("pt-BR")}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  <button
                    title="Redefinir senha"
                    onClick={() => { setResetUser(u); setNewPassword(""); }}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/80"
                  >
                    <KeyRound className="h-4 w-4" />
                  </button>
                  <button
                    title="Excluir usuário"
                    onClick={() => setDeleteTarget(u)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-destructive hover:bg-background/80"
                  >
                    <UserX className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted-foreground py-6">Nenhum usuário encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!resetUser} onOpenChange={(o) => { if (!o) { setResetUser(null); setNewPassword(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir senha</DialogTitle>
            <DialogDescription>
              Nova senha para <strong>{resetUser?.display_name ?? resetUser?.email}</strong>. A pessoa poderá entrar imediatamente com esta senha.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <Label htmlFor="newpw">Nova senha (mínimo 6 caracteres)</Label>
              <Input id="newpw" type="text" required minLength={6} maxLength={72}
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ex: Nexi@2026!" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={resetLoading} className="w-full">
                {resetLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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

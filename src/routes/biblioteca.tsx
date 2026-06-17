import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchLibraryItems, type LibraryItem } from "@/lib/library";
import { Book, ExternalLink, Lock, FileText, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/biblioteca")({
  component: BibliotecaPage,
  head: () => ({
    meta: [
      { title: "Biblioteca — Nexia DETRAN" },
      { name: "description", content: "Livros, apostilas e materiais complementares para sua prova do DETRAN." },
    ],
  }),
});

function BibliotecaPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["library", "published"],
    queryFn: () => fetchLibraryItems(false),
  });

  const items = data ?? [];
  const free = items.filter((i) => !i.is_paid);
  const paid = items.filter((i) => i.is_paid);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-8">
      <header>
        <p className="text-sm uppercase tracking-widest text-primary-glow font-semibold">Biblioteca</p>
        <h1 className="text-3xl md:text-5xl font-display font-bold mt-2">
          Estude com <span className="gradient-text">livros e materiais</span>
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Livrinhos virtuais, apostilas, sites úteis e conteúdo premium pra turbinar sua aprovação.
        </p>
      </header>

      {isLoading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando...
        </div>
      )}
      {error && <p className="text-destructive">Erro ao carregar biblioteca.</p>}

      {!isLoading && items.length === 0 && (
        <div className="glass rounded-3xl p-12 text-center">
          <Book className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhum item disponível ainda.</p>
        </div>
      )}

      {free.length > 0 && (
        <Section title="Conteúdo gratuito" items={free} />
      )}
      {paid.length > 0 && (
        <Section title="Conteúdo premium" items={paid} />
      )}
    </div>
  );
}

function Section({ title, items }: { title: string; items: LibraryItem[] }) {
  return (
    <section>
      <h2 className="text-xl font-display font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
          >
            <ItemCard item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ItemCard({ item }: { item: LibraryItem }) {
  const Icon = item.item_type === "pdf" ? BookOpen : item.item_type === "heyzine" ? FileText : ExternalLink;
  const typeLabel = item.item_type === "pdf" ? "Livrinho" : item.item_type === "heyzine" ? "Flipbook" : "Link";

  return (
    <Link
      to="/biblioteca/$id"
      params={{ id: item.id }}
      className="group block glass rounded-2xl overflow-hidden hover:bg-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-glow h-full"
    >
      <div className="aspect-[4/3] relative bg-gradient-to-br from-primary/20 to-primary-glow/20 overflow-hidden">
        {item.cover_url ? (
          <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="h-16 w-16 text-primary/50" />
          </div>
        )}
        {item.is_paid && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-warning/90 text-warning-foreground text-xs font-bold flex items-center gap-1">
            <Lock className="h-3 w-3" />
            R$ {((item.price_cents ?? 0) / 100).toFixed(2)}
          </div>
        )}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg glass text-xs font-medium">
          {typeLabel}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-tight">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>
    </Link>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchLibraryItem } from "@/lib/library";
import { ArrowLeft, ExternalLink, Loader2, Lock } from "lucide-react";
import { PdfFlipbook } from "@/components/PdfFlipbook";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/biblioteca/$id")({
  component: ItemViewer,
});

function ItemViewer() {
  const { id } = Route.useParams();
  const { data: item, isLoading } = useQuery({
    queryKey: ["library", id],
    queryFn: () => fetchLibraryItem(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">Item não encontrado.</p>
        <Link to="/biblioteca" className="text-primary mt-4 inline-block">
          ← Voltar para biblioteca
        </Link>
      </div>
    );
  }

  if (item.is_paid) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="glass rounded-3xl p-8 text-center">
          <Lock className="h-12 w-12 mx-auto text-warning mb-3" />
          <h1 className="text-xl font-display font-bold mb-2">{item.title}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Conteúdo premium por R$ {((item.price_cents ?? 0) / 100).toFixed(2)}
          </p>
          <Button disabled className="w-full">Em breve — pagamento</Button>
          <Link to="/biblioteca" className="text-xs text-muted-foreground mt-4 inline-block">
            ← Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Link to="/biblioteca" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Biblioteca
        </Link>
        <h1 className="font-display font-bold text-lg truncate">{item.title}</h1>
        <div className="w-20" />
      </div>

      {item.item_type === "pdf" && <PdfFlipbook url={item.url} />}

      {item.item_type === "heyzine" && (
        <div className="w-full aspect-[4/3] md:aspect-video glass rounded-2xl overflow-hidden">
          <iframe src={item.url} className="w-full h-full" allowFullScreen title={item.title} />
        </div>
      )}

      {item.item_type === "link" && (
        <div className="glass rounded-3xl p-8 text-center max-w-md mx-auto">
          <ExternalLink className="h-12 w-12 mx-auto text-primary mb-3" />
          <p className="text-sm text-muted-foreground mb-4">
            {item.description ?? "Conteúdo externo"}
          </p>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow"
          >
            Abrir site <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}

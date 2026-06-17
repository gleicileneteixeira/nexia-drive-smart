import { useEffect, useRef, useState } from "react";
// @ts-ignore - react-pageflip lacks complete types
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface Props {
  url: string;
}

export function PdfFlipbook({ url }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [size, setSize] = useState({ w: 400, h: 560 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const w = Math.min(containerRef.current.clientWidth, 900);
      const pageW = Math.floor(w / 2);
      setSize({ w: pageW, h: Math.floor(pageW * 1.4) });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<div className="py-20 text-muted-foreground flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" />Carregando livro...</div>}
        error={<p className="text-destructive py-10">Não foi possível carregar o PDF.</p>}
      >
        {numPages > 0 && (
          // @ts-ignore
          <HTMLFlipBook
            width={size.w}
            height={size.h}
            size="fixed"
            minWidth={200}
            maxWidth={600}
            minHeight={300}
            maxHeight={840}
            showCover
            mobileScrollSupport
            className="shadow-2xl"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="bg-white">
                <Page
                  pageNumber={i + 1}
                  width={size.w}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}

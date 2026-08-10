"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfReaderProps = {
  file: string;
  title: string;
};

const PdfReader = ({ file, title }: PdfReaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    const observer = new ResizeObserver(updateWidth);

    updateWidth();
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-auto overscroll-contain bg-[#242424]"
      aria-label={title}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}
        loading={
          <div className="grid min-h-full place-items-center p-8 text-sm tracking-widest text-[#F9A31A]">
            LOADING MAGAZINE…
          </div>
        }
        error={
          <div className="grid min-h-full place-items-center p-8 text-center text-sm text-white/70">
            The magazine could not be displayed. Please use the download button.
          </div>
        }
        className="flex min-h-full flex-col items-center gap-3 p-2 sm:gap-5 sm:p-5"
      >
        {containerWidth > 0 &&
          Array.from({ length: numberOfPages }, (_, index) => (
            <Page
              key={`${file}-${index + 1}`}
              pageNumber={index + 1}
              width={Math.min(containerWidth - (containerWidth < 640 ? 16 : 40), 1050)}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading={
                <div className="grid aspect-[3/4] w-full max-w-262.5 place-items-center bg-white/5 text-xs text-white/40">
                  Loading page {index + 1}…
                </div>
              }
              className="overflow-hidden bg-white shadow-xl"
            />
          ))}
      </Document>
    </div>
  );
};

export default PdfReader;

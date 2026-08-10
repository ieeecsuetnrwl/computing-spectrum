"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfReaderProps = {
  file: string;
  title: string;
};

type LazyPageProps = {
  pageNumber: number;
  width: number;
  pixelRatio: number;
  onFirstPageRendered: () => void;
};

const LazyPage = ({
  pageNumber,
  width,
  pixelRatio,
  onFirstPageRendered,
}: LazyPageProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(pageNumber === 1);

  useEffect(() => {
    if (shouldRender || !placeholderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(placeholderRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={placeholderRef}
      className="mx-auto grid shrink-0 place-items-center overflow-hidden bg-white/5 shadow-xl"
      style={{ width, aspectRatio: "595 / 842" }}
    >
      {shouldRender ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          devicePixelRatio={pixelRatio}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={pageNumber === 1 ? onFirstPageRendered : undefined}
          onRenderError={pageNumber === 1 ? onFirstPageRendered : undefined}
          loading={
            <span className="text-xs text-white/40">
              Loading page {pageNumber}...
            </span>
          }
          className="overflow-hidden bg-white"
        />
      ) : (
        <span className="text-xs text-white/30">Page {pageNumber}</span>
      )}
    </div>
  );
};

const PdfReader = ({ file, title }: PdfReaderProps) => {
  const pdfOptions = useMemo(() => ({ wasmUrl: "/wasm/" }), []);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [firstPageReady, setFirstPageReady] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<"continuous" | "single">(
    "continuous",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pixelRatio] = useState(() =>
    typeof window === "undefined"
      ? 1
      : Math.min(window.devicePixelRatio || 1, 1.5),
  );

  useEffect(() => {
    const container = viewerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    const observer = new ResizeObserver(updateWidth);

    updateWidth();
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const pageWidth = Math.min(
    containerWidth - (containerWidth < 640 ? 16 : 40),
    1050,
  ) * zoom;

  const zoomOut = () => setZoom((value) => Math.max(0.5, value - 0.25));
  const zoomIn = () => setZoom((value) => Math.min(2.5, value + 0.25));

  return (
    <div className="flex h-full w-full flex-col bg-[#242424]" aria-label={title}>
      <div className="flex shrink-0 items-center justify-between gap-2 overflow-x-auto border-b border-[#F9A31A]/30 bg-[#181818] px-2 py-2 sm:px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= 0.5}
            className="grid size-9 shrink-0 place-items-center border border-white/15 text-xl text-white transition-colors hover:border-[#F9A31A] hover:text-[#F9A31A] disabled:opacity-30"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="w-14 shrink-0 text-center text-xs text-white/70">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= 2.5}
            className="grid size-9 shrink-0 place-items-center border border-white/15 text-xl text-white transition-colors hover:border-[#F9A31A] hover:text-[#F9A31A] disabled:opacity-30"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="h-9 shrink-0 border border-white/15 px-3 text-xs font-bold tracking-wider text-white/70 transition-colors hover:border-[#F9A31A] hover:text-[#F9A31A]"
          >
            FIT WIDTH
          </button>
        </div>

        <div className="flex items-center gap-1">
          {viewMode === "single" && (
            <>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage <= 1}
                className="grid size-9 shrink-0 place-items-center border border-white/15 text-white hover:border-[#F9A31A] hover:text-[#F9A31A] disabled:opacity-30"
                aria-label="Previous page"
              >
                ‹
              </button>
              <span className="w-16 shrink-0 text-center text-xs text-white/70">
                {currentPage} / {numberOfPages || "-"}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(numberOfPages, page + 1))
                }
                disabled={currentPage >= numberOfPages}
                className="grid size-9 shrink-0 place-items-center border border-white/15 text-white hover:border-[#F9A31A] hover:text-[#F9A31A] disabled:opacity-30"
                aria-label="Next page"
              >
                ›
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() =>
              setViewMode((mode) =>
                mode === "continuous" ? "single" : "continuous",
              )
            }
            className="h-9 shrink-0 border border-[#F9A31A]/60 px-3 text-xs font-bold tracking-wider text-[#F9A31A] transition-colors hover:bg-[#F9A31A] hover:text-[#181818]"
          >
            {viewMode === "continuous" ? "SINGLE PAGE" : "CONTINUOUS"}
          </button>
        </div>
      </div>

      <div
        ref={viewerRef}
        className="relative min-h-0 flex-1 overflow-auto overscroll-contain"
      >
        {!firstPageReady && (
          <div className="absolute inset-0 z-20 grid min-h-80 place-items-center bg-[#181818]">
          <div className="w-56 text-center">
            <div className="mx-auto mb-5 size-10 animate-spin rounded-full border-3 border-white/15 border-t-[#F9A31A]" />
            <p className="text-sm font-bold tracking-[2px] text-[#F9A31A]">
              LOADING MAGAZINE
            </p>
            <p className="mt-2 text-xs text-white/40">Preparing first page...</p>
          </div>
          </div>
        )}

        <Document
        file={file}
        options={pdfOptions}
        onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}
        onLoadError={() => setFirstPageReady(true)}
        loading={<div className="min-h-full" />}
        error={
          <div className="grid min-h-full place-items-center p-8 text-center text-sm text-white/70">
            The magazine could not be displayed. Please use the download button.
          </div>
        }
          className="min-h-full w-max min-w-full p-2 sm:p-5"
        >
          {pageWidth > 0 && viewMode === "continuous" && (
            <div className="flex flex-col gap-3 sm:gap-5">
              {Array.from({ length: numberOfPages }, (_, index) => (
                <LazyPage
                  key={`${file}-${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                  pixelRatio={pixelRatio}
                  onFirstPageRendered={() => setFirstPageReady(true)}
                />
              ))}
            </div>
          )}
          {pageWidth > 0 && viewMode === "single" && numberOfPages > 0 && (
            <div className="mx-auto w-fit overflow-hidden bg-white shadow-xl">
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                devicePixelRatio={pixelRatio}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onRenderSuccess={
                  currentPage === 1 ? () => setFirstPageReady(true) : undefined
                }
              />
            </div>
          )}
        </Document>
      </div>
    </div>
  );
};

export default PdfReader;

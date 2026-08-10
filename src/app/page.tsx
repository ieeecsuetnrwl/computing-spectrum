"use client";

import VersionCard from "@/components/VersionCard";
import { Download, ExternalLink, Instagram, Linkedin, X } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PdfReader = dynamic(() => import("@/components/PdfReader"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-sm tracking-widest text-[#F9A31A]">
      LOADING READER…
    </div>
  ),
});

type MagazineVersion = "v1" | "v2" | "v3";

const editionNumber: Record<MagazineVersion, string> = {
  v1: "1.0",
  v2: "2.0",
  v3: "3.0",
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [readerVersion, setReaderVersion] = useState<MagazineVersion | null>(null);
  const [featuredCover, setFeaturedCover] = useState("/images/v3.jpg");

  useEffect(() => {
    const startedAt = Date.now();
    const minimumDisplayTime = 1000;
    const maximumDisplayTime = 2000;

    const preloadImages = ["/images/v1.jpg", "/images/v2.jpg"].map(
      (source) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = source;
        }),
    );

    const hideLoader = () => {
      const remainingTime = Math.max(
        0,
        minimumDisplayTime - (Date.now() - startedAt),
      );
      window.setTimeout(() => setIsLoading(false), remainingTime);
    };

    Promise.all(preloadImages).then(hideLoader);
    const maximumTimer = window.setTimeout(
      () => setIsLoading(false),
      maximumDisplayTime,
    );

    return () => window.clearTimeout(maximumTimer);
  }, []);

  useEffect(() => {
    if (!readerVersion) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setReaderVersion(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [readerVersion]);

  const downloadMagazine = (version: MagazineVersion) => {
    const url = `/files/${version}.pdf`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `computing-spectrum-${version}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden relative">
      {isLoading && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#111]"
          role="status"
          aria-label="Loading Computing Spectrum"
        >
          <div className="relative grid size-32 place-items-center">
            <div className="absolute inset-0 rounded-full bg-[#F9A31A]/15 blur-2xl animate-loader-glow" />
            <Image
              src="/logo.webp"
              alt="IEEE Computer Society"
              width={92}
              height={92}
              priority
              className="relative animate-logo-pump object-contain"
            />
          </div>
        </div>
      )}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute w-[200%] h-[200%] animate-grid-move"
          style={{
            backgroundImage:
              "linear-gradient(#F9A31A 1px, transparent 1px), linear-gradient(90deg, #F9A31A 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <header className="relative z-10 px-4 py-4 sm:px-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-slide-down">
        <div className="flex items-center w-full gap-2 group cursor-pointer">
          <Image
            src="/logo.webp"
            alt="IEEE CS Chapter Logo"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <div className="font-bebas text-xl text-[#F9A31A] tracking-[3px] leading-none">
              IEEE Computer Society
            </div>
            <div className="text-xs text-white/60 tracking-[2px] mt-1">
              UET NAROWAL
            </div>
          </div>
        </div>
      </header>
      <section className="hidden md:relative min-h-screen md:flex items-center justify-center px-[5%] py-6 md:py-4 z-10">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-left space-y-8">
            <div
              className="inline-block px-6 py-2 bg-[#F9A31A] text-[#1a1a1a] font-bold text-sm tracking-[2px] animate-pulse-subtle"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
            >
              LATEST EDITION • V3.0
            </div>

            <h1 className="font-playfair text-6xl md:text-8xl font-black leading-[0.9] bg-linear-to-br from-white to-[#F9A31A] bg-clip-text text-transparent">
              Computing
              <br />
              SPECTRUM
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Our third edition, published on August 10, 2026, explores bold new
              ideas, breakthrough technologies, and the innovations shaping the
              next generation of computing.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <button
                onClick={() => setReaderVersion("v3")}
                className="p-3 rounded-xl bg-[#F9A31A] text-[#1a1a1a] font-bold text-lg tracking-[2px] border-3 border-[#F9A31A] relative overflow-hidden group"
              >
                <span className="relative z-10">READ NOW</span>
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
              </button>
              <button
                onClick={() => downloadMagazine("v3")}
                className="p-3 rounded-xl bg-transparent text-[#F9A31A] font-bold text-lg tracking-[2px] border-3 border-[#F9A31A] transition-colors duration-300 hover:bg-[#F9A31A] hover:text-[#1a1a1a]"
              >
                DOWNLOAD NOW
              </button>
            </div>
          </div>

          <div className="animate-fade-in-right md:order-last">
            <div className="perspective-1000 group">
              <div className="relative w-full max-w-125 mx-auto aspect-3/4 bg-[#1a1a1a] border-4 border-[#F9A31A] transition-transform duration-600 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(249,163,26,0.1)] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transform-style-3d overflow-hidden">
                <Image
                  src={featuredCover}
                  alt="Computing Spectrum Edition 3.0 cover"
                  layout="fill"
                  objectFit="cover"
                  onError={() => setFeaturedCover("/images/v2.jpg")}
                  className="transition-transform duration-400 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex md:hidden min-h-screen items-center justify-center px-4 py-6 sm:px-6 z-10">
        <div className="max-w-7xl w-full flex flex-col gap-6 sm:gap-8 items-center">
          <div className="flex w-full flex-col items-center text-center animate-fade-in-left space-y-6 sm:space-y-8">
            <div
              className="inline-block px-4 py-2 sm:px-6 bg-[#F9A31A] text-[#1a1a1a] font-bold text-xs sm:text-sm tracking-[1.5px] sm:tracking-[2px] animate-pulse-subtle"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
            >
              LATEST EDITION • V3.0
            </div>

            <h1 className="font-playfair text-[clamp(2.75rem,15vw,3.75rem)] font-black leading-[0.9] bg-linear-to-br from-white to-[#F9A31A] bg-clip-text text-transparent">
              Computing
              <br />
              SPECTRUM
            </h1>

            <div className="animate-fade-in-right w-full flex justify-center">
              <div className="perspective-1000 group w-full max-w-xs sm:max-w-sm">
                <div className="relative w-full aspect-3/4 bg-[#1a1a1a] border-4 border-[#F9A31A] transition-transform duration-600 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(249,163,26,0.1)] overflow-hidden">
                  <Image
                    src={featuredCover}
                    alt="Computing Spectrum Edition 3.0 cover"
                    layout="fill"
                    objectFit="cover"
                    onError={() => setFeaturedCover("/images/v2.jpg")}
                    className="transition-transform duration-400 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <p className="w-full max-w-xl text-justify text-base leading-relaxed text-white/70 sm:text-lg">
              Our third edition, published on August 2026, explores bold new ideas, breakthrough technologies, and the innovations shaping the
              next generation of computing.
            </p>

            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
              <button
                onClick={() => setReaderVersion("v3")}
                className="min-w-0 p-3 rounded-xl bg-[#F9A31A] text-[#1a1a1a] font-bold text-sm sm:text-lg tracking-[1px] sm:tracking-[2px] border-3 border-[#F9A31A] relative overflow-hidden group"
              >
                <span className="relative z-10">READ NOW</span>
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
              </button>
              <button
                onClick={() => downloadMagazine("v3")}
                className="min-w-0 p-3 rounded-xl bg-transparent text-[#F9A31A] font-bold text-sm sm:text-lg tracking-[1px] sm:tracking-[2px] border-3 border-[#F9A31A] transition-colors duration-300 hover:bg-[#F9A31A] hover:text-[#1a1a1a]"
              >
                DOWNLOAD NOW
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative px-4 py-12 sm:px-6 md:px-[5%] md:py-16 z-10">
        <div className="text-center mb-10 sm:mb-14 md:mb-20 animate-fade-in">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-[#F9A31A]">
            Archive
          </h2>
          <p className="text-base sm:text-lg text-white/60 tracking-wider">
            Explore our previous editions
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Version 2.0 */}
          <VersionCard
            version="v2"
            number="Edition 2.0"
            description="Our second edition, published on Feburary 2026, continues the journey with fresh perspectives on innovation, technology, and the ideas shaping the future of computer science."
            onDownload={() => downloadMagazine("v2")}
            onRead={() => setReaderVersion("v2")}
          >
            <div className="relative w-full max-w-125 mx-auto aspect-3/4 bg-[#1a1a1a] border-4 border-[#F9A31A] transition-transform duration-600 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(249,163,26,0.1)] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transform-style-3d overflow-hidden">
              <Image
                src="/images/v2.jpg"
                alt="Computing Spectrum Edition 2.0 cover"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover transition-transform duration-400 group-hover:scale-105"
              />
            </div>
          </VersionCard>

          {/* Version 1.0 */}
          <VersionCard
            version="v1"
            number="Edition 1.0"
            description="Our first edition, published on May 2025, set the stage for our journey. It featured insightful articles on AI, cybersecurity, and emerging tech trends."
            onDownload={() => downloadMagazine("v1")}
            onRead={() => setReaderVersion("v1")}
          >
            <div className="relative w-full max-w-125 mx-auto aspect-3/4 bg-[#1a1a1a] border-4 border-[#F9A31A] transition-transform duration-600 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(249,163,26,0.1)] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transform-style-3d overflow-hidden">
              <Image
                src="/images/v1.jpg"
                alt="Magazine Cover"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-400 group-hover:scale-105"
              />
            </div>
          </VersionCard>
        </div>
      </section>
      <footer className="relative px-4 py-12 sm:px-6 md:px-[5%] md:py-16 text-center border-t border-[#F9A31A]/20 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="font-bebas text-3xl text-[#F9A31A] tracking-[4px] mb-4">
            Computing Spectrum
          </div>
          <p className="text-sm text-white/50 leading-relaxed mb-8">
            Published by IEEE Computer Society Chapter, UET Narowal.
            <br />
            Advancing technology for humanity through education and innovation.
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="https://www.instagram.com/ieee.cs.uet.nrwl?igsh=ZTJqYm51Nmk3bnYx"
              className="w-10 h-10 border-2 border-[#F9A31A] rounded-full flex items-center justify-center text-[#F9A31A] font-bold text-sm transition-all duration-300 hover:bg-[#F9A31A] hover:text-[#1a1a1a] hover:-translate-y-1"
            >
              <Linkedin />
            </a>
            <a
              href="https://www.instagram.com/ieee.cs.uet.nrwl?igsh=ZTJqYm51Nmk3bnYx"
              className="w-10 h-10 border-2 border-[#F9A31A] rounded-full flex items-center justify-center text-[#F9A31A] font-bold text-sm transition-all duration-300 hover:bg-[#F9A31A] hover:text-[#1a1a1a] hover:-translate-y-1"
            >
              <Instagram />
            </a>
          </div>
          <div className="text-xs text-white/30 tracking-wider">
            © 2026 IEEE CS Chapter UET Narowal. All rights reserved.
          </div>
        </div>
      </footer>

      {readerVersion && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#111]/95 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Computing Spectrum Edition ${editionNumber[readerVersion]}`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#F9A31A]/30 bg-[#1a1a1a] px-4 py-3 md:px-8">
            <div>
              <p className="font-bebas text-xl tracking-[3px] text-[#F9A31A] md:text-2xl">
                Computing Spectrum
              </p>
              <p className="text-xs tracking-widest text-white/50">
                EDITION {editionNumber[readerVersion]}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`/files/${readerVersion}.pdf`}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 border border-[#F9A31A]/50 px-3 py-2 text-xs font-bold tracking-wider text-[#F9A31A] transition-colors hover:bg-[#F9A31A] hover:text-[#1a1a1a] sm:flex"
              >
                <ExternalLink size={16} /> OPEN TAB
              </a>
              <button
                onClick={() => downloadMagazine(readerVersion)}
                className="flex items-center gap-2 border border-[#F9A31A]/50 px-3 py-2 text-xs font-bold tracking-wider text-[#F9A31A] transition-colors hover:bg-[#F9A31A] hover:text-[#1a1a1a]"
              >
                <Download size={16} />
                <span className="hidden sm:inline">DOWNLOAD</span>
              </button>
              <button
                onClick={() => setReaderVersion(null)}
                className="grid size-10 place-items-center bg-[#F9A31A] text-[#1a1a1a] transition-colors hover:bg-white"
                aria-label="Close reader"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 p-2 md:p-5">
            <div className="mx-auto h-full max-w-6xl overflow-hidden border border-[#F9A31A]/40 bg-[#2a2a2a] shadow-[0_0_60px_rgba(249,163,26,0.15)]">
              <PdfReader
                file={`/files/${readerVersion}.pdf`}
                title={`Computing Spectrum Edition ${editionNumber[readerVersion]}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

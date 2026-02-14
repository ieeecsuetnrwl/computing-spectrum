"use client";

import VersionCard from "@/components/VersionCard";
import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const downloadMagazine = (version: "v1" | "v2") => {
    const url = version === "v1" ? "/files/v1.pdf" : "/files/v2.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = `computing-spectrum-${version}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden relative">
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
      <header className="relative z-10 px-6 py-4 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-slide-down">
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
              LATEST EDITION • V2.0
            </div>

            <h1 className="font-playfair text-6xl md:text-8xl font-black leading-[0.9] bg-linear-to-br from-white to-[#F9A31A] bg-clip-text text-transparent">
              Computing
              <br />
              SPECTRUM
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Exploring innovation, technology, and the future of computer
              science. Your gateway to cutting-edge ideas and inspiring stories
              from the IEEE CS UET community.
            </p>

            <button
              onClick={() => downloadMagazine("v2")}
              className="p-3 rounded-xl bg-[#F9A31A] text-[#1a1a1a] font-bold text-lg tracking-[2px] border-3 border-[#F9A31A] relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-[#1a1a1a]">
                READ NOW
              </span>
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
            </button>
          </div>

          <div className="animate-fade-in-right md:order-last">
            <div className="perspective-1000 group">
              <div className="relative w-full max-w-125 mx-auto aspect-3/4 bg-[#1a1a1a] border-4 border-[#F9A31A] transition-transform duration-600 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(249,163,26,0.1)] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transform-style-3d overflow-hidden">
                <Image
                  src="/images/v2.jpg"
                  alt="Magazine Cover"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-400 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex md:hidden min-h-screen items-center justify-center px-[5%] py-6 z-10">
        <div className="max-w-7xl w-full flex flex-col gap-8 items-center">
          <div className="flex flex-col items-center text-center animate-fade-in-left space-y-8">
            <div
              className="inline-block px-6 py-2 bg-[#F9A31A] text-[#1a1a1a] font-bold text-sm tracking-[2px] animate-pulse-subtle"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
            >
              LATEST EDITION • V2.0
            </div>

            <h1 className="font-playfair text-6xl font-black leading-[0.9] bg-linear-to-br from-white to-[#F9A31A] bg-clip-text text-transparent">
              Computing
              <br />
              SPECTRUM
            </h1>

            <div className="animate-fade-in-right w-full flex justify-center">
              <div className="perspective-1000 group w-full max-w-sm">
                <div className="relative w-full aspect-3/4 bg-[#1a1a1a] border-4 border-[#F9A31A] transition-transform duration-600 shadow-[20px_20px_60px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(249,163,26,0.1)] overflow-hidden">
                  <Image
                    src="/images/v2.jpg"
                    alt="Magazine Cover"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-400 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              Exploring innovation, technology, and the future of computer
              science. Your gateway to cutting-edge ideas and inspiring stories
              from the IEEE CS UET community.
            </p>

            <button
              onClick={() => downloadMagazine("v2")}
              className="p-3 rounded-xl bg-[#F9A31A] text-[#1a1a1a] font-bold text-lg tracking-[2px] border-3 border-[#F9A31A] relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-[#1a1a1a]">
                READ NOW
              </span>
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
            </button>
          </div>
        </div>
      </section>
      <section className="relative px-[5%] py-16 z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="font-playfair text-5xl md:text-6xl font-black mb-4 text-[#F9A31A]">
            Archive
          </h2>
          <p className="text-lg text-white/60 tracking-wider">
            Explore our previous editions
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Version 1.0 */}
          <VersionCard
            version="v1"
            number="Edition 1.0"
            description="Our first edition, launched in May 2025, set the stage for our journey. It featured insightful articles on AI, cybersecurity, and emerging tech trends."
            onDownload={() => downloadMagazine("v1")}
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
      <footer className="relative px-[5%] py-16 text-center border-t border-[#F9A31A]/20 z-10">
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
    </div>
  );
};

export default HomePage;

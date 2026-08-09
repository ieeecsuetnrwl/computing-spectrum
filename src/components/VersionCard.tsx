import React, { ReactNode } from "react";

type Props = {
  version: string;
  number: string;
  description: string;
  children: ReactNode;
  onDownload: (version: string) => void;
  onRead: (version: string) => void;
};

const VersionCard = ({
  children,
  description,
  number,
  version,
  onDownload,
  onRead,
}: Props) => {
  return (
    <div
      onClick={() => onRead(version)}
      className="bg-[#333333] h-[85vh] md:h-[90vh] border-2 border-[#F9A31A]/30 cursor-pointer overflow-hidden flex flex-col transition-all duration-400 hover:border-[#F9A31A] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,163,26,0.3)] animate-fade-in-up group relative"
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F9A31A]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none z-10" />

      <div className="w-full aspect-3/4 overflow-hidden bg-[#1a1a1a] border-b-3 border-[#F9A31A] relative">
        <div className="w-full h-full transition-transform duration-400 group-hover:scale-105">
          {children}
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(26, 26, 26, 0.8) 100%)",
          }}
        />
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="font-bebas text-5xl text-[#F9A31A] tracking-[4px] mb-4">
          {number}
        </div>
        <p className="text-base text-white/80 leading-relaxed mb-8 flex-1">
          {description}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onRead(version);
            }}
            className="inline-flex items-center justify-center px-4 py-3 bg-[#F9A31A] border-2 border-[#F9A31A] text-[#1a1a1a] font-bold text-sm tracking-wider transition-all duration-300 hover:bg-white hover:border-white"
          >
            READ NOW
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDownload(version);
            }}
            className="inline-flex items-center justify-center px-4 py-3 bg-transparent border-2 border-[#F9A31A] text-[#F9A31A] font-bold text-sm tracking-wider transition-all duration-300 hover:bg-[#F9A31A] hover:text-[#1a1a1a]"
          >
            DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionCard;

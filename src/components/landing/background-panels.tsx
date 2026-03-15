export function BackgroundPanels() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-[72px] bg-black/28 backdrop-blur-[2px]" />
      <div className="absolute left-[36px] top-0 h-full w-px bg-white/6" />
      <div className="absolute left-[72px] top-0 h-full w-px bg-emerald-300/10" />

      <div className="absolute right-0 top-0 h-full w-[54px] bg-black/12" />
      <div className="absolute right-[28px] top-0 h-full w-px bg-white/5" />

      <div className="absolute left-0 top-[18%] h-px w-[120px] bg-emerald-300/20 shadow-[0_0_12px_rgba(74,222,128,0.35)]" />
      <div className="absolute left-0 bottom-[24%] h-px w-[160px] bg-emerald-300/20 shadow-[0_0_12px_rgba(74,222,128,0.35)]" />
      <div className="absolute right-0 top-[22%] h-px w-[110px] bg-emerald-300/16 shadow-[0_0_10px_rgba(74,222,128,0.28)]" />
      <div className="absolute right-0 bottom-[18%] h-px w-[140px] bg-emerald-300/16 shadow-[0_0_10px_rgba(74,222,128,0.28)]" />
    </div>
  );
}

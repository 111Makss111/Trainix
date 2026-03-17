export function HeaderButton() {
  return (
    <a
      href="#pricing"
      className="group relative inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-lime-100/20 bg-[linear-gradient(135deg,#93f95f_0%,#51e26c_55%,#29bf60_100%)] px-7 text-sm font-semibold tracking-[-0.01em] text-[#061109] shadow-[0_10px_30px_rgba(53,201,75,0.3),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(83,255,143,0.38),inset_0_1px_0_rgba(255,255,255,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] active:translate-y-0"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/70"
      />
      <span className="relative z-10">Спробувати</span>
    </a>
  );
}

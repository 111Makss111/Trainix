export function NeonGymDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes gymSweep {
          0% {
            transform: translate3d(-10%, 0, 0);
          }
          50% {
            transform: translate3d(10%, -4%, 0);
          }
          100% {
            transform: translate3d(-10%, 0, 0);
          }
        }

        @keyframes gymGlowPulse {
          0% {
            opacity: 0.5;
            filter: blur(16px);
          }
          50% {
            opacity: 0.95;
            filter: blur(8px);
          }
          100% {
            opacity: 0.5;
            filter: blur(16px);
          }
        }

        /* Трохи інша перспектива / масштаб для десктопів */
        @media (min-width: 1024px) {
          .decor-shell {
            transform: scale(1.12) translate3d(0, -2%, 0);
          }
        }
      `}</style>

      {/* Центруємо ефект і обмежуємо ширину, щоб на ПК вигляд був як на макеті */}
      <div className="absolute inset-0 flex justify-center">
        {/* Загальний “слой” з перспективою */}
        <div className="decor-shell relative h-full w-full max-w-[1440px] inset-[-10%] [perspective:1400px]">
          {/* Верхня діагональна пластина (як промінь зліва направо) */}
        <div
          className="absolute left-[-10%] top-[5%] h-[220px] w-[130%] opacity-70"
          style={{
            transform: "rotateZ(-16deg) rotateX(64deg) translate3d(0, 0, 0)",
            transformOrigin: "left top",
            background:
              "linear-gradient(120deg, rgba(74,222,128,0.05) 0%, rgba(74,222,128,0.6) 35%, rgba(190,242,100,0.9) 55%, rgba(74,222,128,0.0) 100%)",
            boxShadow:
              "0 0 28px rgba(74,222,128,0.55), 0 0 80px rgba(22,163,74,0.55)",
            animation:
              "gymSweep 18s linear infinite, gymGlowPulse 9s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />

          {/* Нижня широка пластина, що імітує підлогу залу */}
        <div
          className="absolute bottom-[-4%] left-[-10%] h-[260px] w-[130%] opacity-65"
          style={{
            transform: "rotateX(72deg) rotateZ(-6deg) translate3d(0, 0, 0)",
            transformOrigin: "center bottom",
            background:
              "radial-gradient(circle at 30% 0%, rgba(22,163,74,0.9) 0%, rgba(21,128,61,0.65) 30%, rgba(6,95,70,0.0) 70%)",
            boxShadow:
              "0 0 40px rgba(16,185,129,0.85), 0 0 120px rgba(5,150,105,0.75)",
            animation: "gymGlowPulse 11s ease-in-out infinite alternate",
            mixBlendMode: "screen",
          }}
        />

          {/* Права вертикальна панель (як світна стіна/вікно) */}
        <div
          className="absolute right-[-8%] top-[10%] h-[65%] w-[260px] opacity-60"
          style={{
            transform: "rotateY(-32deg) skewY(-6deg) translate3d(0, 0, 0)",
            transformOrigin: "right center",
            background:
              "linear-gradient(180deg, rgba(74,222,128,0.0) 0%, rgba(74,222,128,0.6) 40%, rgba(22,163,74,0.9) 70%, rgba(4,120,87,0.0) 100%)",
            boxShadow:
              "0 0 36px rgba(16,185,129,0.85), 0 0 110px rgba(22,163,74,0.8)",
            animation: "gymSweep 22s linear infinite reverse",
            mixBlendMode: "screen",
          }}
        />

          {/* Тонкі “трейли” як швидкі промінчики */}
          <div
          className="absolute left-[-20%] top-[35%] h-[2px] w-[160%] opacity-60"
          style={{
            transform: "rotateZ(-8deg) translate3d(0, 0, 0)",
            background:
              "linear-gradient(90deg, rgba(34,197,94,0.0) 0%, rgba(190,242,100,1) 28%, rgba(45,212,191,0.0) 70%)",
            boxShadow: "0 0 22px rgba(190,242,100,0.85)",
            animation: "gymSweep 13s linear infinite",
            mixBlendMode: "screen",
          }}
          />
          <div
          className="absolute left-[-10%] top-[55%] h-[2px] w-[150%] opacity-50"
          style={{
            transform: "rotateZ(-10deg) translate3d(0, 0, 0)",
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.0) 0%, rgba(16,185,129,0.9) 25%, rgba(52,211,153,0.0) 70%)",
            boxShadow: "0 0 18px rgba(16,185,129,0.9)",
            animation: "gymSweep 16s linear infinite reverse",
            mixBlendMode: "screen",
          }}
          />
        </div>
      </div>

      {/* Легке віньєтування по краях, щоб підсилити глибину */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}

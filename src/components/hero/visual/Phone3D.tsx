"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneApp } from "./PhoneApp";

const BASE_ROTATE_X = -6;
const BASE_ROTATE_Y = -14;
const SCROLL_LIMIT = 100;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Phone3D() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    startRotateX: BASE_ROTATE_X,
    startRotateY: BASE_ROTATE_Y,
    active: false,
  });
  const targetRef = useRef({
    rotateX: BASE_ROTATE_X,
    rotateY: BASE_ROTATE_Y,
    scale: 1,
    glareX: 68,
    glareY: 18,
  });
  const currentRef = useRef({
    rotateX: BASE_ROTATE_X,
    rotateY: BASE_ROTATE_Y,
    scale: 1,
    glareX: 68,
    glareY: 18,
  });
  const [scrollProgress, setScrollProgress] = useState(18);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const animate = () => {
      const phone = phoneRef.current;

      if (phone) {
        currentRef.current.rotateX +=
          (targetRef.current.rotateX - currentRef.current.rotateX) * 0.12;
        currentRef.current.rotateY +=
          (targetRef.current.rotateY - currentRef.current.rotateY) * 0.12;
        currentRef.current.scale +=
          (targetRef.current.scale - currentRef.current.scale) * 0.12;
        currentRef.current.glareX +=
          (targetRef.current.glareX - currentRef.current.glareX) * 0.12;
        currentRef.current.glareY +=
          (targetRef.current.glareY - currentRef.current.glareY) * 0.12;

        phone.style.transform = `rotateX(${currentRef.current.rotateX.toFixed(2)}deg) rotateY(${currentRef.current.rotateY.toFixed(2)}deg) scale(${currentRef.current.scale.toFixed(3)})`;
        phone.style.setProperty(
          "--phone-glare-x",
          `${currentRef.current.glareX.toFixed(2)}%`,
        );
        phone.style.setProperty(
          "--phone-glare-y",
          `${currentRef.current.glareY.toFixed(2)}%`,
        );
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const resetTilt = () => {
    dragStateRef.current.active = false;
    dragStateRef.current.pointerId = null;
    targetRef.current.rotateX = BASE_ROTATE_X;
    targetRef.current.rotateY = BASE_ROTATE_Y;
    targetRef.current.scale = 1;
    targetRef.current.glareX = 68;
    targetRef.current.glareY = 18;
    setIsDragging(false);
  };

  const updateScroll = (delta: number) => {
    setScrollProgress((current) => clamp(current + delta, 0, SCROLL_LIMIT));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current.pointerId = event.pointerId;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startRotateX = targetRef.current.rotateX;
    dragStateRef.current.startRotateY = targetRef.current.rotateY;
    dragStateRef.current.active = true;

    targetRef.current.scale = 1.018;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !dragStateRef.current.active ||
      dragStateRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;

    targetRef.current.rotateY = clamp(
      dragStateRef.current.startRotateY + deltaX * 0.14,
      -34,
      22,
    );
    targetRef.current.rotateX = clamp(
      dragStateRef.current.startRotateX - deltaY * 0.1,
      -18,
      16,
    );
    targetRef.current.glareX = clamp(68 + deltaX * 0.18, 10, 92);
    targetRef.current.glareY = clamp(18 + deltaY * 0.14, 8, 92);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current.active = false;
    dragStateRef.current.pointerId = null;
    targetRef.current.scale = 1;
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateScroll(event.deltaY * 0.05);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      updateScroll(8);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      updateScroll(-8);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="pointer-events-none absolute bottom-[11%] h-20 w-[52%] rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[16%] right-[17%] h-14 w-14 rounded-full bg-amber-100/14 blur-2xl" />

      <div className="relative h-[95%] w-[58%] min-w-[220px] max-w-[308px] [perspective:2200px]">
        <div
          ref={phoneRef}
          className={`absolute inset-0 m-auto h-full w-full touch-none select-none [transform-style:preserve-3d] will-change-transform [--phone-glare-x:68%] [--phone-glare-y:18%] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onDoubleClick={resetTilt}
        >
          <div
            aria-hidden="true"
            className="absolute inset-[2%] rounded-[4.8rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(135deg,rgba(8,12,15,0.96),rgba(31,43,49,0.96)_24%,rgba(7,10,12,0.98)_58%,rgba(33,46,53,0.95)_100%)] opacity-95 blur-[1.5px]"
            style={{ transform: "translateZ(-8px) scale(0.992)" }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-y-[4.8%] right-[-3px] w-[5px] rounded-r-[999px] border-r border-white/10 bg-[linear-gradient(180deg,#425761_0%,#172027_26%,#0d1015_64%,#364952_100%)] opacity-90"
            style={{
              transform: "rotateY(90deg)",
              transformOrigin: "left center",
            }}
          >
            <span className="absolute left-[1px] top-[22%] h-[14%] w-[2px] rounded-full bg-white/16" />
            <span className="absolute left-[1px] top-[42%] h-[8%] w-[2px] rounded-full bg-white/12" />
            <span className="absolute left-[1px] top-[54%] h-[10%] w-[2px] rounded-full bg-white/12" />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-y-[5.2%] left-[-2px] w-[4px] rounded-l-[999px] bg-[linear-gradient(180deg,#27373e_0%,#10161a_42%,#30434b_100%)] opacity-65"
            style={{
              transform: "rotateY(-90deg)",
              transformOrigin: "right center",
            }}
          />

          <div
            className="absolute inset-0 overflow-hidden rounded-[4rem] border border-white/6 bg-[linear-gradient(135deg,#12191d_0%,#33434a_18%,#0a0e11_42%,#152025_70%,#364951_100%)] shadow-[0_38px_86px_rgba(0,0,0,0.42),0_0_0_1px_rgba(255,255,255,0.03),0_0_56px_rgba(130,255,173,0.08)]"
            style={{ transform: "translateZ(6px)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[1px] rounded-[3.8rem] border border-white/4"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[3px] rounded-[3.7rem] opacity-60"
              style={{
                background:
                  "radial-gradient(circle at var(--phone-glare-x) var(--phone-glare-y), rgba(255,255,255,0.16), rgba(255,255,255,0.04) 24%, transparent 56%)",
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-[4%] left-[2px] w-[8px] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_36%,transparent_100%)] blur-[1px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-[4%] right-[2px] w-[7px] rounded-full bg-[linear-gradient(270deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_34%,transparent_100%)] blur-[1px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[9%] top-[6px] h-[22px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] blur-sm"
            />

            <div className="absolute inset-[8px] overflow-hidden rounded-[3.35rem] border border-black/70 bg-[linear-gradient(180deg,#020304_0%,#11171a_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div
                className="absolute inset-[6px] overflow-hidden rounded-[2.75rem] bg-[linear-gradient(180deg,#f5f6ef_0%,#e8ece3_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                onWheel={handleWheel}
                onKeyDown={handleKeyDown}
                aria-label="Interactive phone preview"
                tabIndex={0}
              >
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[2.75rem] shadow-[inset_0_0_0_1px_rgba(17,23,26,0.1),inset_0_0_18px_rgba(0,0,0,0.05)]" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 rounded-[2.75rem]"
                  style={{
                    background:
                      "radial-gradient(circle_at_top_right,rgba(16,22,26,0.08),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(16,22,26,0.12),transparent_22%),radial-gradient(circle_at_top_left,rgba(16,22,26,0.05),transparent_18%),linear-gradient(90deg,rgba(16,22,26,0.04),transparent_12%,transparent_84%,rgba(16,22,26,0.12)_100%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))]" />
                <div className="pointer-events-none absolute inset-x-0 top-2 z-30 flex items-start justify-center gap-2">
                  <span className="mt-[6px] h-[3px] w-12 rounded-full bg-[#11171a]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#151c20] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
                  <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[#0b1013] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" />
                </div>
                <div className="pointer-events-none absolute inset-y-[10%] left-0 z-20 w-5 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),transparent)]" />
                <div className="pointer-events-none absolute inset-y-[10%] right-0 z-20 w-4 bg-[linear-gradient(270deg,rgba(255,255,255,0.07),transparent)]" />
                <PhoneApp scrollProgress={scrollProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

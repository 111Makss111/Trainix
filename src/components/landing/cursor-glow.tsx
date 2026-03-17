"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
};

export function CursorMagicTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    let width = 0;
    let height = 0;
    let devicePixelRatioValue = 1;
    let animationFrameId = 0;

    const particles: Particle[] = [];

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      previousX: window.innerWidth / 2,
      previousY: window.innerHeight / 2,
      isActive: false,
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatioValue = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * devicePixelRatioValue;
      canvas.height = height * devicePixelRatioValue;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        devicePixelRatioValue,
        0,
        0,
        devicePixelRatioValue,
        0,
        0,
      );
    };

    const createParticle = (
      x: number,
      y: number,
      speedX: number,
      speedY: number,
    ) => {
      if (particles.length > 150) {
        particles.shift();
      }

      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: speedX * 0.1 + (Math.random() - 0.5) * 2,
        vy: speedY * 0.1 + (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 6,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
      });
    };

    const spawnTrail = (x: number, y: number) => {
      const deltaX = x - pointer.previousX;
      const deltaY = y - pointer.previousY;
      const distance = Math.hypot(deltaX, deltaY);
      const steps = Math.max(1, Math.min(10, Math.floor(distance / 5)));

      for (let index = 0; index < steps; index += 1) {
        const progress = index / steps;
        const currentX = pointer.previousX + deltaX * progress;
        const currentY = pointer.previousY + deltaY * progress;

        createParticle(currentX, currentY, deltaX, deltaY);
      }

      pointer.previousX = x;
      pointer.previousY = y;
    };

    const drawParticle = (particle: Particle) => {
      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size,
      );

      gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha})`);
      gradient.addColorStop(0.3, `rgba(40, 255, 122, ${particle.alpha * 0.8})`);
      gradient.addColorStop(1, "rgba(40, 255, 122, 0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.92;
        particle.vy *= 0.92;
        particle.vy -= 0.05;
        particle.alpha -= particle.decay;
        particle.size *= 0.94;

        if (particle.alpha <= 0.01 || particle.size <= 0.1) {
          particles.splice(index, 1);
          continue;
        }

        drawParticle(particle);
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!pointer.isActive) {
        pointer.previousX = event.clientX;
        pointer.previousY = event.clientY;
      }

      pointer.isActive = true;
      spawnTrail(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      pointer.isActive = false;
    };

    resizeCanvas();
    animationFrameId = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}

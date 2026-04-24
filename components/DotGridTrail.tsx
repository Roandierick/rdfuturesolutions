"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  glow: number;
};

const SPACING = 28;
const BASE_DIAMETER = 2;
const ACTIVE_DIAMETER = 5;
const BASE_OPACITY = 0.12;
const ACTIVE_OPACITY = 0.35;
const ACTIVE_RADIUS = 80;
const LERP_FACTOR = 0.12;

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function DotGridTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const canvasElement: HTMLCanvasElement = canvas;
    const canvasContext: CanvasRenderingContext2D = context;
    const dots: Dot[] = [];
    const mouse = { x: 0, y: 0, active: false };
    let frameId = 0;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvasElement.width = Math.floor(width * dpr);
      canvasElement.height = Math.floor(height * dpr);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      canvasContext.setTransform(1, 0, 0, 1, 0, 0);
      canvasContext.scale(dpr, dpr);

      dots.length = 0;

      for (let y = SPACING / 2; y <= height + SPACING; y += SPACING) {
        for (let x = SPACING / 2; x <= width + SPACING; x += SPACING) {
          dots.push({ x, y, glow: 0 });
        }
      }
    }

    function drawFrame() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvasContext.clearRect(0, 0, width, height);
      canvasContext.fillStyle = "#FFFFFF";
      canvasContext.fillRect(0, 0, width, height);

      for (const dot of dots) {
        let targetGlow = 0;

        if (mouse.active) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ACTIVE_RADIUS) {
            targetGlow = 1 - distance / ACTIVE_RADIUS;
          }
        }

        dot.glow = lerp(dot.glow, targetGlow, LERP_FACTOR);

        const diameter = BASE_DIAMETER + (ACTIVE_DIAMETER - BASE_DIAMETER) * dot.glow;
        const opacity = BASE_OPACITY + (ACTIVE_OPACITY - BASE_OPACITY) * dot.glow;

        canvasContext.beginPath();
        canvasContext.arc(dot.x, dot.y, diameter / 2, 0, Math.PI * 2);
        canvasContext.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        canvasContext.fill();
      }

      frameId = window.requestAnimationFrame(drawFrame);
    }

    function handleMouseMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    }

    function handleMouseOut(event: MouseEvent) {
      if (!event.relatedTarget) {
        mouse.active = false;
      }
    }

    function handleBlur() {
      mouse.active = false;
    }

    resizeCanvas();
    drawFrame();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", handleBlur);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 h-screen w-screen"
      style={{ zIndex: -1 }}
    />
  );
}

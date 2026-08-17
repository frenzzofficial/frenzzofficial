"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface UseOrbitGravityOptions {
  count: number;
  radiusRatio?: number;
  duration?: number;
  pulseInterval?: number;
  pulseScale?: number;
  hoverScale?: number;
}

const useOrbitGravity = ({
  count,
  radiusRatio = 0.42,
  duration = 26,
  pulseInterval = 1.1,
  pulseScale = 1.35,
  hoverScale = 1.45,
}: UseOrbitGravityOptions) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleDriver = useRef({ value: 0 });
  const rotateTween = useRef<gsap.core.Tween | null>(null);
  const pulseTl = useRef<gsap.core.Timeline | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function positionAll() {
      if (!stage) return;
      const size = stage.clientWidth;
      const radius = size * radiusRatio;
      const base = angleDriver.current.value;

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        if (hoveredIndexRef.current === i) {
          gsap.set(item, { x: 0, y: 0, zIndex: 20 });
          return;
        }
        const angle = (base + (360 / count) * i) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(item, { x, y, zIndex: 10 });
      });
    }

    rotateTween.current = gsap.to(angleDriver.current, {
      value: 360,
      duration,
      repeat: -1,
      ease: "none",
      onUpdate: positionAll,
    });

    pulseTl.current = gsap.timeline({ repeat: -1 });
    Array.from({ length: count }).forEach((_, i) => {
      pulseTl.current?.to(
        {},
        {
          duration: 0.01,
          onStart: () => {
            if (hoveredIndexRef.current !== null) return;
            const el = itemRefs.current[i];
            if (!el) return;
            gsap.to(el, {
              scale: pulseScale,
              duration: 0.4,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            });
          },
        },
        i * pulseInterval,
      );
    });

    window.addEventListener("resize", positionAll);
    return () => {
      rotateTween.current?.kill();
      pulseTl.current?.kill();
      window.removeEventListener("resize", positionAll);
    };
  }, [count, radiusRatio, duration, pulseInterval, pulseScale]);

  // pause/resume lives on the STAGE (parent), so it isn't fighting the
  // per-frame position updates that move badges out from under the cursor
  function handleStageEnter() {
    rotateTween.current?.pause();
  }

  function handleStageLeave() {
    hoveredIndexRef.current = null;
    itemRefs.current.forEach((item) => {
      if (item) gsap.to(item, { scale: 1, duration: 0.4, ease: "power2.out" });
    });
    rotateTween.current?.resume();
  }

  // per-item hover only handles the pull-to-center, since rotation is
  // already frozen by the time this can fire reliably
  function handleItemEnter(i: number) {
    hoveredIndexRef.current = i;
    const item = itemRefs.current[i];
    if (item)
      gsap.to(item, {
        x: 0,
        y: 0,
        scale: hoverScale,
        zIndex: 20,
        duration: 0.5,
        ease: "power3.out",
      });
  }

  function handleItemLeave(i: number) {
    if (hoveredIndexRef.current !== i) return;
    hoveredIndexRef.current = null;
    const item = itemRefs.current[i];
    if (item) gsap.to(item, { scale: 1, duration: 0.4, ease: "power2.out" });
  }

  function setItemRef(i: number) {
    return (el: HTMLDivElement | null) => {
      itemRefs.current[i] = el;
    };
  }

  return {
    stageRef,
    setItemRef,
    stageHandlers: {
      onMouseEnter: handleStageEnter,
      onMouseLeave: handleStageLeave,
    },
    handleItemEnter,
    handleItemLeave,
  };
};

export default useOrbitGravity;

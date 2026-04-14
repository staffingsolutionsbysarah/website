"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const outerX = useMotionValue(-100);
  const outerY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const outerSpringConfig = { damping: 20, stiffness: 300 };
  
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const outerSpringX = useSpring(outerX, outerSpringConfig);
  const outerSpringY = useSpring(outerY, outerSpringConfig);

  const isHoveringRef = useRef(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      outerX.set(e.clientX - 20);
      outerY.set(e.clientY - 20);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleElementHover = () => {
      isHoveringRef.current = true;
      setIsHovering(true);
    };

    const handleElementUnhover = () => {
      isHoveringRef.current = false;
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button'], [tabindex]:not([tabindex='-1'])"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementUnhover);
    });

    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], [tabindex]:not([tabindex='-1'])"
      );
      newElements.forEach((el) => {
        el.addEventListener("mouseenter", handleElementHover);
        el.addEventListener("mouseleave", handleElementUnhover);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementUnhover);
      });
      observer.disconnect();
    };
  }, [isVisible, cursorX, cursorY, outerX, outerY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="cursor_point"
        style={{
          translateX: springX,
          translateY: springY,
          scale: isHovering ? 1.5 : 1,
        }}
      />
      <motion.div
        className="cursor_outer"
        style={{
          translateX: outerSpringX,
          translateY: outerSpringY,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
      />
    </>
  );
}
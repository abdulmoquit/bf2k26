"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("spyglass-dot");
    const ring = document.getElementById("spyglass-cursor");
    const body = document.body;

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Disables the custom cursor if the user is on a touch screen
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      body.classList.add("custom-cursor-active");

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Smooth trailing physics
      let animId: number;
      const animateRing = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";

        animId = requestAnimationFrame(animateRing);
      };
      animateRing();

      // Expands the cursor when hovering over interactive elements
      const attachCursorEvents = () => {
        // Automatically targets standard interactive elements, plus any custom `.interactable` classes
        const interactables = document.querySelectorAll(
          "a, button, input, .interactable"
        );

        interactables.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.dataset.cursorAttached) return;
          htmlEl.dataset.cursorAttached = "true";

          htmlEl.addEventListener("mouseenter", () => {
            ring.classList.add("hovering");
            dot.classList.add("hovering");
          });
          htmlEl.addEventListener("mouseleave", () => {
            ring.classList.remove("hovering");
            dot.classList.remove("hovering");
          });
        });
      };

      attachCursorEvents();
      // Expose globally in case you dynamically load more buttons later
      (window as any).attachCursorEvents = attachCursorEvents;

      // Observe DOM mutations to automatically attach listeners to newly loaded items
      const observer = new MutationObserver(() => {
        attachCursorEvents();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animId);
        observer.disconnect();
        body.classList.remove("custom-cursor-active");
      };
    }
  }, []);

  return (
    <>
      <div className="spyglass-cursor" id="spyglass-cursor">
        <svg viewBox="0 0 100 100" className="spyglass-text-ring">
          <path
            id="curve"
            d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0"
            fill="transparent"
          />
          <text>
            <textPath href="#curve" startOffset="0%">
              UNTOLD • UNFAZED • UNCHARTED • UNTOLD • UNFAZED • UNCHARTED •
            </textPath>
          </text>
        </svg>
      </div>
      <div className="spyglass-dot" id="spyglass-dot"></div>
    </>
  );
}

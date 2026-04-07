"use client";

import { TransitionRouter } from "next-transition-router";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function TransitionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, {
        yPercent: 100,
      });
    }

    if (textRef.current) {
      gsap.set(textRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.8,
      });
    }
  }, []);

  const letters = "HELLDESTRUCTION".split("");

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-black pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <div
          ref={textRef}
          className="flex flex-wrap justify-center items-center text-white font-black tracking-[0.15em] text-3xl md:text-6xl lg:text-7xl uppercase"
        >
          {letters.map((letter, i) => (
            <span key={i} className="inline-block">
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>

      <TransitionRouter
        auto
        leave={(next) => {
          const tl = gsap.timeline({
            onComplete: next,
          });

          if (pageRef.current) {
            tl.to(pageRef.current, {
              opacity: 0.4,
              scale: 0.98,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          if (overlayRef.current) {
            tl.to(
              overlayRef.current,
              {
                yPercent: 0,
                duration: 0.7,
                ease: "power4.inOut",
              },
              0
            );
          }

          if (textRef.current) {
            tl.to(
              textRef.current.children,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.04,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.25"
            );

            tl.to(textRef.current.children, {
              scale: 1.35,
              x: (i) => (i - letters.length / 2) * 8,
              duration: 0.55,
              ease: "power3.inOut",
            });
          }
        }}
        enter={(next) => {
          const tl = gsap.timeline({
            onComplete: () => {
              if (overlayRef.current) {
                gsap.set(overlayRef.current, {
                  yPercent: 100,
                });
              }

              if (textRef.current) {
                gsap.set(textRef.current.children, {
                  opacity: 0,
                  y: 40,
                  scale: 0.8,
                  x: 0,
                });
              }

              if (pageRef.current) {
                gsap.set(pageRef.current, {
                  opacity: 1,
                  scale: 1,
                });
              }

              next();
            },
          });

          if (pageRef.current) {
            gsap.set(pageRef.current, {
              opacity: 0,
              scale: 1.02,
            });
          }

          if (textRef.current) {
            tl.to(textRef.current.children, {
              opacity: 0,
              y: -30,
              scale: 1.8,
              stagger: 0.03,
              duration: 0.35,
              ease: "power3.in",
            });
          }

          if (overlayRef.current) {
            tl.to(
              overlayRef.current,
              {
                yPercent: -100,
                duration: 0.7,
                ease: "power4.inOut",
              },
              "-=0.15"
            );
          }

          if (pageRef.current) {
            tl.to(
              pageRef.current,
              {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "power2.out",
              },
              "-=0.3"
            );
          }
        }}
      >
        <main ref={pageRef} className="min-h-dvh">
          {children}
        </main>
      </TransitionRouter>
    </>
  );
}
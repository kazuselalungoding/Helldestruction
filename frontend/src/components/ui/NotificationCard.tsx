"use client";

import { useEffect, useState } from "react";

type NotificationCardVariant = "info" | "success" | "error";

type NotificationCardProps = {
  title: string;
  message?: string;
  variant?: NotificationCardVariant;
  show?: boolean;
  onClose?: () => void;
  className?: string;
};

const variantStyles: Record<NotificationCardVariant, string> = {
  info: "border-notification-100/40 bg-notification-100 text-white",
  success: "border-emerald-500/40 bg-emerald-600 text-white",
  error: "border-red-500/40 bg-red-600 text-white",
};

export default function NotificationCard({
  title,
  message,
  variant = "info",
  show = true,
  onClose,
  className = "",
}: NotificationCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!show) {
      setMounted(false);
      return;
    }

    const rafId = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(rafId);
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] w-[min(92vw,380px)]">
      <div
        className={[
          "pointer-events-auto rounded-xl border p-4 shadow-2xl transition-all duration-300",
          "transform",
          mounted
            ? "translate-x-0 opacity-100"
            : "translate-x-8 opacity-0",
          variantStyles[variant],
          className,
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-wide">{title}</p>
            {message ? <p className="mt-1 text-sm text-white/90">{message}</p> : null}
          </div>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notification"
              className="rounded-md px-2 py-0.5 text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              x
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

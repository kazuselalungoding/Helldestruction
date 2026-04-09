"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/features/search/components/SearchBar";

interface NavbarProps {
  fixed?: boolean;
  color?: boolean;
  margin?: string;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Product", href: "/products" },
];

export default function Navbar({
  fixed = false,
  color = true,
  margin = "",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = "HELLDESTRUCTION";

  return (
    <>
      <header
        className={`w-full border-b border-primary-100 bg-white/95 backdrop-blur-md ${
          fixed ? "sticky top-0 z-50" : "relative z-40"
        } ${margin}`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-10">
          {/* DESKTOP */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-8">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className={`font-bagos text-[2rem] font-bold uppercase tracking-[-0.04em] transition ${
                  color
                    ? "text-primary-900 hover:text-neutral-500"
                    : "text-black"
                }`}
              >
                {logo}
              </Link>
            </div>

            {/* Search */}
            <div className="flex flex-1 justify-center">
              <div className="w-full max-w-3xl">
                <SearchBar />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/dashboard"
                aria-label="Go to dashboard"
                className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-primary-100 bg-primary-50 text-primary-900 transition hover:-translate-y-0.5 hover:bg-primary-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[24px] w-[24px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.9}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                  />
                </svg>
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-primary-100 bg-primary-50 transition hover:-translate-y-0.5 hover:bg-primary-100"
              >
                <div className="flex h-5 flex-col justify-between">
                  <span className="block h-[2px] w-7 rounded-full bg-primary-900" />
                  <span className="block h-[2px] w-7 rounded-full bg-primary-900" />
                  <span className="block h-[2px] w-7 rounded-full bg-primary-900" />
                </div>
              </button>
            </div>
          </div>

          {/* MOBILE / TABLET */}
          <div className="lg:hidden">
            {/* Top Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Link
                  href="/"
                  className={`block truncate font-bagos text-[1.7rem] font-bold uppercase tracking-[-0.04em] transition sm:text-[1.9rem] ${
                    color
                      ? "text-primary-900 hover:text-neutral-500"
                      : "text-black"
                  }`}
                >
                  {logo}
                </Link>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <Link
                  href="/dashboard"
                  aria-label="Go to dashboard"
                  className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-primary-100 bg-primary-50 text-primary-900 transition hover:-translate-y-0.5 hover:bg-primary-100 sm:h-12 sm:w-12"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[20px] w-[20px] sm:h-[22px] sm:w-[22px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.9}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-primary-100 bg-primary-50 transition hover:-translate-y-0.5 hover:bg-primary-100 sm:h-12 sm:w-12"
                >
                  <div className="flex h-4 flex-col justify-between">
                    <span className="block h-[2px] w-5 rounded-full bg-primary-900 sm:w-6" />
                    <span className="block h-[2px] w-5 rounded-full bg-primary-900 sm:w-6" />
                    <span className="block h-[2px] w-5 rounded-full bg-primary-900 sm:w-6" />
                  </div>
                </button>
              </div>
            </div>

            {/* Search Row */}
            <div className="mt-4 border-t border-primary-100 pt-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px] transition ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[320px] max-w-[88vw] border-l border-primary-100 bg-white shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-primary-100 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
              Navigation
            </p>
            <h2 className="mt-1 text-xl font-semibold text-primary-900">
              Menu
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-100 bg-primary-50 text-primary-900 transition hover:bg-primary-100"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl border border-primary-100 bg-primary-50/50 px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-primary-900 transition hover:border-neutral-300 hover:bg-white hover:translate-x-1"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 rounded-2xl bg-primary-900 px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-primary-700"
            >
              Go To Dashboard
            </Link>
          </nav>

          <div className="mt-10 rounded-[28px] bg-neutral-50/50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              HELLDESTRUCTION
            </p>
            <p className="mt-3 text-sm leading-7 text-primary-600">
              Explore the latest drops, categories, and product collections.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
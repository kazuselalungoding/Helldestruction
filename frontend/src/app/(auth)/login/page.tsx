"use client";

export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Navbar fixed={true} />
      <div className="grid min-h-screen grid-cols-1 px-4 pb-4 pt-24 md:grid-cols-2 md:gap-4 md:px-8 md:pb-8 md:pt-28">
        <section className="relative hidden overflow-hidden rounded-4xl border border-black/10 bg-[#dbd9d6] md:block">
          <img
            src="/assets/image/authSide.png"
            alt="Fashion editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />
          <div className="absolute bottom-8 left-8 max-w-md text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.35em]">Helldestruction</p>
            <h2 className="font-bagos text-5xl leading-[0.9]">
              Dress Loud.
              <br />
              Move Fast.
            </h2>
          </div>
        </section>

        <section className="relative flex items-center justify-center rounded-4xl border border-black/10 bg-white/70 p-6 backdrop-blur-sm md:p-10">
          <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[#1737ff]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[#d81f3f]/10 blur-3xl" />
          <LoginForm />
        </section>
      </div>
    </main>
  );
}

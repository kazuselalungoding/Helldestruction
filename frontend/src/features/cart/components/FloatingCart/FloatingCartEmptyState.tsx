import type {FloatingCartEmptyStateProps} from '@/features/cart/types/floating-cart.types';

export default function FloatingCartEmptyState({
  onStartShopping,
}: FloatingCartEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col px-6 pb-6 sm:px-9">
      <div className="relative mt-2 flex flex-1 items-center justify-center">
        <div className="absolute h-55 w-90 rounded-[50%] border border-[#1737ff]" />
        <svg
          viewBox="0 0 220 260"
          className="relative h-80 w-64 text-[#b7bcc7] drop-shadow-[0_12px_18px_rgba(23,55,255,0.18)]"
          aria-hidden="true"
        >
          <path
            d="M45 72h130l14 160H31L45 72Z"
            fill="currentColor"
            stroke="#1737ff"
            strokeWidth="2"
          />
          <path
            d="M73 80c0-24 16-40 37-40s37 16 37 40"
            fill="none"
            stroke="#1737ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-center font-bagos text-6xl font-bold uppercase leading-[0.85] sm:text-7xl">
        Your bag is
        <br />
        empty.
      </p>

      <button
        type="button"
        className="mt-5 rounded-full border border-[#1737ff] py-2.5 text-xl uppercase tracking-wide transition hover:bg-[#1737ff] hover:text-white"
        onClick={onStartShopping}
      >
        Start Shopping
      </button>
    </div>
  );
}

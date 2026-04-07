type FloatingCartTriggerProps = {
  isOpen: boolean;
  itemCount: number;
  onToggle: () => void;
};

export default function FloatingCartTrigger({
  isOpen,
  itemCount,
  onToggle,
}: FloatingCartTriggerProps) {
  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#1737ff] bg-[#1737ff] text-white shadow-xl transition hover:scale-105"
        aria-label="Open shopping bag"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M3 4h2l2.2 10.3a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H7" />
          <circle cx="10" cy="20" r="1.6" />
          <circle cx="18" cy="20" r="1.6" />
        </svg>

        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-white px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-[#1737ff]">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
    </div>
  );
}

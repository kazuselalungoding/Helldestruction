type FloatingCartHeaderProps = {
  onClose: () => void;
};

export default function FloatingCartHeader({ onClose }: FloatingCartHeaderProps) {
  return (
    <div className="flex items-start justify-between px-6 pb-3 pt-5 sm:px-9 sm:pt-6">
      <h2 className="font-bagos text-5xl font-bold uppercase leading-[0.9]">
        Shopping Bag
      </h2>

      <button
        type="button"
        onClick={onClose}
        className="rounded-full border border-[#1737ff] px-3 py-1 text-sm font-medium uppercase tracking-wide transition hover:bg-[#1737ff] hover:text-white"
      >
        Close
      </button>
    </div>
  );
}

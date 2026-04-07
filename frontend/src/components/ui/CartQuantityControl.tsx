'use client';

interface CartQuantityControlProps {
  quantity: number;
  disabled?: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function CartQuantityControl({
  quantity,
  disabled = false,
  onDecrease,
  onIncrease,
}: CartQuantityControlProps) {
  return (
    <div className="inline-flex overflow-hidden border border-notification-100">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled}
        className="grid h-10 w-10 place-items-center text-notification-100 text-lg transition hover:bg-notification-100 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        -
      </button>

      <span className="grid h-10 min-w-10 place-items-center bg-notification-100 px-3 text-sm font-semibold text-white">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        className="grid h-10 w-10 place-items-center text-notification-100 text-lg transition hover:bg-notification-100 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
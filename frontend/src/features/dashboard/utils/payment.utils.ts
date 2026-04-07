export const formatRupiah = (value: string | number) => {
  return `Rp ${Number(value).toLocaleString('id-ID')}`;
};

export const formatDateTime = (value?: string | null) => {
  if (!value) return '-';
  return new Date(value).toLocaleString('id-ID');
};

export const getPaymentStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'Paid';
    case 'pending':
      return 'Pending';
    case 'expired':
      return 'Expired';
    case 'failed':
      return 'Failed';
    default:
      return status;
  }
};

export const getPaymentStatusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-green-50 text-green-700 ring-1 ring-green-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'expired':
      return 'bg-neutral-100 text-primary-600 ring-1 ring-primary-100';
    case 'failed':
      return 'bg-red-50 text-red-700 ring-1 ring-red-200';
    default:
      return 'bg-primary-50 text-primary-600 ring-1 ring-primary-100';
  }
};
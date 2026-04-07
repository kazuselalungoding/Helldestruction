export const formatRupiah = (value: string | number) => {
  return `Rp ${Number(value).toLocaleString('id-ID')}`;
};

export const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString('id-ID');
};

export const getStatusBadge = (status?: string) => {
  const normalized = status?.toLowerCase();

  switch (normalized) {
    case 'paid':
    case 'success':
    case 'completed':
      return 'bg-green-50 text-green-700';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700';
    case 'failed':
    case 'cancelled':
      return 'bg-red-50 text-red-700';
    default:
      return 'bg-primary-50 text-primary-700';
  }
};
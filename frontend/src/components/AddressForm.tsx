'use client';

import { useState, useEffect } from 'react';
import { useAddressStore, type Address } from '@/stores/addressStore';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';

interface AddressFormProps {
  address?: Address;
  onSuccess?: () => void;
}

export default function AddressForm({ address, onSuccess }: AddressFormProps) {
  const [formData, setFormData] = useState({
    recipient_name: '',
    street: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createAddress, updateAddress, isLoading } = useAddressStore();

  useEffect(() => {
    if (address) {
      setFormData({
        recipient_name: (address as any).recipient_name || '',
        street: address.street,
        city: address.city,
        province: (address as any).province,
        postal_code: (address as any).postal_code,
        country: address.country,
        phone: address.phone,
      });
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.recipient_name.trim()) newErrors.recipient_name = 'Recipient name is required';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!formData.postal_code.trim()) newErrors.postal_code = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (address) {
        await updateAddress(address.id, formData as any);
      } else {
        await createAddress(formData as any);
        setFormData({
          recipient_name: '',
          street: '',
          city: '',
          province: '',
          postal_code: '',
          country: '',
          phone: '',
        });
      }
      onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-white mb-2 block text-sm font-semibold">
          Recipient Name
        </label>
        <TextField
          name="recipient_name"
          value={formData.recipient_name}
          onChange={handleChange}
          placeholder="Enter recipient name"
          size="large"
          disabled={isLoading || isSubmitting}
        />
        {errors.recipient_name && <span className="text-red-500 text-sm">{errors.recipient_name}</span>}
      </div>

      <div>
        <label className="text-white mb-2 block text-sm font-semibold">
          Street Address
        </label>
        <TextField
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Enter street address"
          size="large"
          disabled={isLoading || isSubmitting}
        />
        {errors.street && <span className="text-red-500 text-sm">{errors.street}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white mb-2 block text-sm font-semibold">
            City
          </label>
          <TextField
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            size="large"
            disabled={isLoading || isSubmitting}
          />
          {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
        </div>

        <div>
          <label className="text-white mb-2 block text-sm font-semibold">
            Province
          </label>
          <TextField
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Enter province"
            size="large"
            disabled={isLoading || isSubmitting}
          />
          {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white mb-2 block text-sm font-semibold">
            Postal Code
          </label>
          <TextField
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            placeholder="Enter postal code"
            size="large"
            disabled={isLoading || isSubmitting}
          />
          {errors.postal_code && <span className="text-red-500 text-sm">{errors.postal_code}</span>}
        </div>

        <div>
          <label className="text-white mb-2 block text-sm font-semibold">
            Country
          </label>
          <TextField
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            size="large"
            disabled={isLoading || isSubmitting}
          />
          {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
        </div>
      </div>

      <div>
        <label className="text-white mb-2 block text-sm font-semibold">
          Phone Number
        </label>
        <TextField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          size="large"
          disabled={isLoading || isSubmitting}
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
      </div>

      <Button
        label={address ? 'UPDATE ADDRESS' : 'ADD ADDRESS'}
        type="submit"
        size="large"
        disabled={isLoading || isSubmitting}
      />
    </form>
  );
}

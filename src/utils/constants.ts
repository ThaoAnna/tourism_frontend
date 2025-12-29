import type { CategoryOption } from '../types';

export const API_BASE_URL = 'http://localhost:8080/api';

export const CATEGORIES: CategoryOption[] = [
  { value: 'all', label: 'All Tours' },
  { value: 'Classic', label: 'Classic Tours' },
  { value: 'Romantic', label: 'Romantic Getaways' },
  { value: 'Luxury', label: 'Luxury Tours' },
  { value: 'Balanced', label: 'Balanced Tours' },
  { value: 'Cultural', label: 'Cultural Tours' },
  { value: 'Coastal', label: 'Coastal Escapes' },
  { value: 'Greece', label: 'Greece Tours' },
  { value: 'Mediterranean', label: 'Mediterranean Tours' },
  { value: 'Ultimate', label: 'Ultimate Tours' }
];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled'
} as const;
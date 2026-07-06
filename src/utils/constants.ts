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

export const DURATION_OPTIONS: CategoryOption[] = [
  { value: 'all', label: 'Any duration' },
  { value: '1-7', label: '1–7 days' },
  { value: '8-10', label: '8–10 days' },
  { value: '11+', label: '11+ days' },
];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled'
} as const;

/** Stable display ratings until reviews API is connected */
export function getTourRating(tourId: number): { rating: number; reviewCount: number } {
  const rating = Math.round((4.6 + (tourId % 4) * 0.1) * 10) / 10;
  const reviewCount = 48 + tourId * 23;
  return { rating, reviewCount };
}
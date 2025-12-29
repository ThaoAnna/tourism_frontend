// src/types/index.ts

export interface CategoryOption {
  value: string;
  label: string;
}

export interface Tour {
  id: number;
  name: string;
  duration: number;
  style: string;
  route: string[];
  routeDetails: RouteDetail[];
  experience: string[];
  priceBreakdown: PriceBreakdown;
  totalPrice: {
    min: number;
    max: number;
  };
  imageUrl: string;
  highlights: string[];
  description: string;
}

export interface RouteDetail {
  day: string;
  location: string;
  description?: string;
}

export interface PriceBreakdown {
  transport: number;
  hotel: number;
  foodAndActivities: number;
}

export interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tour: Tour;
  bookingDate: string;
  travelDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: string;
}

export interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourId: number;
  travelDate: string;
  numberOfPeople: number;
}

export interface FormErrors {
  [key: string]: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface ApiError {
  message: string;
  status?: number;
}
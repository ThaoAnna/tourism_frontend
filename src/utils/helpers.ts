// src/utils/helpers.ts (FRONTEND)
export const formatPrice = (price: number): string => {
  return `€${price.toLocaleString()}`; // Display formatting for UI
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const calculateTotalPrice = (price: number, people: number): number => {
  return price * people; // Client-side calculation
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0]; // For date input min value
};

export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email); // Form validation
};
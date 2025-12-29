/* eslint-disable no-useless-catch */
import api from './api';
import type { Booking, BookingRequest } from '../types';
import type { AxiosResponse } from 'axios';

export const bookingService = {
  create: async (bookingData: BookingRequest): Promise<Booking> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: AxiosResponse<Booking> = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByEmail: async (email: string): Promise<Booking[]> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response: AxiosResponse<Booking[]> = await api.get(`/bookings/customer/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async (): Promise<Booking[]> => {
    try {
      const response: AxiosResponse<Booking[]> = await api.get('/bookings');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
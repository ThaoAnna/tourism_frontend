/* eslint-disable no-useless-catch */
import api from './api';
import type { Tour } from '../types/index';
import type { AxiosResponse } from 'axios';

export const TourService = {
  getAll: async (): Promise<Tour[]> => {
    try {
      const response: AxiosResponse<Tour[]> = await api.get('/Tours');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number): Promise<Tour> => {
    try {
      const response: AxiosResponse<Tour> = await api.get(`/Tours/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  search: async (query: string): Promise<Tour[]> => {
    try {
      const response: AxiosResponse<Tour[]> = await api.get('/Tours/search', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByCategory: async (category: string): Promise<Tour[]> => {
    try {
      const response: AxiosResponse<Tour[]> = await api.get(`/Tours/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
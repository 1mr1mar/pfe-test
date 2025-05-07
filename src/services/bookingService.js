import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const bookingService = {
  getAllBookings: async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  getBookingById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  updateBooking: async (id, bookingData) => {
    try {
      const response = await axios.put(`${API_URL}/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  deleteBooking: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  getBookingsByDate: async (date) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/date/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by date:', error);
      throw error;
    }
  },

  getBookingsByStatus: async (status) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by status:', error);
      throw error;
    }
  },

  searchBookings: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching bookings:', error);
      throw error;
    }
  }
}; 
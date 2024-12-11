import axios from 'axios';

// Assuming the backend is running on localhost:3001
export const submitBooking = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3001/api/submit-booking', formData);
    return response.data;  // Return the response from the backend
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw new Error('Booking submission failed');
  }
};

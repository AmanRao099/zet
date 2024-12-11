const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON requests

// MongoDB Connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/bookings', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  date: Date,
  service: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Route for submitting a booking
app.post('/api/submit-booking', async (req, res) => {
  const { name, contact, date, service } = req.body;

  if (!name || !contact || !date || !service) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newBooking = new Booking({ name, contact, date, service });
    await newBooking.save();

    console.log("New booking saved:", newBooking);  // Log the booking details
    res.json({ success: true, message: 'Booking confirmed' });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: 'Booking failed. Please try again.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { name, contact, date, service } = req.body;

    const newBooking = new Booking({
      name,
      contact,
      date,
      service,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking confirmed successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

module.exports = {
  createBooking,
};

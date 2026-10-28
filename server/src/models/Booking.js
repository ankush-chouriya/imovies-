import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  bookingReference: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  selectedSeats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);

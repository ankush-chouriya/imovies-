import mongoose from 'mongoose';
const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  screenId: { type: mongoose.Schema.Types.ObjectId, required: true },
  showDate: { type: Date, required: true, index: true },
  startTime: { type: String, required: true },
  ticketPrice: { type: Number, required: true, min: 0 },
  rows: { type: Number, default: 6 },
  seatsPerRow: { type: Number, default: 8 },
  bookedSeats: { type: [String], default: [] },
  status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' }
}, { timestamps: true });
showSchema.index({ movieId: 1, cinemaId: 1, showDate: 1 });
export default mongoose.model('Show', showSchema);

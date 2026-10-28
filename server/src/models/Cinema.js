import mongoose from 'mongoose';
const screenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rows: { type: Number, default: 6, min: 1, max: 12 },
  seatsPerRow: { type: Number, default: 8, min: 1, max: 20 }
}, { _id: true });
const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  screens: [screenSchema]
}, { timestamps: true });
export default mongoose.model('Cinema', cinemaSchema);

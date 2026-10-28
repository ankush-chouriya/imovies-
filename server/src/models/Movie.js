import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  description: { type: String, default: '' },
  genre: [{ type: String }],
  language: { type: String, default: 'English' },
  duration: { type: Number, default: 120 },
  rating: { type: Number, min: 0, max: 10, default: 7 },
  releaseDate: { type: Date },
  posterUrl: { type: String, default: '' },
  backdropUrl: { type: String, default: '' },
  trailerUrl: { type: String, default: '' },
  cast: [{ type: String }],
  director: { type: String, default: 'Not listed' },
  status: { type: String, enum: ['now-showing', 'coming-soon'], default: 'now-showing' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Movie', movieSchema);

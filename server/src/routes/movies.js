import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Movie from '../models/Movie.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.language) filter.language = req.query.language;
    if (req.query.q) filter.title = { $regex: String(req.query.q).slice(0, 80), $options: 'i' };
    const movies = await Movie.find(filter).sort({ featured: -1, createdAt: -1 }).limit(100);
    res.json({ success: true, data: movies });
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { const movie = await Movie.findById(req.params.id); if (!movie) return res.status(404).json({ success:false, message:'Movie not found' }); res.json({ success:true, data:movie }); }
  catch (e) { next(e); }
});
router.post('/', protect, adminOnly, body('title').trim().notEmpty(), async (req, res, next) => {
  try { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({success:false,message:'Title is required'}); const movie = await Movie.create(req.body); res.status(201).json({success:true,data:movie}); }
  catch (e) { next(e); }
});
router.patch('/:id', protect, adminOnly, async (req, res, next) => {
  try { const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true, strict:true }); if (!movie) return res.status(404).json({success:false,message:'Movie not found'}); res.json({success:true,data:movie}); }
  catch (e) { next(e); }
});
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try { const movie = await Movie.findByIdAndDelete(req.params.id); if (!movie) return res.status(404).json({success:false,message:'Movie not found'}); res.json({success:true,message:'Movie deleted'}); }
  catch (e) { next(e); }
});
export default router;

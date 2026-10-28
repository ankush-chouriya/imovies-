import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });
  next();
};
const tokenFor = user => jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
const safeUser = user => ({ id: user._id, name: user.name, email: user.email, role: user.role });
router.post('/register', authLimiter, body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2–80 characters'), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 }).withMessage('Password must contain at least 8 characters'), validate, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ success: false, message: 'Email is already registered' });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ success: true, message: 'Account created', data: { user: safeUser(user), token: tokenFor(user) } });
  } catch (e) { next(e); }
});
router.post('/login', authLimiter, body('email').isEmail().normalizeEmail(), body('password').notEmpty(), validate, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) return res.status(401).json({ success: false, message: 'Email or password is incorrect' });
    res.json({ success: true, message: 'Login successful', data: { user: safeUser(user), token: tokenFor(user) } });
  } catch (e) { next(e); }
});
router.get('/me', protect, (req, res) => res.json({ success: true, data: { user: safeUser(req.user) } }));
router.patch('/me', protect, body('name').optional().trim().isLength({ min: 2, max: 80 }), validate, async (req, res, next) => {
  try {
    if (req.body.role || req.body.email || req.body.passwordHash) return res.status(400).json({ success: false, message: 'Unsupported profile fields' });
    if (req.body.name) req.user.name = req.body.name;
    await req.user.save();
    res.json({ success: true, data: { user: safeUser(req.user) } });
  } catch (e) { next(e); }
});
export default router;

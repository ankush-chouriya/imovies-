import { Router } from 'express';
import Cinema from '../models/Cinema.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.get('/', async (req,res,next) => { try { res.json({success:true,data:await Cinema.find().sort({name:1})}); } catch(e){next(e);} });
router.post('/', protect, adminOnly, async (req,res,next) => { try { res.status(201).json({success:true,data:await Cinema.create(req.body)}); } catch(e){next(e);} });
router.patch('/:id', protect, adminOnly, async (req,res,next) => { try { const c=await Cinema.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!c)return res.status(404).json({success:false,message:'Cinema not found'}); res.json({success:true,data:c}); } catch(e){next(e);} });
router.delete('/:id', protect, adminOnly, async (req,res,next) => { try { const c=await Cinema.findByIdAndDelete(req.params.id); if(!c)return res.status(404).json({success:false,message:'Cinema not found'}); res.json({success:true,message:'Cinema deleted'}); } catch(e){next(e);} });
export default router;

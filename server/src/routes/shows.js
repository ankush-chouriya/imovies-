import { Router } from 'express';
import Show from '../models/Show.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.get('/', async (req,res,next) => {
  try {
    const f={status:'scheduled'};
    if(req.query.movieId) f.movieId=req.query.movieId;
    if(req.query.cinemaId) f.cinemaId=req.query.cinemaId;
    if(req.query.date){ const d=new Date(req.query.date); if(Number.isNaN(+d)) return res.status(400).json({success:false,message:'Invalid date'}); const end=new Date(d); end.setDate(end.getDate()+1); f.showDate={$gte:d,$lt:end}; }
    const shows=await Show.find(f).populate('movieId').populate('cinemaId').sort({showDate:1,startTime:1}).limit(200);
    res.json({success:true,data:shows});
  } catch(e){next(e);}
});
router.get('/:id/seats', async (req,res,next) => {
  try { const s=await Show.findById(req.params.id).populate('movieId','title posterUrl').populate('cinemaId','name location'); if(!s)return res.status(404).json({success:false,message:'Show not found'}); res.json({success:true,data:{show:s,bookedSeats:s.bookedSeats}}); }
  catch(e){next(e);}
});
router.post('/', protect, adminOnly, async (req,res,next) => {
  try { const s=await Show.create(req.body); res.status(201).json({success:true,data:s}); } catch(e){next(e);}
});
router.patch('/:id', protect, adminOnly, async (req,res,next) => {
  try { const s=await Show.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!s)return res.status(404).json({success:false,message:'Show not found'}); res.json({success:true,data:s}); } catch(e){next(e);}
});
router.delete('/:id', protect, adminOnly, async (req,res,next) => {
  try { const s=await Show.findByIdAndDelete(req.params.id); if(!s)return res.status(404).json({success:false,message:'Show not found'}); res.json({success:true,message:'Show deleted'}); } catch(e){next(e);}
});
export default router;

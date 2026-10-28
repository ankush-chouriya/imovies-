import { Router } from 'express';
import crypto from 'node:crypto';
import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.use(protect);
router.post('/', async (req,res,next) => {
  let reservedShowId = null, seats = [];
  try {
    const { showId, selectedSeats } = req.body;
    if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length < 1 || selectedSeats.length > 10) return res.status(400).json({success:false,message:'Choose between 1 and 10 seats'});
    seats=[...new Set(selectedSeats.map(s=>String(s).trim().toUpperCase()))];
    if(seats.length!==selectedSeats.length || seats.some(s=>!/^[A-L](?:1[0-9]|20|[1-9])$/.test(s))) return res.status(400).json({success:false,message:'Seat selection is invalid'});
    const show = await Show.findOneAndUpdate(
      { _id: showId, status:'scheduled', bookedSeats: { $nin: seats } },
      { $addToSet: { bookedSeats: { $each: seats } } },
      { new:true, runValidators:true }
    );
    if(!show) return res.status(409).json({success:false,message:'One or more seats are no longer available. Refresh seat availability and try again.'});
    reservedShowId=show._id;
    if(seats.some(s=>Number(s.slice(1))>show.seatsPerRow || s.charCodeAt(0)-64>show.rows)) {
      await Show.updateOne({_id:show._id},{$pullAll:{bookedSeats:seats}});
      return res.status(400).json({success:false,message:'Selected seat is outside this screen layout'});
    }
    const booking=await Booking.create({bookingReference:'IMV-'+crypto.randomBytes(4).toString('hex').toUpperCase(),userId:req.user._id,showId:show._id,selectedSeats:seats,totalAmount:show.ticketPrice*seats.length});
    res.status(201).json({success:true,message:'Demo booking confirmed. No payment was processed.',data:await Booking.findById(booking._id).populate({path:'showId',populate:[{path:'movieId'},{path:'cinemaId'}]})});
  } catch(e) {
    if(reservedShowId && seats.length) await Show.updateOne({_id:reservedShowId},{$pullAll:{bookedSeats:seats}}).catch(()=>{});
    next(e);
  }
});
router.get('/mine', async (req,res,next) => {
  try { const b=await Booking.find({userId:req.user._id}).populate({path:'showId',populate:[{path:'movieId'},{path:'cinemaId'}]}).sort({createdAt:-1}); res.json({success:true,data:b}); } catch(e){next(e);}
});
router.get('/:id', async (req,res,next) => {
  try { const filter=req.user.role==='admin'?{_id:req.params.id}:({_id:req.params.id,userId:req.user._id}); const b=await Booking.findOne(filter).populate({path:'showId',populate:[{path:'movieId'},{path:'cinemaId'}]}); if(!b)return res.status(404).json({success:false,message:'Booking not found'}); res.json({success:true,data:b}); } catch(e){next(e);}
});
router.patch('/:id/cancel', async (req,res,next) => {
  try {
    const filter=req.user.role==='admin'?{_id:req.params.id,status:'confirmed'}:{_id:req.params.id,userId:req.user._id,status:'confirmed'};
    const b=await Booking.findOne(filter);
    if(!b)return res.status(404).json({success:false,message:'Active booking not found'});
    const show=await Show.findById(b.showId);
    if(show && new Date(show.showDate)>new Date()) await Show.updateOne({_id:show._id},{$pullAll:{bookedSeats:b.selectedSeats}});
    b.status='cancelled'; await b.save();
    res.json({success:true,message:'Booking cancelled and seats released',data:b});
  } catch(e){next(e);}
});
router.get('/admin/all', adminOnly, async (req,res,next) => { try { const b=await Booking.find().populate('userId','name email').populate({path:'showId',populate:[{path:'movieId'},{path:'cinemaId'}]}).sort({createdAt:-1}).limit(500); res.json({success:true,data:b}); } catch(e){next(e);} });
export default router;

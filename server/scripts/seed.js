import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import User from '../src/models/User.js';
import Movie from '../src/models/Movie.js';
import Cinema from '../src/models/Cinema.js';
import Show from '../src/models/Show.js';
const movies=[
 ['Interstellar','A team travels beyond this world to search for humanity’s future.',['Sci-Fi','Drama'],'English',169,8.7,'now-showing'],
 ['Inception','A skilled thief enters dreams to steal and plant ideas.',['Action','Sci-Fi'],'English',148,8.8,'now-showing'],
 ['The Dark Knight','A masked hero faces a dangerous criminal mastermind.',['Action','Crime'],'English',152,9.0,'now-showing'],
 ['Dune: Part Two','A young leader joins the desert people on an epic journey.',['Adventure','Sci-Fi'],'English',166,8.5,'now-showing'],
 ['Spider-Man: Into the Spider-Verse','A teenager discovers a new kind of heroism across dimensions.',['Animation','Action'],'English',117,8.4,'now-showing'],
 ['The Grand Budapest Hotel','A hotel concierge and lobby boy become involved in an unusual adventure.',['Comedy','Drama'],'English',99,8.1,'now-showing'],
 ['Coco','A young musician discovers family history in a colorful land of memories.',['Animation','Family'],'English',105,8.4,'now-showing'],
 ['3 Idiots','Three engineering students challenge pressure and expectations.',['Comedy','Drama'],'Hindi',170,8.4,'now-showing'],
 ['Lagaan','A village team challenges colonial rulers in a high-stakes cricket match.',['Drama','Sport'],'Hindi',224,8.1,'coming-soon'],
 ['The Silent Planet','A science team discovers a mysterious signal far from Earth.',['Sci-Fi','Thriller'],'English',128,7.5,'coming-soon']
];
try {
 await connectDB();
 await Promise.all([User.deleteMany({}),Movie.deleteMany({}),Cinema.deleteMany({}),Show.deleteMany({})]);
 const [admin,user]=await Promise.all([
  User.create({name:'IMovies Admin',email:'admin@imovies.local',passwordHash:await bcrypt.hash('Admin123!',12),role:'admin'}),
  User.create({name:'Demo User',email:'user@imovies.local',passwordHash:await bcrypt.hash('User123!',12),role:'user'})
 ]);
 const createdMovies=await Movie.insertMany(movies.map((m,i)=>({title:m[0],description:m[1],genre:m[2],language:m[3],duration:m[4],rating:m[5],status:m[6],featured:i<3,releaseDate:new Date(Date.now()+i*86400000),posterUrl:`https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop`,backdropUrl:'',cast:['Cast details available soon'],director:'See movie credits'})));
 const cinemas=await Cinema.insertMany([
  {name:'IMovies Central',location:'Indore',address:'Central Business District, Indore',screens:[{name:'Screen 1',rows:6,seatsPerRow:8},{name:'Screen 2',rows:6,seatsPerRow:8}]},
  {name:'IMovies Riverside',location:'Bhopal',address:'Lake View Road, Bhopal',screens:[{name:'Screen A',rows:6,seatsPerRow:8},{name:'Screen B',rows:6,seatsPerRow:8}]}
 ]);
 const shows=[];
 for(let i=0;i<createdMovies.length;i++){
  const cinema=cinemas[i%cinemas.length], screen=cinema.screens[i%cinema.screens.length];
  for(const [j,time] of ['12:30','16:00','19:30'].entries()){
   const day=new Date(); day.setDate(day.getDate()+j); day.setHours(0,0,0,0);
   shows.push({movieId:createdMovies[i]._id,cinemaId:cinema._id,screenId:screen._id,showDate:day,startTime:time,ticketPrice:180+(j*50),rows:screen.rows,seatsPerRow:screen.seatsPerRow});
  }
 }
 await Show.insertMany(shows);
 console.log(`Seeded ${createdMovies.length} movies, ${cinemas.length} cinemas, ${shows.length} shows and two demo accounts.`);
} catch(e){ console.error(e); process.exitCode=1; } finally { await mongoose.disconnect(); }

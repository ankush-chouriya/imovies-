import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
const port=Number(process.env.PORT)||5000;
try {
  if(!process.env.JWT_SECRET || process.env.JWT_SECRET.length<24) throw new Error('Set JWT_SECRET to at least 24 characters in server/.env');
  await connectDB();
  app.listen(port,()=>console.log(`IMovies API listening on http://localhost:${port}`));
} catch(e) { console.error(`Startup failed: ${e.message}`); process.exit(1); }

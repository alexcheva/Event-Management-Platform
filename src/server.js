import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true, // if you ever send cookies or auth headers
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

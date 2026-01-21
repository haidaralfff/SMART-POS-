
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import settingsRouter from './routes/settings.js';
app.use('/api/settings', settingsRouter);
import laporanRouter from './routes/laporan.js';
app.use('/api/laporan', laporanRouter);
import transaksiRouter from './routes/transaksi.js';
app.use('/api/transaksi', transaksiRouter);
import produkRouter from './routes/produk.js';
app.use('/api/produk', produkRouter);

// --- Placeholder routes ---
app.get('/', (req, res) => {
  res.json({ message: 'POS Backend API Ready' });
});


import authRouter from './routes/auth.js';
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// GET /api/transaksi
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('transaksi').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST /api/transaksi
router.post('/', async (req, res) => {
  const { items, total, bayar, kembali, kasir } = req.body;
  const { data, error } = await supabase.from('transaksi').insert([{ items, total, bayar, kembali, kasir }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

export default router;

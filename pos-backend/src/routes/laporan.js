import express from 'express';
import { supabase } from '../supabaseClient.js';
import { verifyOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/laporan/stock (hanya owner)
router.get('/stock', verifyOwner, async (req, res) => {
  const { data, error } = await supabase.from('produk').select('id, kode, nama, kategori, stok');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET /api/laporan/transaksi (hanya owner)
router.get('/transaksi', verifyOwner, async (req, res) => {
  const { data, error } = await supabase.from('transaksi').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;

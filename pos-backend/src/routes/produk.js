import express from 'express';
import { supabase } from '../supabaseClient.js';
import { verifyOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/produk
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('produk').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST /api/produk (hanya owner)
router.post('/', verifyOwner, async (req, res) => {
  const { kode, nama, harga, stok } = req.body;
  const { data, error } = await supabase.from('produk').insert([{ kode, nama, harga, stok }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// PUT /api/produk/:id (hanya owner)
router.put('/:id', verifyOwner, async (req, res) => {
  const { id } = req.params;
  const { kode, nama, harga, stok } = req.body;
  const { data, error } = await supabase.from('produk').update({ kode, nama, harga, stok }).eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE /api/produk/:id (hanya owner)
router.delete('/:id', verifyOwner, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('produk').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Produk deleted' });
});

export default router;

import express from 'express';
import { supabase } from '../supabaseClient.js';
import { verifyOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/settings/stock
router.get('/stock', async (req, res) => {
  const { data, error } = await supabase.from('settings').select('minimal_stock, alarm_stok_habis');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data?.[0] || {});
});

// PUT /api/settings/stock (hanya owner)
router.put('/stock', verifyOwner, async (req, res) => {
  const { minimal_stock, alarm_stok_habis } = req.body;
  const { data, error } = await supabase.from('settings').update({ minimal_stock, alarm_stok_habis }).eq('id', 1);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data?.[0] || {});
});

export default router;

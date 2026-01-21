import express from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('=== LOGIN REQUEST ===');
  console.log('Email:', email);
  console.log('Password:', password);
  
  try {
    if (!email || !password) {
      console.log('❌ Email atau password kosong');
      return res.status(400).json({ error: 'Email dan password harus diisi' });
    }

    // Query user dari tabel users di Supabase
    console.log('🔍 Searching user in database...');
    const { data: users, error: queryError } = await supabase
      .from('users')
      .select('id, email, password, role')
      .eq('email', email)
      .single();
    
    console.log('Query error:', queryError);
    console.log('User found:', !!users);
    
    if (queryError || !users) {
      console.log('❌ User not found');
      return res.status(401).json({ error: 'Email atau password salah' });
    }
    
    console.log('✅ User found:', users.email);
    
    // Validasi password dengan bcrypt
    console.log('🔐 Validating password...');
    const isPasswordValid = await bcrypt.compare(password, users.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Password invalid');
      return res.status(401).json({ error: 'Email atau password salah' });
    }
    
    console.log('✅ Login successful!');
    res.json({
      message: 'Login berhasil',
      token: 'token-' + users.id,
      user: { id: users.id, email: users.email, role: users.role }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  res.json({ message: 'Logout berhasil' });
});

export default router;

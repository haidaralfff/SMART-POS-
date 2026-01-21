// Simple token verification middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }
  
  try {
    // Simple validation: token berbentuk "token-{userid}"
    if (!token.startsWith('token-')) {
      return res.status(401).json({ error: 'Token tidak valid' });
    }
    
    req.user = { id: token.replace('token-', '') };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token tidak valid' });
  }
};

export const verifyOwner = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ error: 'Hanya owner yang dapat mengakses endpoint ini' });
    }
    next();
  });
};

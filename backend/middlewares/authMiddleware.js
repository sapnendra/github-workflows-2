import jwt from 'jsonwebtoken';

const tokenBlacklist = new Set();

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

export const authenticateAdmin = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
      });
    }

    if (tokenBlacklist.has(token)) {
      return res.status(401).json({
        success: false,
        message: 'Session has expired. Please login again.',
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('JWT_SECRET is missing from environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
    }

    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    req.token = token;
    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export const blacklistToken = (token) => {
  if (token) {
    tokenBlacklist.add(token);
  }
};

export const extractToken = getTokenFromHeader;

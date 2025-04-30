import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Unauthorized');
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded token ",decoded)
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

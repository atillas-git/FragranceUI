import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

interface JwtPayload {
  userId: number;
  role: string;
  exp: number;
}

export const getToken = (req: any): string | null => {
  return getCookie('jwt', { req }) as string | null;
};

export const validateToken = (token: string | null): JwtPayload | null => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
};

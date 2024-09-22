import httpAgent from '@/lib/axios';
import { AuthRequestDto, AuthResponseDto, RegisterRequestDto } from '@/types/Dtos/Auth';
import { setCookie } from 'cookies-next';

export const loginUser = async (credentials: AuthRequestDto): Promise<boolean> => {
  try {
    const response = await httpAgent.post<AuthResponseDto>('/api/auth/login', credentials);

    const { Token } = response.data;

    setCookie('jwt', Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const registerUser = async (credentials:RegisterRequestDto):Promise<boolean>=>{
    try {
        await httpAgent.post("/api/auth/register", credentials)
        return true;
    } catch (error) {
        return false;
    }
}

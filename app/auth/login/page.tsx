'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGoogle } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { AuthRequestDto, AuthResponseDto } from '@/types/Dtos/Auth';
import httpAgent from '@/lib/httpAgent';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isLaoding,setIsLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;
        if (!email) {
        newErrors.email = 'Email is required';
        isValid = false;
        }
        if (!password) {
        newErrors.password = 'Password is required';
        isValid = false;
        } else if (password.length < 8) {
        newErrors.password = 'Password must be longer than 8 characters.';
        isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const authRequest : AuthRequestDto = {
                Email:email,
                Password:password,
            }
            try {
                setIsLoading(true)
                const res = await httpAgent.post("/api/auth/login", authRequest)

                const authReponse : AuthResponseDto = res.data

                setCookie("jwt",authReponse.Token)
                router.push("/")
                toast.success("Login successful!")
            } catch (error) {
                toast.error("An error occurred during login!")
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50">
      {/* Left section with background */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-screen bg-gradient-to-br from-zinc-500 via-zinc-700 to-zinc-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">World's Most Advanced Fragrance Encyclopedia</h1>
        <p className="text-lg">Access any kind of fragrance, rate them and check other peoples comments!</p>
        <div className="mt-10">
          <img
            src="/path-to-your-image" // Use your uploaded image path here
            alt="Brand Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Right section with login form */}
      <div className="w-full lg:w-1/2 max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block text-zinc-600 mb-1">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className={cn("w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500",errors.email ? "border-red-500":"border-zinc-300")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="block text-zinc-600 mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={cn("w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500",errors.password ? "border-red-500":"border-zinc-300")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <div className="text-right mt-1">
              <a href="#" className="text-zinc-600 hover:text-zinc-800 text-sm underline">
                Reset Password
              </a>
            </div>
          </div>

          {/* Remember me & Login Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="h-4 w-4 text-zinc-600" />
              <Label htmlFor="remember" className="ml-2 text-zinc-600">
                Remember Password
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            isLaoding = {isLaoding}
            className="w-full mt-4 bg-zinc-700 hover:bg-zinc-800 text-white py-2 rounded-md transition duration-200"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-zinc-300" />
          <span className="mx-2 text-zinc-500">or</span>
          <hr className="flex-grow border-zinc-300" />
        </div>

        {/* Google Login Button */}
        <Button
          type="button"
          className="w-full flex items-center justify-center bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-600 py-2 rounded-md transition duration-200"
        >
          <FaGoogle className="mr-2" />
          Authorize with Google
        </Button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-zinc-600 text-sm">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-zinc-800 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

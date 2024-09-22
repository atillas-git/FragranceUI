'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGoogle } from 'react-icons/fa';
import { RegisterRequestDto } from '@/types/Dtos/Auth';
import httpAgent from '@/lib/httpAgent';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Errors {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

const RegisterPage = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });
  const [isLaoding,setIsLoading] = useState<boolean>(false);
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: Errors = { fullName: '', email: '', password: '', confirmPassword: '', terms: '' };
    let isValid = true;

    if (!fullName) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      const registerRequest : RegisterRequestDto = {
        Email:email,
        Password:password
      }
      try {
        setIsLoading(true);
        await httpAgent.post("/api/auth/register", registerRequest)
        toast.success("Registration successfull");
        router.push("/auth/login");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during registration")
      } finally{
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50">
      {/* Left section with branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-screen bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-800 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">World's Most Advanced Fragrance Encyclopedia</h1>
        <p className="text-lg">Access any kind of fragrance, rate them, and check other people's comments!</p>
        <div className="mt-10">
          <img
            src="/path-to-your-image"
            alt="Brand Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Right section with register form */}
      <div className="w-full lg:w-1/2 max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-zinc-800 mb-6 text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div>
            <Label htmlFor="name" className="block text-zinc-600 mb-1">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                errors.fullName ? 'border-red-500' : 'border-zinc-300'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                errors.email ? 'border-red-500' : 'border-zinc-300'
              }`}
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                errors.password ? 'border-red-500' : 'border-zinc-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <Label htmlFor="confirm-password" className="block text-zinc-600 mb-1">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-zinc-300'
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <Checkbox
              id="terms"
              onCheckedChange={(checked: boolean) => setTermsAccepted(checked)}
              className={`h-4 w-4 text-zinc-600 ${errors.terms ? 'border-red-500' : ''}`}
            />
            <Label htmlFor="terms" className="ml-2 text-zinc-600">
              I agree to the <a href="#" className="text-zinc-800 hover:underline">terms and conditions</a>
            </Label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}

          <Button
            type="submit"
            isLaoding = {isLaoding}
            className="w-full mt-4 bg-zinc-700 hover:bg-zinc-800 text-white py-2 rounded-md transition duration-200"
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-zinc-300" />
          <span className="mx-2 text-zinc-500">or</span>
          <hr className="flex-grow border-zinc-300" />
        </div>

        {/* Google Sign Up Button */}
        <Button
          type="button"
          className="w-full flex items-center justify-center bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-600 py-2 rounded-md transition duration-200"
        >
          <FaGoogle className="mr-2" />
          Sign up with Google
        </Button>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-zinc-600 text-sm">
          Already have an account?{' '}
          <a href="/auth/login" className="text-zinc-800 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;


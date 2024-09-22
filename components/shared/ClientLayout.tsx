"use client"; // Mark this component as client-side

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === '/auth/login' || pathname === '/auth/register' || pathname.includes('/admin');

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
    </>
  );
}
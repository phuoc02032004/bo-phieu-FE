import { Suspense, ReactNode } from 'react'; 
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
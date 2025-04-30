'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken && pathname !== '/login') {
      router.push('/login');
    }

    if (accessToken && pathname === '/login') {
      router.push('/dashboard');
    }
  }, [pathname, router]);

  return <>{children}</>;
}

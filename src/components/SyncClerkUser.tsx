// components/SyncClerkUser.tsx
'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { syncUser } from '@/utils/syncUser';
import { useRouter } from 'next/navigation';

export const SyncClerkUser = () => {
  const { user, isSignedIn } = useUser();
const router = useRouter();
  useEffect(() => {
    if (!isSignedIn || !user) {
    console.log('User not signed in or does not exist')
    router.push('/')
      return
    };
    syncUser(user);
  }, [user, isSignedIn,]);

  return null;
};

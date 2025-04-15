// components/SyncClerkUser.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { syncUser } from '@/utils/syncUser';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FullBlkPopup } from './FullBlkPopup';

export const SyncClerkUser = () => {
  const { user, isSignedIn, } = useUser();
  const router = useRouter();
  const [showPopup, setshowPopup] = useState(false);
  useEffect(() => {
    if (!isSignedIn || !user) {
      console.log('User not signed in or does not exist')
      router.push('/')
      setshowPopup(false)
      return
    };
    const fetchAndSyncUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${user.id}`);
        const userData = res.data.user;

        if (userData) {
            router.push('/existingDataPage')
            setshowPopup(true)
        
        
          
          
          localStorage.setItem('username', userData.preferredName || '');
          localStorage.setItem('Location_Name', userData.formattedAddress || '');
          localStorage.setItem('latitude', userData.latitude?.toString() || '');
          localStorage.setItem('longitude', userData.longitude?.toString() || '');
          syncUser(user);
        }
      } catch (error) {
        console.error('❌ Error fetching user data:', error);
      }
    };

    
    fetchAndSyncUserData();
  }, [user, isSignedIn]);



  

  return (
    <>

   {showPopup && <FullBlkPopup title='YOUR ACCOUNT CONTAINS DATA, EITHER:' actionButtonText='VIEW' cancelButtonText='UPDATE'
    onAction={() => router.push('/analysis/directory')}
    onCancel={() => {
      router.push('/')
    }}
    onComplete={() => {
      setshowPopup(false) 
    }
    }
    
    checklistItems={[
      {title: 'Update your data', description: ``},
      {title: 'OR', description: ` `},
      {title: 'View your data', description: ``},
    ]}
    ></FullBlkPopup>}
   
    </>
  );
};

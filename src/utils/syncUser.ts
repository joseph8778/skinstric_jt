// utils/syncUser.ts
import axios from 'axios';
import { UserResource } from '@clerk/types';

export const syncUser = async (user: UserResource | null) => {
  console.log('syncing user')
  if (!user) return
  
  try {
    const preferredName = localStorage.getItem('username') ?? null;
    const formattedAddress = localStorage.getItem('Location_Name') ?? null;
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    const demoData = localStorage.getItem('DemoData') ?? null
    // https://skinstric-backend.onrender.com/api/user
    // http://localhost:5000/api/user
    const res = await axios.post('https://skinstric-backend.onrender.com/api/user', {
      clerkUserId: user.id,
      email: user.primaryEmailAddress?.emailAddress || '',
      preferredName: preferredName,
      formattedAddress: formattedAddress,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      demoData: demoData
    });

    console.log('✅ Synced user to backend:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Failed to sync user:', err);
    throw err;
  }
};

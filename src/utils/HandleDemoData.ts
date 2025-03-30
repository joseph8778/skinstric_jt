// utils/photoData.ts
import axios from 'axios';
// import { useRouter } from 'next/navigation';

interface DemoDataConfig {
  preProcess?: () => void; // Optional callback before processing the file
  postProcess?: (data: any) => void; // Optional callback after receiving the response
  onError?: (error: unknown) => void; // Optional error handler callback
  setLoader?: (loading: boolean) => void; // Loader state setter
}



export async function HandleDemoData(
  selectedPhoto: File | null,
  config: DemoDataConfig
) {

  if (!selectedPhoto) return;
  
  // Execute pre-processing if provided (e.g., reversing animations, setting loaders)
  if (config.preProcess) {
    config.preProcess();
  }
  
  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result?.toString().split(',')[1];
    // console.log('Base64 Image:', base64Image);
    if (base64Image) {
      try {
        // Optionally set loader to true before starting the API call
        if (config.setLoader) config.setLoader(true);
        
        const response = await axios.post(
          'https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo',
          { image: base64Image },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        // Save data locally or perform common logic
        console.log('setting localStorage to:', response.data.data);
        localStorage.setItem('DemoData', JSON.stringify(response.data.data));
        
        // Execute post-processing if provided
        if (config.postProcess) {
          config.postProcess(response.data.data);
        }
        

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error);
        } else {
          console.error('Unexpected error:', error);
        }
        // Execute error handling if provided
        if (config.onError) {
          config.onError(error);
        }
      }
    }
  };

  reader.readAsDataURL(selectedPhoto);
}
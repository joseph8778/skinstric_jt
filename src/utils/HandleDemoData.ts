import axios from 'axios';

interface DemoDataConfig {
  preProcess?: () => void; 
  postProcess?: (data: string) => void; 
  onError?: (error: unknown) => void; 
  setLoader?: (loading: boolean) => void; 
}



export async function HandleDemoData(
  selectedPhoto: File | null,
  config: DemoDataConfig
) {

  if (!selectedPhoto) return;
  
  if (config.preProcess) {
    config.preProcess();
  }
  
  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result?.toString().split(',')[1];
    if (base64Image) {
      try {
        if (config.setLoader) config.setLoader(true);
        
        const response = await axios.post(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
          { image: base64Image },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        // console.log('setting localStorage to:', response.data.data);
        localStorage.setItem('DemoData', JSON.stringify(response.data.data));
        
        if (config.postProcess) {
          config.postProcess(response.data.data);
        }
        

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error);
        } else {
          console.error('Unexpected error:', error);
        }
        if (config.onError) {
          config.onError(error);
        }
      }
    }
  };

  reader.readAsDataURL(selectedPhoto);
}
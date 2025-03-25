"use client";
import { useEffect, useRef, useState } from "react";

const CameraAccess = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Camera access denied or not available.");
        console.error(err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <video ref={videoRef} autoPlay playsInline  className="absolute top-0 left-0 w-full h-full object-cover" />
      )}
    </div>
  );
};

export default CameraAccess;

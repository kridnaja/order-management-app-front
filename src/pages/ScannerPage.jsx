import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from "../hooks/use-auth";
import { BrowserMultiFormatReader } from '@zxing/library';

function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [showScanResult, setShowScanResult] = useState(false);

  const [devices, setDevices] = useState([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(1);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const successSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  const {
    logout
  } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const initCamera = async () => {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        setDevices(videoInputDevices);
      } catch (error) {
        console.error('Error listing video input devices:', error);
      }
    };

    initCamera();
  }, []);

  useEffect(() => {
    if (scanning) {
      startScanning();
    } else if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
  }, [scanning, currentDeviceIndex]);

  const startScanning =  async() => {
    await navigator.mediaDevices.getUserMedia({ video: true });
    const codeReader = codeReaderRef.current;
    const selectedDeviceId = devices[currentDeviceIndex]?.deviceId;

    if (selectedDeviceId) {
      codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result) => {
        if (result) {
          handleScan(result.text);
          codeReader.reset();
        }
      }).catch(console.error);
    }
  };

  const handleScan = (data) => {
    const modifiedData = modifyScanResult(data);
    setScanResult(modifiedData);
    processScannedData(modifiedData);
  };


  const modifyScanResult = (data) => data.slice(0, -3);
  // const modifyScanResult = (data) => data;

  const processScannedData = async (data) => {
    try {
      const response = await fetch(data);
      const statusCode = response.status;
      setStatus(statusCode);
      setShowScanResult(true);

      if (statusCode === 201) {
        successSoundRef.current.play();
      } else if (statusCode === 400) {
        errorSoundRef.current.play();
      } else if (statusCode !== 201 && statusCode !== 400 ){
        errorSoundRef.current.play();
      }

      setTimeout(() => {
        setShowScanResult(false);
        resetScanning();
      }, 5000);

      const newWindow = window.open(scanResult, '_blank');
      if (newWindow) {
        setTimeout(() => {
          newWindow.close();
          window.focus();
        }, 1000);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus(null);

      setShowScanResult(true);
      setTimeout(() => {
        setShowScanResult(false);
        resetScanning();
      }, 5000);
    }
  };

  const resetScanning = () => {
    setScanning(false);
    setTimeout(() => setScanning(true), 0);
  };

  // camera handle
  const handleSwitchCamera = () => {
    setCurrentDeviceIndex((prevIndex) => (prevIndex + 1) % devices.length);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <button 
        className="flex h-[2rem] w-[6rem] p-[0.5rem] ml-[0.75rem] text-[1.1rem] justify-center items-center font-semibold hover:text-[#C8262D] top-0 right-0 absolute"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="text-center w-[80vw] h-[80vh] flex justify-center items-center relative">
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="w-[8rem] h-[6rem] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Scanning
          </button>
        ) : (
          <div className="relative">
            <video ref={videoRef} className="w-full h-auto max-h-screen border border-gray-300 rounded"></video>

              {/* <button
                onClick={handleSwitchCamera}
                className="bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
              >
                Switch Camera
              </button> */}

          </div>
        )}

        {showScanResult && (
          <>
            {status === 201 && (
              <div className="bg-green-500 w-full h-full text-white flex justify-center items-center absolute">
                Your order has been successfully added to the queue.
              </div>
            )}
            {status === 400 && (
              <div className="bg-red-500 w-full h-full text-white flex justify-center items-center absolute">
                Your order is already in the queue.
              </div>
            )}
            {status !== 201 && status !== 400 && (
              <div className="bg-yellow-500 w-full h-full text-white flex justify-center items-center absolute">
                Your order is already in the queue.
              </div>
            )}
          </>
        )}

        <audio ref={successSoundRef} src="/sounds/success.mp3"></audio>
        <audio ref={errorSoundRef} src="/sounds/error.mp3"></audio>
      </div>
    </div>
  );
}

export default ScannerPage;

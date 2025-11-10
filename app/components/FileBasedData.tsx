'use client';
import { useState, useRef } from 'react';
import { UserData, FileData } from '../../types';

export default function FileBasedData() {
  const [staticData, setStaticData] = useState<UserData | null>(null);
  const [dynamicData, setDynamicData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const buildTimeDataRef = useRef<UserData | null>(null);

  const loadStaticData = async(): Promise<void> => {

    if (buildTimeDataRef.current !== null) {
      console.log('Using cached build time data');
      setStaticData(buildTimeDataRef.current);
      return;
    }
    console.log('Data is null');
    try {
        const response = await fetch('http://0.0.0.0:8000/read-file/');
        
        const result: FileData = await response.json();
        const newBuildTimeData: UserData = {
            name: 'File User',
            email: 'no email',
            bio: JSON.stringify(result),
            timestamp: new Date().toISOString(),
            source: 'File-based - Runtime'
        }
        buildTimeDataRef.current = newBuildTimeData;
        setStaticData(newBuildTimeData);
    } catch (error) {
        console.error('Error:', error);
    }
    
  };

  const loadDynamicData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('http://0.0.0.0:8000/read-file/',{
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },    
      // This prevents Next.js from caching the response
        cache: 'no-store'
        });
      
      const result: FileData = await response.json();
      const userData: UserData = {
        name: 'File User',
        email: 'no email',
        bio: JSON.stringify(result),
        timestamp: new Date().toISOString(),
        source: 'File-based - Runtime'
      };
      setDynamicData(userData);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>File-based Data</h2>
      <p><strong>Default Behavior:</strong> Frozen at build time</p>
      <p><strong>How to Fix Stale Data:</strong> Read dynamically</p>
      
      <div className="buttons">
        <button onClick={loadStaticData}>
          Load Static Data (Build Time)
        </button>
        <button onClick={loadDynamicData} disabled={loading}>
          Load Dynamic Data (Runtime)
        </button>
      </div>

      {staticData && (
        <div className="data-display">
          <h3>Static File Data:</h3>
          <p><strong>Name:</strong> {staticData.name}</p>
          <p><strong>Email:</strong> {staticData.email}</p>
          <p><strong>Bio:</strong> {staticData.bio}</p>
          <p><strong>Timestamp:</strong> {staticData.timestamp}</p>
        </div>
      )}

      {dynamicData && (
        <div className="data-display" style={{marginTop: '20px', borderColor: '#0070f3'}}>
          <h3>Dynamic File Data:</h3>
          <p><strong>Name:</strong> {dynamicData.name}</p>
          <p><strong>Email:</strong> {dynamicData.email}</p>
          <p><strong>Bio:</strong> {dynamicData.bio}</p>
          <p><strong>Last Updated:</strong> {dynamicData.timestamp}</p>
        </div>
      )}
    </div>
  );
}
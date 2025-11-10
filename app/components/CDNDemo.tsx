'use client';
import { useState } from 'react';
import { UserData } from '../../types';

export default function CDNDemo() {
  const [cdnData, setCdnData] = useState<UserData | null>(null);
  const [noCdnData, setNoCdnData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWithCDN = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      const result: UserData = await response.json();
      setCdnData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchWithoutCDN = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'CDN-Cache-Control': 'no-cache'
        }
      });
      const result: UserData = await response.json();
      setNoCdnData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>CDN Edge Cache</h2>
      <p><strong>Default Behavior:</strong> Cached at edge</p>
      <p><strong>How to Fix Stale Data:</strong> Disable via headers</p>
      
      <div className="buttons">
        <button onClick={fetchWithCDN} disabled={loading}>
          Fetch (CDN Cached)
        </button>
        <button onClick={fetchWithoutCDN} disabled={loading}>
          Fetch (Bypass CDN)
        </button>
      </div>

      {cdnData && (
        <div className="data-display">
          <h3>CDN Cached Data:</h3>
          <p><strong>Name:</strong> {cdnData.name}</p>
          <p><strong>Email:</strong> {cdnData.email}</p>
          <p><strong>Bio:</strong> {cdnData.bio}</p>
          <p><strong>Last Updated:</strong> {cdnData.timestamp}</p>
        </div>
      )}

      {noCdnData && (
        <div className="data-display" style={{marginTop: '20px', borderColor: '#0070f3'}}>
          <h3>Bypassed CDN Data:</h3>
          <p><strong>Name:</strong> {noCdnData.name}</p>
          <p><strong>Email:</strong> {noCdnData.email}</p>
          <p><strong>Bio:</strong> {noCdnData.bio}</p>
          <p><strong>Last Updated:</strong> {noCdnData.timestamp}</p>
        </div>
      )}
    </div>
  );
}
'use client';
import { useState } from 'react';
import { UserData } from '../../types';

export default function APIRoutesDemo() {
  const [cachedData, setCachedData] = useState<UserData | null>(null);
  const [noCacheData, setNoCacheData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCached = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      const result: UserData = await response.json();
      setCachedData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchNoCache = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/no-cache');
      const result: UserData = await response.json();
      setNoCacheData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>API Routes</h2>
      <p><strong>Default Behavior:</strong> May cache</p>
      <p><strong>How to Fix Stale Data:</strong> Add Cache-Control: no-store header</p>
      
      <div className="buttons">
        <button onClick={fetchCached} disabled={loading}>
          Fetch (May Cache)
        </button>
        <button onClick={fetchNoCache} disabled={loading}>
          Fetch (No Cache Header)
        </button>
      </div>

      {cachedData && (
        <div className="data-display">
          <h3>Cached API Data:</h3>
          <p><strong>Name:</strong> {cachedData.name}</p>
          <p><strong>Email:</strong> {cachedData.email}</p>
          <p><strong>Bio:</strong> {cachedData.bio}</p>
          <p><strong>Last Updated:</strong> {cachedData.timestamp}</p>
        </div>
      )}

      {noCacheData && (
        <div className="data-display" style={{marginTop: '20px', borderColor: '#0070f3'}}>
          <h3>No-Cache API Data:</h3>
          <p><strong>Name:</strong> {noCacheData.name}</p>
          <p><strong>Email:</strong> {noCacheData.email}</p>
          <p><strong>Bio:</strong> {noCacheData.bio}</p>
          <p><strong>Last Updated:</strong> {noCacheData.timestamp}</p>
        </div>
      )}
    </div>
  );
}
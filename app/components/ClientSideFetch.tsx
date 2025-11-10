'use client';
import { useState } from 'react';
import { UserData } from '../../types';

export default function ClientSideFetch() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCached = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      const result: UserData = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching:', error);
    }
    setLoading(false);
  };

  const fetchNoCache = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const result: UserData = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Client-side fetch</h2>
      <p><strong>Default Behavior:</strong> Browser cache</p>
      <p><strong>How to Fix Stale Data:</strong> Add cache: 'no-store'</p>
      
      <div className="buttons">
        <button onClick={fetchCached} disabled={loading}>
          Fetch (Browser Cache)
        </button>
        <button onClick={fetchNoCache} disabled={loading}>
          Fetch (No Cache)
        </button>
      </div>

      {data && (
        <div className="data-display">
          <h3>User Data:</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Bio:</strong> {data.bio}</p>
          <p><strong>Last Updated:</strong> {data.timestamp}</p>
        </div>
      )}
    </div>
  );
}
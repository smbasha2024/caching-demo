'use client';
import { useState } from 'react';
import { UserData } from '../../types';

export default function FetchAppRouter() {
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
        cache: 'no-store'
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
      <h2>fetch() in App Router</h2>
      <p><strong>Default Behavior:</strong> Cached</p>
      <p><strong>How to Fix Stale Data:</strong> Use {'{ cache: \'no-store\' }'}</p>
      
      <div className="buttons">
        <button onClick={fetchCached} disabled={loading}>
          Fetch (Cached)
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

      <style jsx>{`
        .buttons {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }
        button {
          padding: 10px 20px;
          border: 1px solid #0070f3;
          background: white;
          color: #0070f3;
          cursor: pointer;
          border-radius: 4px;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background: #0070f3;
          color: white;
        }
        .data-display {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }
      `}</style>
    </div>
  );
}
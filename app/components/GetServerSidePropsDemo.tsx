'use client';
import { useState } from 'react';
import { UserData } from '../../types';

export default function GetServerSidePropsDemo() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      const result: UserData = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>getServerSideProps</h2>
      <p><strong>Default Behavior:</strong> Always fresh</p>
      <p><strong>How to Fix Stale Data:</strong> Check CDN cache</p>
      
      <div className="buttons">
        <button onClick={fetchData} disabled={loading}>
          Fetch Fresh Data
        </button>
      </div>

      {data && (
        <div className="data-display">
          <h3>Server-side Rendered Data:</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Bio:</strong> {data.bio}</p>
          <p><strong>Last Updated:</strong> {data.timestamp}</p>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from 'react';
import { UserData } from '../../types';

export default function GetStaticPropsDemo() {
  const [buildTimeData, setBuildTimeData] = useState<UserData | null>(null);
  const [revalidatedData, setRevalidatedData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setBuildTimeData({
      name: 'Static User',
      email: 'static@example.com',
      bio: 'This data was frozen at build time',
      timestamp: new Date().toISOString(),
      source: 'getStaticProps - Built at: ' + new Date().toISOString()
    });
  }, []);

  const revalidateData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/user?revalidate=true');
      const result: UserData = await response.json();
      setRevalidatedData(result);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>getStaticProps</h2>
      <p><strong>Default Behavior:</strong> Cached at build time</p>
      <p><strong>How to Fix Stale Data:</strong> Use revalidate</p>
      
      <div className="buttons">
        <button onClick={revalidateData} disabled={loading}>
          Simulate Revalidate
        </button>
      </div>

      {buildTimeData && (
        <div className="data-display">
          <h3>Build-time Data (Static):</h3>
          <p><strong>Name:</strong> {buildTimeData.name}</p>
          <p><strong>Email:</strong> {buildTimeData.email}</p>
          <p><strong>Bio:</strong> {buildTimeData.bio}</p>
          <p><strong>Built At:</strong> {buildTimeData.timestamp}</p>
        </div>
      )}

      {revalidatedData && (
        <div className="data-display" style={{marginTop: '20px', borderColor: '#0070f3'}}>
          <h3>Revalidated Data:</h3>
          <p><strong>Name:</strong> {revalidatedData.name}</p>
          <p><strong>Email:</strong> {revalidatedData.email}</p>
          <p><strong>Bio:</strong> {revalidatedData.bio}</p>
          <p><strong>Last Updated:</strong> {revalidatedData.timestamp}</p>
        </div>
      )}
    </div>
  );
}
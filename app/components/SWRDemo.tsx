'use client';
import useSWR, { KeyedMutator } from 'swr';
import { UserData } from '../../types';

const fetcher = (url: string): Promise<UserData> => 
  fetch(url).then(res => res.json());

export default function SWRDemo() {
  const { data, error, mutate, isValidating } = useSWR<UserData>(
    '/api/user', 
    fetcher, 
    {
      dedupingInterval: 2000,
    }
  );

  const refreshData = (): void => {
    mutate();
  };

  const updateUser = async (): Promise<void> => {
    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `Updated User ${Date.now()}`,
        email: `updated${Date.now()}@example.com`,
      }),
    });
    mutate();
  };

  return (
    <div>
      <h2>SWR/React Query</h2>
      <p><strong>Default Behavior:</strong> In-memory cache with deduping</p>
      <p><strong>How to Fix Stale Data:</strong> Use mutate() or disable deduping</p>
      
      <div className="buttons">
        <button onClick={refreshData} disabled={isValidating}>
          Force Revalidate (mutate)
        </button>
        <button onClick={updateUser} disabled={isValidating}>
          Update User & Revalidate
        </button>
      </div>

      {isValidating && <p>Refreshing data...</p>}
      
      {data && (
        <div className="data-display">
          <h3>User Data (SWR Cache):</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Bio:</strong> {data.bio}</p>
          <p><strong>Last Updated:</strong> {data.timestamp}</p>
        </div>
      )}

      {error && <p>Error loading data: {error.message}</p>}
    </div>
  );
}
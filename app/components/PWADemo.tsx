'use client';
import { useState } from 'react';
import { UserData } from '../../types';

export default function PWADemo() {
  const [data, setData] = useState<UserData | null>(null);
  const [message, setMessage] = useState<string>('');

  const simulateServiceWorkerCache = (): void => {
    const cachedData: UserData = {
      name: 'Cached User',
      email: 'cached@example.com',
      bio: 'This data is cached by Service Worker',
      timestamp: '2024-01-01T00:00:00.000Z',
      source: 'PWA Service Worker - Cached'
    };
    setData(cachedData);
    setMessage('Data loaded from Service Worker cache (simulated)');
  };

  const clearCache = (): void => {
    setData({
      name: 'Fresh User',
      email: 'fresh@example.com',
      bio: 'This is fresh data after clearing cache',
      timestamp: new Date().toISOString(),
      source: 'PWA Service Worker - Fresh'
    });
    setMessage('Cache cleared and fresh data loaded');
  };

  return (
    <div>
      <h2>PWA Service Worker</h2>
      <p><strong>Default Behavior:</strong> Cached offline</p>
      <p><strong>How to Fix Stale Data:</strong> Update/clear cache</p>
      
      <div className="buttons">
        <button onClick={simulateServiceWorkerCache}>
          Load from Service Worker Cache
        </button>
        <button onClick={clearCache}>
          Clear Cache & Load Fresh
        </button>
      </div>

      {message && (
        <div style={{ margin: '10px 0', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      {data && (
        <div className="data-display">
          <h3>Service Worker Data:</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Bio:</strong> {data.bio}</p>
          <p><strong>Last Updated:</strong> {data.timestamp}</p>
        </div>
      )}
    </div>
  );
}
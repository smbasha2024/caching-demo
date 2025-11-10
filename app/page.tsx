'use client';
import { useState } from 'react';
import FetchAppRouter from './components/FetchAppRouter';
import GetStaticPropsDemo from './components/GetStaticPropsDemo';
import GetServerSidePropsDemo from './components/GetServerSidePropsDemo';
import ClientSideFetch from './components/ClientSideFetch';
import SWRDemo from './components/SWRDemo';
import FileBasedData from './components/FileBasedData';
import APIRoutesDemo from './components/APIRoutesDemo';
import PWADemo from './components/PWADemo';
import CDNDemo from './components/CDNDemo';
import { TabConfig } from '../types';

const tabs: TabConfig[] = [
  { id: 'fetch-app', label: 'App Router' },
  { id: 'get-static', label: 'Static Props' },
  { id: 'get-server', label: 'Server Side Props' },
  { id: 'client-fetch', label: 'Client Side' },
  { id: 'swr', label: 'SWR / React Query' },
  { id: 'file-based', label: 'File Data' },
  { id: 'api-routes', label: 'API Routes' },
  { id: 'pwa', label: 'PWA Service Worker' },
  { id: 'cdn', label: 'CDN Edge Cache' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('fetch-app');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'fetch-app':
        return <FetchAppRouter />;
      case 'get-static':
        return <GetStaticPropsDemo />;
      case 'get-server':
        return <GetServerSidePropsDemo />;
      case 'client-fetch':
        return <ClientSideFetch />;
      case 'swr':
        return <SWRDemo />;
      case 'file-based':
        return <FileBasedData />;
      case 'api-routes':
        return <APIRoutesDemo />;
      case 'pwa':
        return <PWADemo />;
      case 'cdn':
        return <CDNDemo />;
      default:
        return <FetchAppRouter />;
    }
  };

  return (
    <div>
      <h1>Next.js Caching Scenarios Demo</h1>
      
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }
        .tab {
          padding: 10px 20px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          cursor: pointer;
          border-radius: 4px;
        }
        .tab.active {
          background: #0070f3;
          color: white;
          border-color: #0070f3;
        }
        .tab-content {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fafafa;
        }
      `}</style>
    </div>
  );
}
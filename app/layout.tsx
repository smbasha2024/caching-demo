import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Next.js Caching Demo',
  description: 'Demo of various caching scenarios in Next.js',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
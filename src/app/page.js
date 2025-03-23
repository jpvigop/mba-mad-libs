"use client";

import dynamic from 'next/dynamic';
import ClientOnly from '../components/ClientOnly';

// Use dynamic import with ssr disabled to force client-side only rendering
const BuzzwordGenerator = dynamic(
  () => import('../components/BuzzwordGenerator'),
  { ssr: false, loading: () => <p className="text-center p-8">Loading generator...</p> }
);

export default function Home() {
  return (
    <ClientOnly fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <main className="min-h-screen bg-white">
        <div className="container-max">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              MBA <span className="text-[#0066ff]">Mad Libs</span>
            </h1>
            <p className="text-lg text-[#999999]">
              Generate business-ready messaging in seconds
            </p>
          </header>

          <BuzzwordGenerator />

          <footer className="mt-12 text-center text-[#999999] text-sm">
            <p>
              <a 
                href="https://github.com/jpvigop/mba-mad-libs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0066ff] hover:underline"
              >
                GitHub Repository
              </a>
            </p>
          </footer>
        </div>
      </main>
    </ClientOnly>
  );
}
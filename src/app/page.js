"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Renamed to avoid conflict with dynamic import
export const dynamicConfig = 'force-dynamic';

// Use dynamic import with ssr disabled to force client-side only rendering
const BuzzwordGenerator = dynamic(
  () => import('../components/BuzzwordGenerator'),
  { ssr: false, loading: () => <p className="text-center p-8">Loading generator...</p> }
);

export default function Home() {
  // Workaround for hydration warnings in development
  useEffect(() => {
    // This suppresses the console error for hydration mismatches in development
    // Remove for production or when the actual issues are fixed
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Skip hydration warnings which are often caused by browser extensions
      if (typeof args[0] === 'string' && 
         (args[0].includes('Hydration failed because') || 
          args[0].includes('A tree hydrated but some attributes') ||
          args[0].includes('Hydration completed'))) {
        return;
      }
      originalConsoleError(...args);
    };
    
    // Clean up any DOM attributes that might cause hydration issues
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const cleanAttributes = (elem) => {
          if (elem.removeAttribute) {
            elem.removeAttribute('inject_newvt_svd');
          }
          if (elem.childNodes) {
            for (let i = 0; i < elem.childNodes.length; i++) {
              cleanAttributes(elem.childNodes[i]);
            }
          }
        };
        cleanAttributes(document.body);
      }
    }, 0);
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            MBA <span className="text-blue-600">Mad Libs</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Generate absurd business strategies, marketing plans, and mission statements
            with our buzzword-powered generator.
          </p>
        </header>

        <BuzzwordGenerator />

        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>
            Created for those who need to sound smarter in meetings. 
            Guaranteed to impress no one who matters.
          </p>
          <p className="mt-2">
            Disclaimer: Using these phrases in actual business contexts may lead to 
            eye-rolling, groaning, or getting assigned to write the next quarterly report.
          </p>
        </footer>
      </div>
    </main>
  );
} 
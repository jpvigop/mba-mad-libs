"use client";

import { useEffect, useState } from 'react';

// This wrapper component ensures the children are only rendered on the client
// Prevents hydration mismatches by not rendering anything during SSR
export default function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
}

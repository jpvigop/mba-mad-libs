'use client';

import { useEffect } from 'react';

// This component doesn't render anything visible, it just removes unwanted attributes
export default function AttributeCleaner() {
  useEffect(() => {
    // Function to remove the unwanted attribute
    const cleanAttributes = () => {
      if (document && document.body) {
        document.body.removeAttribute('inject_newvt_svd');
        
        // Also clean from any other elements that might have it
        const elements = document.querySelectorAll('[inject_newvt_svd]');
        elements.forEach(el => el.removeAttribute('inject_newvt_svd'));
      }
    };

    // Clean immediately
    cleanAttributes();
    
    // Also clean after a short delay to catch any late additions
    const timeoutId = setTimeout(cleanAttributes, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Return null since this component doesn't render anything
  return null;
} 
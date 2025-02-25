'use client';

import { useEffect } from 'react';
import AttributeCleaner from './AttributeCleaner';

export default function ClientHydrationFix() {
  useEffect(() => {
    // More aggressive approach to remove the problematic attribute
    const removeAttribute = () => {
      if (typeof document !== 'undefined' && document.body) {
        document.body.removeAttribute("inject_newvt_svd");
        
        // Also try to find and remove it from all elements
        document.querySelectorAll('[inject_newvt_svd]').forEach(el => {
          el.removeAttribute('inject_newvt_svd');
        });
      }
    };
    
    // Remove immediately
    removeAttribute();
    
    // And also after a short delay to ensure it's gone
    setTimeout(removeAttribute, 100);
    setTimeout(removeAttribute, 500);
    
    // Set up a MutationObserver to continuously monitor and remove the attribute
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && 
              mutation.attributeName === 'inject_newvt_svd') {
            mutation.target.removeAttribute('inject_newvt_svd');
          }
        }
        // Also do a full sweep periodically
        removeAttribute();
      });
      
      observer.observe(document.body, { 
        attributes: true, 
        childList: true, 
        subtree: true,
        attributeFilter: ['inject_newvt_svd']
      });
      
      return () => observer.disconnect();
    }
  }, []);

  // Use the existing AttributeCleaner as well for redundancy
  return <AttributeCleaner />;
} 
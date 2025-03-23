'use client';

import { useEffect } from 'react';

// This component doesn't render anything visible, it just removes unwanted attributes
export default function AttributeCleaner() {
  useEffect(() => {
    // List of problematic attributes to remove
    const attributesToRemove = [
      'inject_newvt_svd',
      'bis_register',
      '__processed_2862b16e-9dd0-43d7-8355-32c631e5ac13__'
    ];
    
    // Function to remove the unwanted attributes
    const cleanAttributes = () => {
      if (document && document.body) {
        // Remove attributes from body
        attributesToRemove.forEach(attr => {
          document.body.removeAttribute(attr);
        });
        
        // Find and clean elements with any of these attributes
        attributesToRemove.forEach(attr => {
          const selector = `[${attr}]`;
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.removeAttribute(attr));
          } catch (error) {
            // Some attribute selectors might throw errors in querySelector
            console.warn(`Error cleaning attribute: ${attr}`, error);
          }
        });
        
        // Additionally, do a more thorough cleaning for any element with attributes
        // that start with "__processed_" (handle dynamic UUIDs)
        try {
          const allElements = document.querySelectorAll('*');
          allElements.forEach(el => {
            if (el.getAttributeNames) {
              const attrs = el.getAttributeNames();
              attrs.forEach(attr => {
                if (attr.startsWith('__processed_') || 
                    attr.startsWith('bis_') ||
                    attr.includes('register')) {
                  el.removeAttribute(attr);
                }
              });
            }
          });
        } catch (e) {
          // Ignore errors in the full sweep
        }
      }
    };

    // Clean immediately
    cleanAttributes();
    
    // Also clean after delays to catch any late additions
    const timeoutIds = [
      setTimeout(cleanAttributes, 0),
      setTimeout(cleanAttributes, 100),
      setTimeout(cleanAttributes, 500),
      setTimeout(cleanAttributes, 1000)
    ];
    
    // Set up mutation observer to continuously monitor and clean
    let observer;
    try {
      observer = new MutationObserver((mutations) => {
        let needsCleaning = false;
        
        // Check if any relevant attributes were added
        mutations.forEach(mutation => {
          if (mutation.type === 'attributes') {
            const attrName = mutation.attributeName;
            if (attributesToRemove.includes(attrName) || 
                attrName.startsWith('__processed_') ||
                attrName.startsWith('bis_')) {
              needsCleaning = true;
            }
          } else if (mutation.type === 'childList' && mutation.addedNodes.length) {
            needsCleaning = true;
          }
        });
        
        if (needsCleaning) {
          cleanAttributes();
        }
      });
      
      // Start observing once the document body is available
      if (document.body) {
        observer.observe(document.body, { 
          attributes: true, 
          childList: true, 
          subtree: true
        });
      }
    } catch (e) {
      console.warn('Error setting up MutationObserver:', e);
    }
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
      if (observer) observer.disconnect();
    };
  }, []);

  // Return null since this component doesn't render anything
  return null;
}
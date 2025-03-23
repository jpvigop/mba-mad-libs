import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MBA Mad Libs - Business Jargon Generator",
  description: "Generate absurd business strategies, marketing plans, and mission statements with our buzzword-powered generator."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="hydration-suppress" strategy="beforeInteractive">
          {`
            // Suppress console errors for hydration issues
            (function() {
              var originalConsoleError = console.error;
              console.error = function() {
                // Check if the error is related to hydration
                if (arguments[0] && typeof arguments[0] === 'string' &&
                    (arguments[0].includes('Hydration') || 
                     arguments[0].includes('hydration') ||
                     arguments[0].includes('Content does not match') ||
                     arguments[0].includes('bis_register') ||
                     arguments[0].includes('Missing expected properties'))) {
                  // Suppress the error
                  return;
                }
                
                // Pass through other errors to the original console.error
                return originalConsoleError.apply(console, arguments);
              };
            })();
            
            // Aggressive attribute cleaner
            (function() {
              function cleanAttributes() {
                if (!document || !document.body) return;
                
                // Remove known problematic attributes
                var attributesToRemove = [
                  'inject_newvt_svd',
                  'bis_register',
                  '__processed_',
                  'data-reactroot'
                ];
                
                // Clean document body
                attributesToRemove.forEach(function(attr) {
                  document.body.removeAttribute(attr);
                });
                
                // Clean all elements
                try {
                  var allElements = document.querySelectorAll('*');
                  for (var i = 0; i < allElements.length; i++) {
                    var el = allElements[i];
                    if (el.getAttributeNames) {
                      var attrs = el.getAttributeNames();
                      for (var j = 0; j < attrs.length; j++) {
                        var attrName = attrs[j];
                        // Check if attribute matches any in our list
                        for (var k = 0; k < attributesToRemove.length; k++) {
                          if (attrName.indexOf(attributesToRemove[k]) !== -1) {
                            el.removeAttribute(attrName);
                            break;
                          }
                        }
                      }
                    }
                  }
                } catch (e) {
                  // Ignore errors during cleaning
                }
              }
              
              // Run immediately
              cleanAttributes();
              
              // Run when DOM is ready
              document.addEventListener('DOMContentLoaded', cleanAttributes);
              
              // Run after short delays
              setTimeout(cleanAttributes, 0);
              setTimeout(cleanAttributes, 100);
              setTimeout(cleanAttributes, 500);
              
              // Set up a MutationObserver
              if (typeof MutationObserver !== 'undefined') {
                var observer = new MutationObserver(function() {
                  cleanAttributes();
                });
                
                // Start observing once body is available
                var startObserver = function() {
                  if (document.body) {
                    observer.observe(document.body, { 
                      attributes: true, 
                      childList: true, 
                      subtree: true
                    });
                  } else {
                    setTimeout(startObserver, 100);
                  }
                };
                
                startObserver();
              }
            })();
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
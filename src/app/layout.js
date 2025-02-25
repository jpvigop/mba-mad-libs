import { Inter } from "next/font/google";
import "./globals.css";
import ClientHydrationFix from '../components/ClientHydrationFix';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MBA Mad Libs - Business Jargon Generator",
  description: "Generate absurd business strategies, marketing plans, and mission statements with our buzzword-powered generator."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="hydration-fix" strategy="beforeInteractive">
          {`
            (function() {
              function removeInjectAttr() {
                if (document.body) {
                  document.body.removeAttribute('inject_newvt_svd');
                  var elements = document.querySelectorAll('[inject_newvt_svd]');
                  for (var i = 0; i < elements.length; i++) {
                    elements[i].removeAttribute('inject_newvt_svd');
                  }
                }
              }
              
              // Run immediately
              removeInjectAttr();
              
              // Run when DOM is ready
              document.addEventListener('DOMContentLoaded', removeInjectAttr);
              
              // Run after a short delay
              setTimeout(removeInjectAttr, 0);
              setTimeout(removeInjectAttr, 100);
              
              // Set up a MutationObserver to continuously monitor
              if (typeof MutationObserver !== 'undefined') {
                var observer = new MutationObserver(function(mutations) {
                  for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];
                    if (mutation.type === 'attributes' && 
                        mutation.attributeName === 'inject_newvt_svd') {
                      mutation.target.removeAttribute('inject_newvt_svd');
                    }
                  }
                  // Also do a full sweep
                  removeInjectAttr();
                });
                
                // Start observing once body is available
                var startObserver = function() {
                  if (document.body) {
                    observer.observe(document.body, { 
                      attributes: true, 
                      childList: true, 
                      subtree: true,
                      attributeFilter: ['inject_newvt_svd']
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
      <body className={inter.className}>
        <ClientHydrationFix />
        {children}
      </body>
    </html>
  );
} 
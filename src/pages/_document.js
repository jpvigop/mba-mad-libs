import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Inline script to remove the attribute as early as possible
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
              
              // Also run when DOM is ready
              document.addEventListener('DOMContentLoaded', removeInjectAttr);
              
              // Suppress hydration warnings
              var originalConsoleError = console.error;
              console.error = function() {
                var args = Array.prototype.slice.call(arguments);
                if (typeof args[0] === 'string' && 
                   (args[0].includes('Hydration failed') || 
                    args[0].includes('hydration') ||
                    args[0].includes('Hydration'))) {
                  return;
                }
                return originalConsoleError.apply(console, args);
              };
            })();
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 
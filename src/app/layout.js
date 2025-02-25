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
              removeInjectAttr();
              document.addEventListener('DOMContentLoaded', removeInjectAttr);
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
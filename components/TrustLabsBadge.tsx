'use client';

import { useEffect, useRef, memo } from 'react';

interface TrustLabsBadgeProps {
  email: string;
  size?: 'sm' | 'md';
  theme?: 'auto' | 'light' | 'dark';
  className?: string;
}

declare module 'react' {
  interface IntrinsicElements {
    'trustlabs-badge': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        email: string;
        'data-size'?: string;
        'data-theme'?: string;
      },
      HTMLElement
    >;
  }
}

// Intercept fetch requests to log TrustLabs API calls
let originalFetch: typeof fetch;
let isNetworkLoggingSetup = false;

const setupNetworkLogging = () => {
  if (typeof window !== 'undefined' && !isNetworkLoggingSetup) {
    isNetworkLoggingSetup = true;
    originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const [input] = args;
      const url = typeof input === 'string' ? input : 
                  input instanceof URL ? input.toString() : 
                  (input as Request).url;
      
      // Check if this is a TrustLabs API call
      if (url.includes('trustlabs') || url.includes('trust-lab') || url.includes('verification')) {
        // Logging removed for production
      }
      
      try {
        const response = await originalFetch(...args);
        
        if (url.includes('trustlabs') || url.includes('trust-lab') || url.includes('verification')) {
          // Logging removed for production
        }
        
        return response;
      } catch (error) {
        if (url.includes('trustlabs') || url.includes('trust-lab') || url.includes('verification')) {
          console.error('❌ TrustLabs Backend Error:', {
            url,
            error: (error as Error).message,
            timestamp: new Date().toISOString()
          });
        }
        throw error;
      }
    };
  }
};

// Track which emails have already been processed to avoid duplicate API calls
const processedEmails = new Set<string>();

function TrustLabsBadge({ 
  email, 
  size = 'sm', 
  theme = 'auto',
  className = '' 
}: TrustLabsBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  // Set up network logging only once
  useEffect(() => {
    setupNetworkLogging();
  }, []);

  useEffect(() => {
    // Skip if already initialized for this email
    if (isInitialized.current || processedEmails.has(email)) {
      return;
    }

    // Logging removed for production
    
    // Wait for the script to load and define the custom element
    const checkForElement = () => {
      if (customElements.get('trustlabs-badge')) {
        // Logging removed for production
        
        // Mark as processed to avoid duplicate API calls
        processedEmails.add(email);
        isInitialized.current = true;
        
        // Set up mutation observer to watch for badge changes
        if (containerRef.current) {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'childList' || mutation.type === 'attributes') {
                // Logging removed for production
              }
            });
          });

          observer.observe(containerRef.current, {
            childList: true,
            subtree: true,
            attributes: true
          });

          // Clean up observer on unmount
          return () => observer.disconnect();
        }
      } else {
        // Logging removed for production
        // Check again in 100ms
        setTimeout(checkForElement, 100);
      }
    };

    checkForElement();
  }, [email]);

  // Monitor when the element gets rendered
  useEffect(() => {
    // Skip if already initialized
    if (isInitialized.current) {
      return;
    }

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const badgeElement = containerRef.current.querySelector('trustlabs-badge');
        if (badgeElement) {
          // Logging removed for production
          
          // Check if the element has loaded/changed after a delay
          const verifyTimer = setTimeout(() => {
            const currentBadge = containerRef.current?.querySelector('trustlabs-badge');
            if (currentBadge) {
              // Logging removed for production
            }
          }, 2000);

          return () => clearTimeout(verifyTimer);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [email]);

  return (
    <div 
      ref={containerRef}
      className={`inline-flex ${className}`}
      dangerouslySetInnerHTML={{
        __html: `<trustlabs-badge email="${email}" data-size="${size}" data-theme="${theme}"></trustlabs-badge>`
      }}
    />
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(TrustLabsBadge);

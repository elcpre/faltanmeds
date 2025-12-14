'use client';

import Script from 'next/script';
import { useConsent } from '@/context/ConsentContext';

export function GoogleAdSense() {
    // Note: Privacy check disabled for verification.
    // The script must be visible to Google Bot. 
    // Actual ad rendering is still controlled by AdSenseBlock.tsx
    // const { consent } = useConsent();
    // if (!consent.marketing) return null;

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1881793666340506"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
        />
    );
}

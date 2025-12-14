'use client';

import Script from 'next/script';
import { useConsent } from '@/context/ConsentContext';

export function GoogleAdSense() {
    // Note: Temporarily allowing script to load for Google Verification. 
    // Ideally, for strict GDPR, this should be blocked, but AdSense verification requires it present.
    // const { consent } = useConsent();

    // if (!consent.marketing) return null;

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1881793666340506"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}

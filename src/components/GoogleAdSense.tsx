'use client';

import Script from 'next/script';
import { useConsent } from '@/context/ConsentContext';

export function GoogleAdSense() {
    const { consent } = useConsent();

    if (!consent.marketing) return null;

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1881793666340506"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}

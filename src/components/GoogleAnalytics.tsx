'use client';

import Script from 'next/script';
import { useConsent } from '@/context/ConsentContext';

export function GoogleAnalytics() {
    const { consent } = useConsent();

    if (consent !== 'accepted') return null;

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-0Q60RVWB20"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0Q60RVWB20');
        `}
            </Script>
        </>
    );
}

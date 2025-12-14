import React, { useEffect } from 'react';

interface AdSenseBlockProps {
    slot?: string; // Optional for auto ads, but good if we have specific units later
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
}

export function AdSenseBlock({ slot, format = 'auto', className = '' }: AdSenseBlockProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`my-8 flex justify-center overflow-hidden ${className}`}>
            <ins className="adsbygoogle"
                style={{ display: 'block', minWidth: '300px', width: '100%' }}
                data-ad-client="ca-pub-1881793666340506"
                data-ad-slot={slot || "8956275821"} // Use a generic slot or just rely on auto
                data-ad-format={format}
                data-full-width-responsive="true" />
        </div>
    );
}

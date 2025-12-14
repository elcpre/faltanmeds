
import React from 'react';

interface AdSenseBlockProps {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
}

export function AdSenseBlock({ slot, format = 'auto' }: AdSenseBlockProps) {
    return (
        <div className="my-8 flex justify-center overflow-hidden">
            {/* 
        This is a placeholder. In production, you would add the Script tag in layout.tsx 
        and render the <ins> tag here.
      */}
            <div className="bg-gray-100 border border-gray-200 text-gray-400 p-8 rounded-lg w-full text-center text-sm">
                <span className="font-semibold block mb-1">Publicidad (Google AdSense)</span>
                <span className="text-xs">Slot ID: {slot}</span>
                {/*
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        */}
            </div>
        </div>
    );
}

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ConsentStatus = 'accepted' | 'rejected' | 'undecided';

interface ConsentContextType {
    consent: ConsentStatus;
    setConsent: (status: ConsentStatus) => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsentState] = useState<ConsentStatus>('undecided');

    useEffect(() => {
        const stored = localStorage.getItem('cookie_consent');
        if (stored === 'true') {
            setConsentState('accepted');
        } else if (stored === 'false') {
            setConsentState('rejected');
        }
    }, []);

    const setConsent = (status: ConsentStatus) => {
        setConsentState(status);
        if (status === 'accepted') {
            localStorage.setItem('cookie_consent', 'true');
        } else if (status === 'rejected') {
            localStorage.setItem('cookie_consent', 'false');
        }
    };

    return (
        <ConsentContext.Provider value={{ consent, setConsent }}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    const context = useContext(ConsentContext);
    if (context === undefined) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return context;
}

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ConsentState {
    necessary: boolean; // Always true
    analytics: boolean;
    marketing: boolean;
    undecided: boolean;
}

const defaultState: ConsentState = {
    necessary: true,
    analytics: false,
    marketing: false,
    undecided: true,
};

interface ConsentContextType {
    consent: ConsentState;
    setConsent: (newState: ConsentState) => void;
    acceptAll: () => void;
    rejectNonEssential: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsentState] = useState<ConsentState>(defaultState);

    useEffect(() => {
        const stored = localStorage.getItem('cookie_consent_v2');
        if (stored) {
            try {
                setConsentState(JSON.parse(stored));
            } catch (e) {
                // Fallback for migration or error
                setConsentState(defaultState);
            }
        } else {
            // Check for old v1 consent to migrate?
            const oldConsent = localStorage.getItem('cookie_consent');
            if (oldConsent === 'true') {
                acceptAll();
            } else if (oldConsent === 'false') {
                rejectNonEssential();
            }
        }
    }, []);

    const saveConsent = (newState: ConsentState) => {
        const stateToSave = { ...newState, undecided: false };
        setConsentState(stateToSave);
        localStorage.setItem('cookie_consent_v2', JSON.stringify(stateToSave));
        // Clear old key to avoid confusion
        localStorage.removeItem('cookie_consent');
    };

    const setConsent = (newState: ConsentState) => {
        saveConsent(newState);
    };

    const acceptAll = () => {
        saveConsent({
            necessary: true,
            analytics: true,
            marketing: true,
            undecided: false,
        });
    };

    const rejectNonEssential = () => {
        saveConsent({
            necessary: true,
            analytics: false,
            marketing: false,
            undecided: false,
        });
    };

    return (
        <ConsentContext.Provider value={{ consent, setConsent, acceptAll, rejectNonEssential }}>
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

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

type Language = 'fr' | 'en';
type Translations = typeof translations.fr;

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: keyof Translations) => string;
    tHtml: (key: keyof Translations) => { __html: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved === 'en' || saved === 'fr') ? saved : 'fr';
    });

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('language', newLang);
        document.documentElement.lang = newLang;
    };

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const t = (key: keyof Translations): string => {
        return translations[lang][key] || key;
    };

    const tHtml = (key: keyof Translations) => {
        return { __html: translations[lang][key] || key };
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, tHtml }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

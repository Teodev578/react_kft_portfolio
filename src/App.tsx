import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';

function AppContent() {
    const { t, tHtml } = useLanguage();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);

    // Preloader Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + Math.random() * 10;
            });
        }, 100);

        const handleLoad = () => {
            clearInterval(interval);
            setLoadingProgress(100);
            setTimeout(() => setIsLoaded(true), 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const sections = document.querySelectorAll('section');
        sections.forEach(s => observer.observe(s));

        return () => observer.disconnect();
    }, [isLoaded]);

    // Modal lock
    useEffect(() => {
        if (activeModal) {
            document.body.classList.add('dialog-open');
        } else {
            document.body.classList.remove('dialog-open');
        }
    }, [activeModal]);

    // Close modals on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveModal(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <>
            {/* PRELOADER */}
            {!isLoaded && (
                <div id="preloader">
                    <img src="/assets/logo-teo_compressed_final.png" alt="Logo" className="preloader-logo" />
                    <div className="progress-container">
                        <div id="progress-bar" style={{ width: `${loadingProgress}%` }}></div>
                    </div>
                    <div id="progress-counter">{Math.round(loadingProgress)}%</div>
                </div>
            )}

            <Header />

            <main>
                <Hero />
                <Services />
                <About />
                <Projects onOpenProject={(id) => setActiveModal(id)} />
                <Contact />
            </main>

            {/* --- MODALS --- */}

            {/* BMS Modal */}
            <div className={`dialog ${activeModal === 'dialog-projet-pro' ? 'is-open' : ''}`} onClick={() => setActiveModal(null)}>
                <div className="dialog-content" onClick={e => e.stopPropagation()}>
                    <div className="dialog-main-layout">
                        <div className="dialog-visual">
                            <img src="https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg" alt="BMS App" />
                        </div>
                        <div className="dialog-header-content">
                            <h2 className="dialog-title" dangerouslySetInnerHTML={tHtml('dialog_bms_title')}></h2>
                            <p className="dialog-short-description">{t('dialog_bms_short_desc')}</p>
                            <div className="dialog-meta"><span>Flutter</span><span>Firebase</span><span>Windows</span></div>
                        </div>
                        <div className="dialog-body">
                            <p>{t('dialog_bms_p1')}</p>
                            <p>{t('dialog_bms_p2')}</p>
                            <div className="dialog-screenshot">
                                <img src="/assets/Capture d'écran 1.png" alt="Dashboard" />
                                <p className="caption">{t('dialog_bms_caption1')}</p>
                            </div>
                            <p>{t('dialog_bms_p3')}</p>
                            <div className="dialog-screenshot">
                                <img src="/assets/Capture d'écran 2.png" alt="Facturation" />
                                <p className="caption">{t('dialog_bms_caption2')}</p>
                            </div>
                            <p>{t('dialog_bms_p4')}</p>
                        </div>
                    </div>
                    <button className="dialog-close" onClick={() => setActiveModal(null)}>{t('dialog_close')}</button>
                </div>
            </div>

            {/* GmailSorter Modal */}
            <div className={`dialog ${activeModal === 'dialog-projet-gmailsorter' ? 'is-open' : ''}`} onClick={() => setActiveModal(null)}>
                <div className="dialog-content" onClick={e => e.stopPropagation()}>
                    <div className="dialog-main-layout">
                        <div className="dialog-visual">
                            <img src="https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg" alt="Gmail" />
                        </div>
                        <div className="dialog-header-content">
                            <h2 className="dialog-title" dangerouslySetInnerHTML={tHtml('dialog_gmail_title')}></h2>
                            <p className="dialog-short-description">{t('dialog_gmail_short_desc')}</p>
                            <div className="dialog-meta"><span>Python</span><span>Gmail API</span><span>Gemini</span></div>
                        </div>
                        <div className="dialog-body">
                            <p>{t('dialog_gmail_p1')}</p>
                            <p>{t('dialog_gmail_p2')}</p>
                            <p>{t('dialog_gmail_p3')}</p>
                        </div>
                    </div>
                    <button className="dialog-close" onClick={() => setActiveModal(null)}>{t('dialog_close_2')}</button>
                </div>
            </div>

            {/* Scolaire Modal */}
            <div className={`dialog ${activeModal === 'dialog-projet-scolaire' ? 'is-open' : ''}`} onClick={() => setActiveModal(null)}>
                <div className="dialog-content" onClick={e => e.stopPropagation()}>
                    <div className="dialog-main-layout">
                        <div className="dialog-body">
                            <p>{t('dialog_school_content')}</p>
                        </div>
                    </div>
                    <button className="dialog-close" onClick={() => setActiveModal(null)}>{t('dialog_close_3')}</button>
                </div>
            </div>
        </>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default App;
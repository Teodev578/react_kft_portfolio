import { useLanguage } from '../../contexts/LanguageContext';

export const Hero = () => {
    const { t, lang } = useLanguage();

    return (
        <section id="accueil" className="hero">
            <div className="hero-content-grid">

                <div className="hero-main-content">
                    <div className="hero-text">
                        <h1 className="main-headline">{t('hero_headline')}</h1>
                        <p className="intro-text">{t('hero_intro')}</p>
                    </div>

                    <div className="hero-actions">
                        <a href="#contact" className="hero-link">
                            <span>{t('hero_contact_btn')}</span>
                        </a>
                        <a href={`/assets/CV-${lang === 'fr' ? 'Fr' : 'En'}-Fabien-Téo-KPEKPASSI.pdf`} download className="hero-link" id="cv-download-link" target="_blank">
                            <span>{t('hero_cv_btn')}</span>
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="image-wrapper">
                        <img src="/assets/portrait.avif" alt="Portrait de Fabien Téo KPEKPASSi" />
                    </div>
                    <div className="visual-caption">
                        <span className="caption-name">Fabien Téo KPEKPASSi</span>
                        <a href="#services" className="scroll-down-link">{t('hero_scroll_services')}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};
import { useLanguage } from '../../contexts/LanguageContext';

export const Services = () => {
    const { t } = useLanguage();

    return (
        <section id="services" className="services-new">
            <div className="services-container-new">
                
                <h2 className="services-main-title">{t('services_title')}</h2>
                
                <div className="services-image-wrapper">
                    <img src="/assets/service_mockup.avif" alt="Exemple de code sur un écran" />
                </div>

                <div className="services-list">
                    <div className="service-item">
                        <h3>{t('service_1_title')}</h3>
                        <p>{t('service_1_desc')}</p>
                    </div>
                    <div className="service-item">
                        <h3>{t('service_2_title')}</h3>
                        <p>{t('service_2_desc')}</p>
                    </div>
                    <div className="service-item">
                        <h3>{t('service_3_title')}</h3>
                        <p>{t('service_3_desc')}</p>
                    </div>
                    <div className="service-item">
                        <h3>{t('service_4_title')}</h3>
                        <p>{t('service_4_desc')}</p>
                    </div>

                    <a href="#about" className="about-me-link">{t('services_scroll_about')}</a>
                </div>

            </div>
        </section>
    );
};
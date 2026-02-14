import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectsProps {
    onOpenProject: (id: string) => void;
}

export const Projects = ({ onOpenProject }: ProjectsProps) => {
    const { t } = useLanguage();

    return (
        <section id="projets" className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <span className="header-symbol">*</span>
                    <div className="header-text">
                        <h2 className="projects-title">{t('projects_header_title')}</h2>
                        <p>{t('projects_header_desc')}</p>
                    </div>
                </div>
            </div>

            <div className="projects-list-wrapper">
                <div className="projects-list">
                    {/* Projet 1 */}
                    <article className="project-card" onClick={() => onOpenProject('dialog-projet-pro')}>
                        <div className="project-card-inner-container">
                            <div className="card-number">#1</div>
                            <div className="card-content">
                                <div className="card-info">
                                    <h3 className="card-title">{t('project_1_title')}</h3>
                                    <div className="card-tags">
                                        <span>Flutter</span> | <span>Firebase</span> | <span>Gestion de stock</span>
                                    </div>
                                </div>
                                <div className="card-action">{t('project_learn_more')}</div>
                            </div>
                        </div>
                    </article>

                    {/* Projet 2 */}
                    <article className="project-card" onClick={() => onOpenProject('dialog-projet-gmailsorter')}>
                        <div className="project-card-inner-container">
                            <div className="card-number">#2</div>
                            <div className="card-content">
                                <div className="card-info">
                                    <h3 className="card-title">{t('project_2_title')}</h3>
                                    <div className="card-tags">
                                        <span>Python</span> | <span>Gemini 1.5</span> | <span>Gmail API</span>
                                    </div>
                                </div>
                                <div className="card-action">{t('project_learn_more_2')}</div>
                            </div>
                        </div>
                    </article>

                    {/* Projet 3 */}
                    <article className="project-card" onClick={() => onOpenProject('dialog-projet-scolaire')}>
                        <div className="project-card-inner-container">
                            <div className="card-number">#3</div>
                            <div className="card-content">
                                <div className="card-info">
                                    <h3 className="card-title">{t('project_3_title')}</h3>
                                    <div className="card-tags"><span>AI</span> | <span>FLUTTER</span></div>
                                </div>
                                <div className="card-action">{t('project_learn_more_3')}</div>
                            </div>
                        </div>
                    </article>
                </div>

                <div className="github-link-container">
                    <a href="https://github.com/Teodev578" target="_blank" rel="noopener noreferrer" className="github-link">
                        {t('projects_github_link')}
                    </a>
                </div>
            </div>
        </section>
    );
};
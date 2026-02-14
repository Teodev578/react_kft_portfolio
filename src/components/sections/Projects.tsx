import { useLanguage } from '../../contexts/LanguageContext';
import { ProjectCard } from '../ui/ProjectCard';
import { projectsData } from '../../data/projects';

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
                    {projectsData.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={onOpenProject}
                        />
                    ))}
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
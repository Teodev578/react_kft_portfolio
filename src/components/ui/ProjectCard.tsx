import { useLanguage } from '../../contexts/LanguageContext';
import type { Project } from '../../types/Project';

interface ProjectCardProps {
    project: Project;
    onClick: (id: string) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    const { t } = useLanguage();

    return (
        <article className="project-card" onClick={() => onClick(project.id)}>
            <div className="project-card-inner-container">
                <div className="card-number">{project.number}</div>
                <div className="card-content">
                    <div className="card-info">
                        <h3 className="card-title">{t(project.titleKey)}</h3>
                        <div className="card-tags">
                            {project.tags.map((tag: string, index: number) => (
                                <span key={tag}>
                                    {tag}{index < project.tags.length - 1 ? ' | ' : ''}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="card-action">{t(project.actionKey)}</div>
                </div>
            </div>
        </article>
    );
};

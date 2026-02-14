import { useState, useEffect, useMemo } from 'react';
import './App.css';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Preloader } from './components/layout/Preloader';
import { ProjectModal } from './components/ui/ProjectModal';
import { projectsData } from './data/projects';

function AppContent() {
    const { isLoaded, setIsLoaded } = usePreloader();
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const activeProject = useMemo(() =>
        projectsData.find(p => p.id === activeModal) || null,
        [activeModal]
    );

    // Intersection Observer for scroll animations
    useEffect(() => {
        if (!isLoaded) return;

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
            {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}

            <Header />

            <main>
                <Hero />
                <Services />
                <About />
                <Projects onOpenProject={(id) => setActiveModal(id)} />
                <Contact />
            </main>

            <ProjectModal
                project={activeProject}
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
            />
        </>
    );
}

// Custom hook to manage preloader state
function usePreloader() {
    const [isLoaded, setIsLoaded] = useState(false);
    return { isLoaded, setIsLoaded };
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default App;
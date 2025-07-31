// app/components/sections/HeroSection.tsx

'use client';

import React from 'react';
import {
    Users,
    Calendar,
    Book,
    FileText,
    Briefcase,
    Clipboard,
} from 'react-feather';

const HeroSection: React.FC = () => {
    const quickAccessButtons = [
        { label: 'Règles Internes', icon: FileText, section: 2 },
        { label: 'Documents', icon: Book, section: 3 },
        { label: 'Organigramme', icon: Users, section: 4 },
        { label: 'Absences & Congés', icon: Calendar, section: 5 },
        { label: 'Formations', icon: Clipboard, section: 6 },
        { label: 'Instances Représentatives', icon: Briefcase, section: 7 },
    ];

    const scrollToSection = (sectionId: number) => {
        const element = document.getElementById(`section-${sectionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="section-0" className="pt-45 px-5 md:px-10 lg:px-16">
            <div className="mb-6">
                <h2 className="font-semibold mb-3">
                    <span className="inline-block">👋</span> Bienvenue sur l&apos;espace RH en ligne de La Sasson
                </h2>
                <p className="text-sm font-light">
                    Afin de vous offrir un accès simple et rapide aux informations essentielles, nous avons mis en place <strong>un espace RH en ligne dédié.</strong> Cet outil a été conçu pour <strong>centraliser toutes les ressources RH</strong> et vous permettre de trouver facilement les réponses à vos questions.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">
                    À quoi sert cet outil ?
                </h3>

                <ul className="text-sm font-light space-y-2 list-none">
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Accéder aux documents RH :</strong> règlements, convention collective, accords d&apos;entreprise...</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Consulter l&apos;organigramme</strong> et contacter rapidement les bonnes personnes</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Gérer vos absences et congés :</strong> comprendre les règles et télécharger les formulaires nécessaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>S&apos;informer sur les formations :</strong> opportunités de formation et démarches</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Consulter l&apos;annuaire du personnel :</strong> avec recherche par service ou fonction</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Obtenir des réponses immédiates</strong> grâce à une FAQ</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold mb-6 text-center text-gray-800">
                    Accès rapide aux sections principales
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                    {quickAccessButtons.map((button, index) => {
                        const Icon = button.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => scrollToSection(button.section)}
                                className="group relative bg-white hover:bg-gradient-to-br hover:from-[#FFCA22] hover:to-[#FFDD70] text-black hover:text-white py-3 rounded-2xl border border-gray-200 hover:border-transparent flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-out hover:scale-[1.01] active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFCA22] focus:ring-offset-2"
                            >
                                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-white/20 transition-colors duration-300">
                                    <Icon size={24} />
                                </div>
                                <span className="text-xs font-medium text-center">
                                    {button.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
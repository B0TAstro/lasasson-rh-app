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
        { label: 'Règles Internes', icon: FileText, color: 'bg-blue-600', section: 2 },
        { label: 'Documents', icon: Book, color: 'bg-green-600', section: 3 },
        { label: 'Équipes', icon: Users, color: 'bg-purple-600', section: 4 },
        { label: 'Absences & Congés', icon: Calendar, color: 'bg-red-600', section: 5 },
        { label: 'Formations', icon: Clipboard, color: 'bg-indigo-600', section: 6 },
        { label: 'Instances Représentatives', icon: Briefcase, color: 'bg-orange-600', section: 7 },
    ];

    const scrollToSection = (sectionId: number) => {
        const element = document.getElementById(`section-${sectionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="section-1" className="mt-20 mb-18 px-5 md:px-10 lg:px-16">
            <div className="mb-6">
                <h2 className="font-semibold mb-3">
                    <span className="inline-block">👋</span> Bienvenue sur l'espace RH en ligne de La Sasson
                </h2>
                <p className="text-sm font-light">
                    Afin de vous offrir un accès simple et rapide aux informations essentielles, nous avons mis en place <strong>un espace RH en ligne dédié.</strong> Cet outil a été conçu pour <strong>centraliser toutes les ressources RH</strong>, réduire les sollicitations du service RH et vous permettre de trouver facilement les réponses à vos questions.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-3">
                    À quoi sert cet outil ?
                </h3>

                <ul className="text-sm font-light space-y-3 list-none">
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Accéder aux documents RH :</strong> règlements, conventions collectives, accords d'entreprise...</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Consulter l'organigramme</strong> et contacter rapidement les bonnes personnes</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Gérer vos absences et congés :</strong> comprendre les règles et télécharger les formulaires nécessaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>S'informer sur les formations :</strong> opportunités de formation et démarches</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Consulter l'annuaire du personnel :</strong> avec recherche par service ou fonction</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Obtenir des réponses immédiates</strong> grâce à une FAQ</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-4 text-center">
                    Accès rapide aux sections principales
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {quickAccessButtons.map((button, index) => {
                        const Icon = button.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => scrollToSection(button.section)}
                                className={`${button.color} text-white p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                            >
                                <Icon size={20} />
                                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
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
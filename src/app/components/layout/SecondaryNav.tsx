// app/components/layout/SecondaryNav.tsx

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'react-feather';

const icons = {
  prev: ArrowLeft,
  home: Home,
  next: ArrowRight,
};

const TOTAL_SECTIONS = 8;
const INITIAL_SECTION = 1;

export default function SecondaryNav() {
  const [currentSection, setCurrentSection] = useState(INITIAL_SECTION);
  const [activeButton, setActiveButton] = useState<'prev' | 'home' | 'next'>('home');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (direction: 'prev' | 'next') => {
    let newSection = currentSection;
    if (direction === 'prev' && currentSection > 1) newSection--;
    if (direction === 'next' && currentSection < TOTAL_SECTIONS) newSection++;

    if (newSection !== currentSection) {
      setCurrentSection(newSection);
      const sectionElement = document.getElementById(`section-${newSection}`);
      if (sectionElement) sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      for (let i = TOTAL_SECTIONS; i >= 1; i--) {
        const sectionElement = document.getElementById(`section-${i}`);
        if (sectionElement && sectionElement.getBoundingClientRect().top <= window.innerHeight / 2) {
          setCurrentSection(i);
          break;
        }
      }
    };

    // Throttle pour les performances
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const Button = ({ id }: { id: 'prev' | 'home' | 'next' }) => {
    const Icon = icons[id];
    const [isPressed, setIsPressed] = useState(false);
    const [animKey, setAnimKey] = useState(0);

    const isActive = activeButton === id;
    const isDisabled =
      (id === 'prev' && currentSection === 1) ||
      (id === 'next' && currentSection === TOTAL_SECTIONS);

    const handleClick = () => {
      if (isDisabled) return;
      setActiveButton(id);
      setAnimKey(Date.now());
      id === 'home' ? scrollToTop() : navigateToSection(id);
    };

    return (
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={isDisabled}
        className={`flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-200 
        ${isPressed ? 'bg-gray-100' : ''}
        ${isActive ? 'py-1' : ''}
        ${isDisabled ? 'opacity-0 cursor-not-allowed' : ''}
      `}
      >
        <Icon
          key={`icon-${animKey}`}
          size={24}
          className={`${isActive ? 'text-[var(--color-primary)] animate-bounce-up-icon' : 'text-[var(--grey)]'}`}
        />
        {isActive && (
          <span
            key={`label-${animKey}`}
            className="text-[8px] font-medium leading-none text-[var(--color-primary)] mt-[1px] animate-bounce-down-text"
          >
            {id}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="fixed w-full bottom-0 z-10">
      <div className="w-full h-[55px] flex-shrink-0 bg-white" />
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-15 bg-white rounded-xl px-5 py-2 gap-9 flex items-center justify-center shadow-[1px_3px_6px_rgba(0,0,0,0.25)]">
        <Button id="prev" />
        <Button id="home" />
        <Button id="next" />
      </div>
    </div>
  );
}
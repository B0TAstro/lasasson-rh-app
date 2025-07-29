// app/components/layout/SecondaryNav.tsx

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'react-feather';

const icons = {
  prev: ArrowLeft,
  home: Home,
  next: ArrowRight,
} as const;

export default function SecondaryNav() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const currentSectionRef = useRef<number>(0);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [activeButton, setActiveButton] = useState<'prev' | 'home' | 'next'>('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoized section detection
  const detectSections = useCallback(() => {
    const allSections = Array.from(document.querySelectorAll('[id^="section-"]'))
      .filter(el => /^section-\d+$/.test(el.id))
      .sort((a, b) => {
        const numA = parseInt(a.id.split('-')[1]);
        const numB = parseInt(b.id.split('-')[1]);
        return numA - numB;
      }) as HTMLElement[];
    setSections(allSections);
  }, []);

  // Initial sections detection
  useEffect(() => {
    detectSections();
  }, [detectSections]);

  // Memoized navigation functions
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSection(0);
    currentSectionRef.current = 0;
  }, []);

  const navigateToSection = useCallback((direction: 'prev' | 'next') => {
    if (!sections.length) return;

    let newIndex = currentSection;
    if (direction === 'prev' && newIndex > 0) newIndex--;
    if (direction === 'next' && newIndex < sections.length - 1) newIndex++;
    if (newIndex !== currentSection) {
      const target = sections[newIndex];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection(newIndex);
        currentSectionRef.current = newIndex;
      }
    }
  }, [sections, currentSection]);

  // Optimized IntersectionObserver with debouncing
  useEffect(() => {
    if (!sections.length) return;
    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    let timeoutId: NodeJS.Timeout;
    const debouncedCallback = (entries: IntersectionObserverEntry[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const visibleSections = entries
          .filter(e => e.isIntersecting)
          .map(e => parseInt(e.target.id.split('-')[1]))
          .sort((a, b) => a - b);

        if (visibleSections.length > 0) {
          const topMost = visibleSections[0];
          if (Math.abs(topMost - currentSectionRef.current) >= 1) {
            setCurrentSection(topMost);
            currentSectionRef.current = topMost;
          }
        }
      }, 50); // 50ms debounce
    };

    observerRef.current = new IntersectionObserver(debouncedCallback, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.1,
    });

    sections.forEach((el) => observerRef.current!.observe(el));

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
    };
  }, [sections]);

  // Memoized button states
  const buttonStates = useMemo(() => ({
    prev: {
      isDisabled: currentSection <= 0,
    },
    next: {
      isDisabled: currentSection >= sections.length - 1,
    },
    home: {
      isDisabled: false,
    },
  }), [currentSection, sections.length]);

  const Button = ({ id }: { id: 'prev' | 'home' | 'next' }) => {
    const Icon = icons[id];
    const [isPressed, setIsPressed] = useState(false);
    const [animKey, setAnimKey] = useState(0);

    const isActive = activeButton === id;
    const isDisabled = buttonStates[id].isDisabled;

    const handleClick = useCallback(() => {
      if (isDisabled) return;

      setActiveButton(id);
      setAnimKey(Date.now());

      if (id === 'home') {
        scrollToTop();
      } else {
        navigateToSection(id);
      }
    }, [isDisabled, id]);

    const handleMouseDown = useCallback(() => setIsPressed(true), []);
    const handleMouseUp = useCallback(() => setIsPressed(false), []);
    const handleMouseLeave = useCallback(() => setIsPressed(false), []);

    const buttonClasses = useMemo(() =>
      `flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-200 
        ${isPressed ? 'bg-gray-100 translate-y-[1px]' : ''}
        ${isActive ? 'py-1' : ''}
        ${isDisabled ? 'opacity-0 cursor-not-allowed' : ''}
      `, [isPressed, isActive, isDisabled]);

    const iconClasses = useMemo(() =>
      `${isActive ? 'text-[var(--color-primary)] animate-bounce-up-icon' : 'text-[var(--grey)]'}`
      , [isActive]);

    return (
      <button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        disabled={isDisabled}
        className={buttonClasses}
      >
        <Icon
          key={`icon-${animKey}`}
          size={24}
          className={iconClasses}
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
      <div className="w-full h-[55px] flex-shrink-0 bg-white/10 backdrop-blur-[17.5px]" />
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-15 bg-white rounded-xl px-5 py-2 gap-9 flex items-center justify-center shadow-[1px_3px_6px_rgba(0,0,0,0.25)]">
        <Button id="prev" />
        <Button id="home" />
        <Button id="next" />
      </div>
    </div>
  );
}
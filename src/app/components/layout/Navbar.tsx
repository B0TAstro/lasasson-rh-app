// app/components/layout/Navbar.tsx

'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { X, Menu, MapPin, Users, BookOpen, Briefcase, Folder, HelpCircle, Calendar, UserCheck } from 'react-feather'

const sections = [
  { label: 'Introduction', icon: <MapPin />, href: '#section-1' },
  { label: 'Cadre Juridique', icon: <Briefcase />, href: '#section-2' },
  { label: 'Documents et Ressources', icon: <Folder />, href: '#section-3' },
  { label: 'Organigramme et Annuaire', icon: <Users />, href: '#section-4' },
  { label: 'Gestion des Absences & Congés', icon: <Calendar />, href: '#section-5' },
  { label: 'Formations', icon: <BookOpen />, href: '#section-6' },
  { label: 'Instances Représentatives', icon: <UserCheck />, href: '#section-7' },
  { label: 'FAQ', icon: <HelpCircle />, href: '#section-8' }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
      isDragging.current = true
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      currentX.current = e.touches[0].clientX
      const deltaX = currentX.current - startX.current
      if (menuRef.current) {
        if (!isOpen && deltaX < -50 && startX.current > window.innerWidth - 50) {
          setIsOpen(true)
          isDragging.current = false
        }
        else if (isOpen && deltaX > 50) {
          setIsOpen(false)
          isDragging.current = false
        }
      }
    }
    const handleTouchEnd = () => {
      isDragging.current = false
    }
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-11 pt-5 pb-1 bg-white/10 backdrop-blur-[17.5px]">
        <div className="relative flex items-center justify-between text-black">
          <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-500">
            <Image
              src="/image/logo-sasson.png"
              alt="Logo La Sasson"
              width={160}
              height={50}
              className={`h-12 w-auto transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-y-15' : 'opacity-100 translate-y-0'}`}
            />
            <h1 className={`text-xl mt-5 transition-all duration-500 ${isScrolled ? 'translate-y-[-60px]' : 'opacity-100'}`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              <a href="#top">Informations RH</a>
            </h1>
          </div>

          <div className="ml-auto bg-[var(--color-primary)] flex-shrink-0 filter drop-shadow-[1px_3px_6px_rgba(0,0,0,0.25)] rounded-l-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={"Ouvrir le menu"}
              className="pr-8 pl-4 pt-2.5 pb-2.5"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`absolute w-screen h-screen inset-0 z-50 pt-7 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} ease-in-out`}
          style={{ background: 'linear-gradient(186deg, #FFCA22 -0.96%, #943E01 98.97%)' }}
        >

          <div className="flex justify-center items-center">
            <h2 className="text-xl font-semibold text-black"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Table des matières
            </h2>
          </div>

          <div className="flex h-screen mt-10">
            <div
              className="bg-white shadow-lg w-24 h-[85%] rounded-tr-3xl rounded-br-3xl flex flex-col items-end pt-11.25"
              style={{
                boxShadow: '-3.972px 0.794px 23.83px 0px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div className="bg-[var(--color-primary)] flex-shrink-0 filter drop-shadow-[1px_3px_6px_rgba(0,0,0,0.25)] rounded-l-full">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le menu"
                  className="pr-6 pl-3 pt-2 pb-2 flex items-center justify-center"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="mt-3 w-full">
              <hr className="border-t border-white w-[95%] mx-auto" />
              <nav className="mt-8 flex flex-col flex-start gap-6 text-white">
                {sections.map(({ label, href, icon }, index) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="group flex justify-between items-center mr-1 pl-4 pr-[7px] pt-1 pb-1 rounded-tr-full rounded-br-full transition-colors duration-500 hover:bg-white hover:text-black"
                  >
                    <span className="font-bold text-base">
                      {index + 1}. {label}
                    </span>
                    <div className="rounded-full p-2 w-8 h-8 flex items-center justify-center bg-[var(--color-primary-contrast)] transition-all duration-300 group-hover:bg-transparent">
                      {icon}
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
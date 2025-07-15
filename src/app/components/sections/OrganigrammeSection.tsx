// app/components/sections/OrganigrammeSection.tsx

'use client';

import { useState, useMemo } from 'react';
import { PortableText } from '@portabletext/react';
import type { OrganigrammeType } from '@/types';
import { Search, ChevronDown, Mail, Phone, ArrowRight, Download, User, X } from 'react-feather';
import Image from 'next/image';

interface OrganigrammeSectionProps {
  data: OrganigrammeType;
}

export default function OrganigrammeSection({ data }: OrganigrammeSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [fonctionFilter, setFonctionFilter] = useState('');
  const [etablissementFilter, setEtablissementFilter] = useState('');
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isFonctionOpen, setIsFonctionOpen] = useState(false);
  const [isEtablissementOpen, setIsEtablissementOpen] = useState(false);

  if (!data) return null;

  const serviceOptions = useMemo(() => {
    const services = data.organigrammeItems
      .map(item => item.service)
      .filter((service): service is string => Boolean(service));
    return [...new Set(services)].sort();
  }, [data.organigrammeItems]);

  const fonctionOptions = useMemo(() => {
    const fonctions = data.organigrammeItems
      .map(item => item.fonction)
      .filter((fonction): fonction is string => Boolean(fonction));
    return [...new Set(fonctions)].sort();
  }, [data.organigrammeItems]);

  const etablissementOptions = useMemo(() => {
    const etablissements = data.organigrammeItems
      .map(item => item.etablissement)
      .filter((etablissement): etablissement is string => Boolean(etablissement));
    return [...new Set(etablissements)].sort();
  }, [data.organigrammeItems]);

  const hasActiveSearch = searchTerm !== '' || serviceFilter !== '' || fonctionFilter !== '' || etablissementFilter !== '';

  const filteredItems = useMemo(() => {
    if (!hasActiveSearch) return [];

    let filtered = data.organigrammeItems.filter(item => {
      const matchesSearch = searchTerm === '' ||
        `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fonction?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.etablissement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telephone?.includes(searchTerm);

      const matchesService = serviceFilter === '' || serviceFilter === 'ALL_SERVICES' || item.service === serviceFilter;
      const matchesFonction = fonctionFilter === '' || fonctionFilter === 'ALL_FUNCTIONS' || item.fonction === fonctionFilter;
      const matchesEtablissement = etablissementFilter === '' || etablissementFilter === 'ALL_ESTABLISHMENTS' || item.etablissement === etablissementFilter;

      return matchesSearch && matchesService && matchesFonction && matchesEtablissement;
    });

    if (serviceFilter !== '' && serviceFilter !== 'ALL_SERVICES' && fonctionFilter === '' && etablissementFilter === '') {
      filtered.sort((a, b) => {
        const serviceCompare = (a.service || '').localeCompare(b.service || '');
        if (serviceCompare !== 0) return serviceCompare;
        return `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`);
      });
    } else if (fonctionFilter !== '' && fonctionFilter !== 'ALL_FUNCTIONS' && serviceFilter === '' && etablissementFilter === '') {
      filtered.sort((a, b) => {
        const fonctionCompare = (a.fonction || '').localeCompare(b.fonction || '');
        if (fonctionCompare !== 0) return fonctionCompare;
        return `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`);
      });
    } else if (etablissementFilter !== '' && etablissementFilter !== 'ALL_ESTABLISHMENTS' && serviceFilter === '' && fonctionFilter === '') {
      filtered.sort((a, b) => {
        const etablissementCompare = (a.etablissement || '').localeCompare(b.etablissement || '');
        if (etablissementCompare !== 0) return etablissementCompare;
        return `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`);
      });
    } else {
      filtered.sort((a, b) => `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`));
    }

    return filtered;
  }, [data.organigrammeItems, searchTerm, serviceFilter, fonctionFilter, etablissementFilter, hasActiveSearch]);

  const resetFilters = () => {
    setSearchTerm('');
    setServiceFilter('');
    setFonctionFilter('');
    setEtablissementFilter('');
  };

  return (
    <section id="section-4" className="pt-19 px-5 md:px-10 lg:px-16">
      <h2 className="text-[18px] font-medium underline">{data.title}</h2>

      <div className="mt-6 space-y-6">
        <div className="relative">
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          ) : (
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black" size={20} />
          )}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg placeholder:text-black focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <div className="relative">
            <button
              onClick={() => setIsServiceOpen(!isServiceOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gray-100 rounded-lg"
            >
              <span className="text-black">
                {serviceFilter === 'ALL_SERVICES' ? 'Tous les services' : serviceFilter || 'Service'}
              </span>
              <ChevronDown
                className={`transform transition-transform duration-350 ${isServiceOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isServiceOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-5 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setServiceFilter('ALL_SERVICES');
                    setIsServiceOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 border-b"
                >
                  Tous les services
                </button>
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      setServiceFilter(service);
                      setIsServiceOpen(false);
                    }}
                    className="w-full px-5 py-2.5 text-left hover:bg-gray-100"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsFonctionOpen(!isFonctionOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gray-100 rounded-lg"
            >
              <span className="text-black">
                {fonctionFilter === 'ALL_FUNCTIONS' ? 'Toutes les fonctions' : fonctionFilter || 'Fonction'}
              </span>
              <ChevronDown
                className={`transform transition-transform duration-350 ${isFonctionOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isFonctionOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-5 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setFonctionFilter('ALL_FUNCTIONS');
                    setIsFonctionOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 border-b"
                >
                  Toutes les fonctions
                </button>
                {fonctionOptions.map((fonction) => (
                  <button
                    key={fonction}
                    onClick={() => {
                      setFonctionFilter(fonction);
                      setIsFonctionOpen(false);
                    }}
                    className="w-full px-5 py-2.5 text-left hover:bg-gray-100"
                  >
                    {fonction}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsEtablissementOpen(!isEtablissementOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gray-100 rounded-lg"
            >
              <span className="text-black">
                {etablissementFilter === 'ALL_ESTABLISHMENTS' ? 'Tous les établissements' : etablissementFilter || 'Établissement'}
              </span>
              <ChevronDown
                className={`transform transition-transform duration-350 ${isEtablissementOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isEtablissementOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-5 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setEtablissementFilter('ALL_ESTABLISHMENTS');
                    setIsEtablissementOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 border-b"
                >
                  Tous les établissements
                </button>
                {etablissementOptions.map((etablissement) => (
                  <button
                    key={etablissement}
                    onClick={() => {
                      setEtablissementFilter(etablissement);
                      setIsEtablissementOpen(false);
                    }}
                    className="w-full px-5 py-2.5 text-left hover:bg-gray-100"
                  >
                    {etablissement}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {hasActiveSearch && (
          <div className="flex items-center justify-between">
            <button
              onClick={resetFilters}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              Réinitialiser les filtres
            </button>
            <p className="text-sm text-gray-600">
              {filteredItems.length} résultat{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        {!hasActiveSearch ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-3">
              Commencez votre recherche
            </p>
            <p className="text-gray-400 text-sm">
              Utilisez la barre de recherche ou les filtres pour trouver une personne
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucun résultat trouvé pour votre recherche
          </p>
        ) : (

          <div>
            {filteredItems.length <= 6 ? (
              <div className="space-y-4">
                {filteredItems.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        {item.photo?.asset?.url ? (
                          <Image
                            src={item.photo.asset.url}
                            alt={`${item.nom} ${item.prenom}`}
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px] rounded-full object-cover border border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                            <User size={40} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-lg text-black">
                          {item.nom} {item.prenom}
                        </p>

                        <div className="mt-2 space-y-1">
                          <p className="text-gray-700 text-sm">
                            <span className="font-medium">Établissement:</span> {item.etablissement || <span className="italic text-gray-500">Non renseigné</span>}
                          </p>
                          <p className="text-gray-700 text-sm">
                            <span className="font-medium">Service:</span> {item.service || <span className="italic text-gray-500">Non renseigné</span>}
                          </p>
                          <p className="text-gray-700 text-sm">
                            <span className="font-medium">Fonction:</span> {item.fonction || <span className="italic text-gray-500">Non renseigné</span>}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gray-200 text-sm text-center">
                          {item.email ? (
                            <a
                              href={`mailto:${item.email}`}
                              className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[#FFB800] hover:underline text-sm transition-colors duration-200"
                            >
                              <Mail size={16} />
                              {item.email}
                            </a>
                          ) : (
                            <span className="flex items-center gap-2 text-gray-400 text-sm">
                              <Mail size={16} />
                              <span className="italic">Non renseigné</span>
                            </span>
                          )}
                          {item.telephone ? (
                            <a
                              href={`tel:${item.telephone}`}
                              className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[#FFB800] hover:underline text-sm transition-colors duration-200"
                            >
                              <Phone size={16} />
                              {item.telephone}
                            </a>
                          ) : (
                            <span className="flex items-center gap-2 text-gray-400 text-sm">
                              <Phone size={16} />
                              <span className="italic">Non renseigné</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex flex-col items-center text-center">
                      {item.photo?.asset?.url ? (
                        <Image
                          src={item.photo.asset.url}
                          alt={`${item.nom} ${item.prenom}`}
                          width={80}
                          height={80}
                          className="w-[80px] h-[80px] rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-[80px] h-[80px] bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                          <User size={30} className="text-gray-400" />
                        </div>
                      )}
                      <p className="mt-2 font-semibold text-lg text-black">
                        {item.nom} {item.prenom}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{item.fonction || <span className="italic text-gray-400">Non renseigné</span>}</p>
                    </div>

                    <div className="mt-4 text-sm space-y-1 text-center">
                      <p className="text-gray-600">
                        <span className="font-medium">Établissement:</span>{' '}
                        {item.etablissement || <span className="italic text-gray-400">Non renseigné</span>}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Service:</span>{' '}
                        {item.service || <span className="italic text-gray-400">Non renseigné</span>}
                      </p>

                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200 text-sm text-center">
                      <div className="space-y-2 flex flex-col items-center">
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}`}
                            className="flex items-center gap-2.5 text-[var(--color-primary)] hover:underline transition-colors"
                          >
                            <Mail size={14} />
                            {item.email}
                          </a>
                        ) : (
                          <span className="flex items-center gap-2.5 text-gray-400">
                            <Mail size={14} />
                            <span className="italic">Non renseigné</span>
                          </span>
                        )}

                        {item.telephone ? (
                          <a
                            href={`tel:${item.telephone}`}
                            className="flex items-center gap-2.5 text-[var(--color-primary)] hover:underline transition-colors"
                          >
                            <Phone size={14} />
                            {item.telephone}
                          </a>
                        ) : (
                          <span className="flex items-center gap-2.5 text-gray-400">
                            <Phone size={14} />
                            <span className="italic">Non renseigné</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {data.hasExtraSection && (
        <div className="mt-12">
          {data.extraSectionTitle && (
            <h3 className="font-medium">{data.extraSectionTitle}</h3>
          )}
          {data.extraSectionContent && (
            <div className="text-sm font-light space-y-2 mt-6">
              <PortableText
                value={data.extraSectionContent}
                components={{
                  block: {
                    normal: ({ children }) => <p>{children}</p>
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc list-inside ml-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal list-inside ml-2">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({ children }) => <li className="ml-2">{children}</li>,
                    number: ({ children }) => <li className="ml-2">{children}</li>,
                  }
                }}
              />
            </div>
          )}
          {data.extraSectionButtonText && (
            <div className="mt-4 flex justify-center">
              {data.extraSectionButtonType === 'external' && data.extraSectionButtonUrl ? (
                <a
                  href={data.extraSectionButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[#FFDD70] text-white text-sm font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-103 active:translate-y-[3px] active:scale-[0.99]"
                >
                  <ArrowRight size={16} />
                  {data.extraSectionButtonText}
                </a>
              ) : data.extraSectionButtonType === 'pdf' && data.extraSectionButtonPdf?.asset ? (
                <a
                  href={data.extraSectionButtonPdf.asset.url}
                  download={data.extraSectionButtonPdf.asset.originalFilename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[#FFDD70] text-white text-sm font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-103 active:translate-y-[3px] active:scale-[0.99]"
                >
                  {data.extraSectionButtonText}
                  <Download size={16} />
                </a>
              ) : null}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
// app/components/sections/OrganigrammeSection.tsx

'use client';

import { useState, useMemo } from 'react';
import { PortableText } from '@portabletext/react';
import { getOrganigramme } from '@/lib/sanity.query';
import type { OrganigrammeType } from '@/types';
import { Search, ChevronDown, Mail, Phone, ArrowRight, Download } from 'react-feather';
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

  // Extraire les options uniques pour les filtres
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

  // Vérifier si une recherche est active
  const hasActiveSearch = searchTerm !== '' || serviceFilter !== '' || fonctionFilter !== '' || etablissementFilter !== '';

  // Filtrer les résultats
  const filteredItems = useMemo(() => {
    if (!hasActiveSearch) return [];

    return data.organigrammeItems.filter(item => {
      const matchesSearch = searchTerm === '' ||
        `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fonction?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.etablissement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telephone?.includes(searchTerm);

      const matchesService = serviceFilter === '' || item.service === serviceFilter;
      const matchesFonction = fonctionFilter === '' || item.fonction === fonctionFilter;
      const matchesEtablissement = etablissementFilter === '' || item.etablissement === etablissementFilter;

      return matchesSearch && matchesService && matchesFonction && matchesEtablissement;
    });
  }, [data.organigrammeItems, searchTerm, serviceFilter, fonctionFilter, etablissementFilter, hasActiveSearch]);

  const resetFilters = () => {
    setSearchTerm('');
    setServiceFilter('');
    setFonctionFilter('');
    setEtablissementFilter('');
  };

  return (
    <section id="section-4" className="pt-19 px-5 md:px-10 lg:px-16 mb-25">
      <h2 className="text-[18px] font-medium underline">{data.title}</h2>

      <div className="mt-6 space-y-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#FFCA22]"
          />
        </div>

        {/* Filtres */}
        <div className="space-y-2">
          {/* Filtre Service */}
          <div className="relative">
            <button
              onClick={() => setIsServiceOpen(!isServiceOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCA22]"
            >
              <span className="text-gray-700">
                {serviceFilter || 'Service'}
              </span>
              <ChevronDown
                className={`transform transition-transform ${isServiceOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isServiceOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setServiceFilter('');
                    setIsServiceOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b"
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
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtre Fonction */}
          <div className="relative">
            <button
              onClick={() => setIsFonctionOpen(!isFonctionOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCA22]"
            >
              <span className="text-gray-700">
                {fonctionFilter || 'Fonction'}
              </span>
              <ChevronDown
                className={`transform transition-transform ${isFonctionOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isFonctionOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setFonctionFilter('');
                    setIsFonctionOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b"
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
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {fonction}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtre Établissement */}
          <div className="relative">
            <button
              onClick={() => setIsEtablissementOpen(!isEtablissementOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCA22]"
            >
              <span className="text-gray-700">
                {etablissementFilter || 'Établissement'}
              </span>
              <ChevronDown
                className={`transform transition-transform ${isEtablissementOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isEtablissementOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setEtablissementFilter('');
                    setIsEtablissementOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b"
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
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {etablissement}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bouton de réinitialisation */}
        {hasActiveSearch && (
          <button
            onClick={resetFilters}
            className="text-sm text-[#FFCA22] hover:underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Résultats */}
      <div className="mt-8 space-y-4">
        {!hasActiveSearch ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">
              Commencez votre recherche
            </p>
            <p className="text-gray-400 text-sm">
              Utilisez la barre de recherche ou les filtres pour trouver une personne
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucun résultat trouvé pour votre recherche.
          </p>
        ) : (
          filteredItems.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                {item.photo?.asset?.url && (
                  <div className="flex-shrink-0">
                    <Image
                      src={item.photo.asset.url}
                      alt={`${item.nom} ${item.prenom}`}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-lg">
                    {item.nom} {item.prenom}
                  </h3>

                  {item.fonction && (
                    <p className="text-gray-600 text-sm mt-1">{item.fonction}</p>
                  )}

                  {item.service && (
                    <p className="text-gray-600 text-sm">{item.service}</p>
                  )}

                  {item.etablissement && (
                    <p className="text-gray-600 text-sm">{item.etablissement}</p>
                  )}

                  <div className="flex flex-wrap gap-4 mt-2">
                    {item.email && (
                      <a
                        href={`mailto:${item.email}`}
                        className="flex items-center gap-1 text-[#FFCA22] hover:underline text-sm"
                      >
                        <Mail size={16} />
                        {item.email}
                      </a>
                    )}

                    {item.telephone && (
                      <a
                        href={`tel:${item.telephone}`}
                        className="flex items-center gap-1 text-[#FFCA22] hover:underline text-sm"
                      >
                        <Phone size={16} />
                        {item.telephone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Section supplémentaire */}
      {data.hasExtraSection && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          {data.extraSectionTitle && (
            <h3 className="font-medium text-lg mb-4">{data.extraSectionTitle}</h3>
          )}

          {data.extraSectionContent && (
            <div className="text-sm font-light space-y-2 mb-6">
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
            <div className="flex justify-center">
              {data.extraSectionButtonType === 'external' && data.extraSectionButtonUrl ? (
                <a
                  href={data.extraSectionButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#FFCA22] to-[#FFDD70] text-white text-sm font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-103 active:translate-y-[3px] active:scale-[0.99]"
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
                  className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#FFCA22] to-[#FFDD70] text-white text-sm font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-103 active:translate-y-[3px] active:scale-[0.99]"
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
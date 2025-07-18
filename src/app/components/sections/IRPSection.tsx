// app/components/sections/IRPSection.tsx

import { getIRP } from '@/lib/sanity.query'
import type { IRPType } from '@/types'
import { PortableText } from '@portabletext/react'
import { Phone } from 'react-feather'

export default async function IRPSection() {
    const irpData: IRPType = await getIRP()

    if (!irpData) return null
    // conole.log(irpData)
    return (
        <section id="section-7" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{irpData.title}</h2>

            {/* Section CSE */}
            <div className="mt-8">
                <h3 className="text-[16px] font-medium text-[var(--color-primary)] mb-2">
                    {irpData.cseSection.title}
                </h3>

                {irpData.cseSection.subtitle && (
                    <h4 className="text-[14px] font-medium text-gray-700 mb-3">
                        {irpData.cseSection.subtitle}
                    </h4>
                )}

                <div className="text-sm font-light space-y-2 mb-4">
                    <PortableText
                        value={irpData.cseSection.content}
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

                {/* Membres Titulaires */}
                <div className="mb-4">
                    <h5 className="text-[14px] font-medium text-gray-800 mb-2">Membres Titulaires</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {irpData.cseSection.membres
                            .filter(membre => membre.type === 'titulaire')
                            .map((membre, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="font-medium text-sm">{membre.nomPrenom}</div>
                                    {membre.fonction && (
                                        <div className="text-xs text-gray-600">{membre.fonction}</div>
                                    )}
                                    <div className="text-xs text-gray-600">{membre.structure}</div>
                                    {membre.telephone && (
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                            <Phone size={12} />
                                            {membre.telephone}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>

                {/* Membres Suppléants */}
                <div className="mb-6">
                    <h5 className="text-[14px] font-medium text-gray-800 mb-2">Membres Suppléants</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {irpData.cseSection.membres
                            .filter(membre => membre.type === 'suppleant')
                            .map((membre, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="font-medium text-sm">{membre.nomPrenom}</div>
                                    {membre.fonction && (
                                        <div className="text-xs text-gray-600">{membre.fonction}</div>
                                    )}
                                    <div className="text-xs text-gray-600">{membre.structure}</div>
                                    {membre.telephone && (
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                            <Phone size={12} />
                                            {membre.telephone}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Section Représentants de Proximité */}
            <div className="mt-8">
                <h3 className="text-[16px] font-medium text-[var(--color-primary)] mb-2">
                    {irpData.representantsSection.title}
                </h3>

                {irpData.representantsSection.subtitle && (
                    <h4 className="text-[14px] font-medium text-gray-700 mb-3">
                        {irpData.representantsSection.subtitle}
                    </h4>
                )}

                <div className="text-sm font-light space-y-2 mb-4">
                    <PortableText
                        value={irpData.representantsSection.content}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {irpData.representantsSection.membres.map((representant, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-sm text-[var(--color-primary)]">
                                {representant.territoire}
                            </div>
                            <div className="font-medium text-sm">
                                {representant.nom} {representant.prenom}
                            </div>
                            <div className="text-xs text-gray-600">{representant.structure}</div>
                            {representant.telephone && (
                                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                    <Phone size={12} />
                                    {representant.telephone}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Délégués Syndicaux */}
            <div className="mt-8">
                <h3 className="text-[16px] font-medium text-[var(--color-primary)] mb-2">
                    {irpData.deleguesSection.title}
                </h3>

                {irpData.deleguesSection.subtitle && (
                    <h4 className="text-[14px] font-medium text-gray-700 mb-3">
                        {irpData.deleguesSection.subtitle}
                    </h4>
                )}

                <div className="text-sm font-light space-y-2 mb-4">
                    <PortableText
                        value={irpData.deleguesSection.content}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {irpData.deleguesSection.membres.map((delegue, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-sm">{delegue.nomPrenom}</div>
                            <div className="text-xs text-[var(--color-primary)] font-medium">
                                {delegue.syndicat}
                            </div>
                            <div className="text-xs text-gray-600">{delegue.structure}</div>
                            {delegue.telephone && (
                                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                    <Phone size={12} />
                                    {delegue.telephone}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Commissions Spécialisées */}
            <div className="mt-8">
                <h3 className="text-[16px] font-medium text-[var(--color-primary)] mb-2">
                    {irpData.commissionsSection.title}
                </h3>

                {irpData.commissionsSection.subtitle && (
                    <h4 className="text-[14px] font-medium text-gray-700 mb-3">
                        {irpData.commissionsSection.subtitle}
                    </h4>
                )}

                <div className="text-sm font-light space-y-2 mb-4">
                    <PortableText
                        value={irpData.commissionsSection.content}
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

                <div className="space-y-6 mb-6">
                    {irpData.commissionsSection.commissions.map((commission, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-medium text-sm text-[var(--color-primary)] mb-2">
                                {commission.nom}
                            </h5>
                            {commission.description && (
                                <p className="text-xs text-gray-600 mb-3">{commission.description}</p>
                            )}
                            <div className="space-y-2">
                                <div className="text-xs font-medium text-gray-700">Membres :</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {commission.membres.map((membre, membreIdx) => (
                                        <div key={membreIdx} className="bg-white p-2 rounded text-xs">
                                            <div className="font-medium">
                                                {membre.nom} {membre.prenom}
                                            </div>
                                            <div className="text-gray-600">{membre.structure}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Référent Harcèlement */}
            <div className="mt-8">
                <h3 className="text-[16px] font-medium text-[var(--color-primary)] mb-2">
                    {irpData.referentSection.title}
                </h3>

                {irpData.referentSection.subtitle && (
                    <h4 className="text-[14px] font-medium text-gray-700 mb-3">
                        {irpData.referentSection.subtitle}
                    </h4>
                )}

                <div className="text-sm font-light space-y-2 mb-4">
                    <PortableText
                        value={irpData.referentSection.content}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {irpData.referentSection.referents.map((referent, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-sm">
                                {referent.nom} {referent.prenom}
                            </div>
                            <div className="text-xs text-[var(--color-primary)] font-medium">
                                {referent.type === 'referent' ? 'Référent' : 'Référente'}
                            </div>
                            <div className="text-xs text-gray-600">{referent.structure}</div>
                        </div>
                    ))}
                </div>

                <div className="text-xs text-gray-600">
                    <p>🚨 Contact d'urgence pour signalement</p>
                    <a href={`mailto:${irpData.referentSection.contactUrgence}`} className="text-[var(--color-primary)]">
                        {irpData.referentSection.contactUrgence}
                    </a>
                </div>
            </div>
        </section>
    )
}
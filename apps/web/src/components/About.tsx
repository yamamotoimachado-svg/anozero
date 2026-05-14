"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');
  
  const renderIntroWithLink = () => {
    const introText = t('intro');
    const linkText = 'Círculo de Artes Plásticas de Coimbra';
    const parts = introText.split(linkText);
    
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <a 
            href="https://capcoimbra.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#DE0F19] hover:underline"
          >
            {linkText}
          </a>
          {parts[1]}
        </>
      );
    }
    
    return introText;
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {t('title')}
        </h2>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            {renderIntroWithLink()}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('missionText')}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('historyText')}
          </p>
        </div>
      </div>
    </section>
  );
}

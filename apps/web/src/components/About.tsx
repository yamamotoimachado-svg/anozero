"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          {t('title')}
        </h2>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            {t('intro')}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('missionText')}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('historyText')}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('visionText')}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function AmigoAnozero() {
  const t = useTranslations('amigoAnozero');
  
  const tiers = [
    { name: t('tiers.mecenas'), amount: '≥ 10 000 €' },
    { name: t('tiers.patrono'), amount: '5000 €' },
    { name: t('tiers.solidario'), amount: '2000 €' },
    { name: t('tiers.benfeitor'), amount: '1000 €' },
    { name: t('tiers.protetor'), amount: '200 €' },
    { name: t('tiers.camarada'), amount: '50 €' },
  ];

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
            {t('support')}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('impact')}
          </p>
          
          <p className="text-lg leading-relaxed">
            {t('benefits')}
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('tiersTitle')}
            </h3>
            <div className="space-y-4">
              {tiers.map((tier, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                >
                  <span className="font-semibold text-gray-900">{tier.name}</span>
                  <span className="text-gray-700">{tier.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSe6S-35UeTdY-Q5PutM9h5JNMptJzIhEPFEM97Cy_G0eG2EwA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 hover:bg-[#DE0F19] text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
            >
              {t('becomeAFriend')}
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('taxBenefitsTitle')}
            </h3>
            <p className="text-base leading-relaxed mb-4">
              {t('taxBenefitsText')}
            </p>
            <p className="text-base leading-relaxed">
              {t('contactText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

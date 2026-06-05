import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useAnimalData() {
  const animal_data = [
    { label: 'Cattle', value: 'Cattle' },
    { label: 'Buffalo', value: 'Buffalo' }
  ];

  const weight_data = {
    Cattle: [
      { label: '350', value: 350 },
      { label: '400', value: 400 },
      { label: '450', value: 450 }
    ],
    Buffalo: [
      { label: '500', value: 500 },
      { label: '600', value: 600 },
    ]
  };

  return { animal_data, weight_data };
}

function useMilkData() {
    const milk_data = [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '15', value: 15 },
        { label: '20', value: 20 },
    ]
      
    return { milk_data };
}
  
function useSeasonData() {
    const season_data = [
      { label: 'Winter', value: 'Winter' },
      { label: 'Summer', value: 'Summer' }
    ];
  
    const feed_data = {
      Summer: [
        { label: 'Sorghum based', value: 'Sorghum based' },
        { label: 'Maize based', value: 'Maize based' },
        { label: 'Maize Silage based', value: 'Maize Silage based' }
      ],
      Winter: [
        { label: 'Alfalfa and wheat straw based', value: 'Alfalfa and wheat straw based' },
        { label: 'Barseem and wheat straw based', value: 'Barseem and wheat straw based' },
        { label: 'Maize Silage based', value: 'Maize Silage based' }
      ]
    };
  
    return { season_data, feed_data };
}

export {useAnimalData, useMilkData, useSeasonData};


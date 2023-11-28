function useLifeStageData() {
    const breed_data = [
        { label: 'Local Breed', value: 'local' },
        { label: 'Imported Breed', value: 'imported' }
      ];
      
      const weight_data = {
        before_weaning: {
          local: [
            { label: '20', value: 20 },
            { label: '25', value: 25 },
            { label: '30', value: 30 }
          ],
          imported: [
            { label: '40', value: 40 },
            { label: '50', value: 50 },
            { label: '60', value: 60 },
            { label: '70', value: 70 },
            { label: '80', value: 80 }
          ]
        },
        after_weaning: {
          local: [
            { label: '40', value: 40 },
            { label: '60', value: 60 },
            { label: '80', value: 80 },
            { label: '100', value: 100 },
            { label: '130', value: 130 },
            { label: '160', value: 160 },
            { label: '190', value: 190 }
          ],
          imported: [
            { label: '100', value: 100 },
            { label: '150', value: 150 },
            { label: '200', value: 200 },
            { label: '250', value: 250 },
            { label: '300', value: 300 },
            { label: '350', value: 350 },
            { label: '400', value: 400 },
            { label: '450', value: 450 },
            { label: '500', value: 500 },
            { label: '550', value: 550 },
            { label: '600', value: 600 }
          ]
        },
        faroff_dry: {
          local: [
            { label: '400', value: 400 },
            { label: '450', value: 450 },
            { label: '500', value: 500 }
          ],
          imported: [
            { label: '600', value: 600 },
            { label: '650', value: 650 },
            { label: '700', value: 700 },
            { label: '750', value: 750 }
          ]
        },
        closeup_dry: {
          local: [
            { label: '400', value: 400 },
            { label: '450', value: 450 },
            { label: '500', value: 500 }
          ],
          imported: [
            { label: '600', value: 600 },
            { label: '650', value: 650 },
            { label: '700', value: 700 },
            { label: '750', value: 750 }
          ]
        },
        milking: {
          local: [
            { label: '350', value: 350 },
            { label: '400', value: 400 },
            { label: '450', value: 450 },
          ],
          imported: [
            { label: '600', value: 600 },
            { label: '650', value: 650 },
            { label: '700', value: 700 },
            { label: '750', value: 750 }
          ]
        }
      };
      
      const formula_type = [
        { label: 'Maize fodder based', value: 'maize' },
        { label: 'Sorghum fodder based', value: 'sorghum' },
        { label: 'Barseem fodder based', value: 'barseem' },
        { label: 'Alfalfa fodder based', value: 'alfalfa' },
        { label: 'Corn silage based', value: 'corn' },
      ];

  return { breed_data, weight_data, formula_type };
}

export default useLifeStageData;

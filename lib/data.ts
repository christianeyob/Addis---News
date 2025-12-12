const exchangeRates = [
    {
      bank: 'Bank A',
      rates: [
        
        {
            currency: 'USD',
            currencyName: 'US DOLLAR',
            cashBuying: '112.3957',
            cashSelling: '123.6353',
            transactionalBuying: '112.3957',
            transactionalSelling: '123.6353'
          },
          {
            currency: 'GBP',
            currencyName: 'POUND STERLING',
            cashBuying: '141.6314',
            cashSelling: '156.4653',
            transactionalBuying: '148.3398',
            transactionalSelling: '163.1738'
          },
          {
            currency: 'EUR',
            currencyName: 'EURO',
            cashBuying: '125.0177',
            cashSelling: '137.5195',
            transactionalBuying: '125.0177',
            transactionalSelling: '137.5195'
          },
          {
            currency: 'CHF',
            currencyName: 'SWISS FRANK',
            cashBuying: '127.1776',
            cashSelling: '140.4946',
            transactionalBuying: '133.1703',
            transactionalSelling: '146.4873'
          },
          {
            currency: 'SEK',
            currencyName: 'SWEDISH KRONER',
            cashBuying: '10.5292',
            cashSelling: '11.6335',
            transactionalBuying: '11.0428',
            transactionalSelling: '12.1471'
          },
          {
            currency: 'NOK',
            currencyName: 'NORWEGIAN KRONER',
            cashBuying: '9.9072',
            cashSelling: '10.9685',
            transactionalBuying: '10.613',
            transactionalSelling: '11.6743'
          },
          {
            currency: 'DKK',
            currencyName: 'DANISH KRONER',
            cashBuying: '15.6406',
            cashSelling: '17.316',
            transactionalBuying: '16.7545',
            transactionalSelling: '18.4299'
          },
          {
            currency: 'DJF',
            currencyName: 'DJIBOUTI FRANC',
            cashBuying: '0',
            cashSelling: '0',
            transactionalBuying: '0.6329',
            transactionalSelling: '0.6961'
          },
          {
            currency: 'JPY',
            currencyName: 'JAPANIS YEN',
            cashBuying: '0.746',
            cashSelling: '0.8259',
            transactionalBuying: '0.799',
            transactionalSelling: '0.8789'
          },
          {
            currency: 'CAD',
            currencyName: 'CANADIAN DOLLAR',
            cashBuying: '77.1822',
            cashSelling: '85.4502',
            transactionalBuying: '82.6804',
            transactionalSelling: '90.9484'
          },
          {
            currency: 'SAR',
            currencyName: 'SAUDI RIYAL',
            cashBuying: '29.9482',
            cashSelling: '32.9431',
            transactionalBuying: '29.9482',
            transactionalSelling: '32.9431'
          },
          {
            currency: 'AED',
            currencyName: 'UAE DIRHAM',
            cashBuying: '30.603',
            cashSelling: '33.6633',
            transactionalBuying: '30.603',
            transactionalSelling: '33.6633'
          },
          {
            currency: 'INR',
            currencyName: 'INDIAN RUPEE',
            cashBuying: '0',
            cashSelling: '0',
            transactionalBuying: '1.3407',
            transactionalSelling: '1.4747'
          },
          {
            currency: 'KES',
            currencyName: 'KENNYAN SHILLING',
            cashBuying: '0',
            cashSelling: '0',
            transactionalBuying: '0.8747',
            transactionalSelling: '0.9621'
          },
          {
            currency: 'AUD',
            currencyName: 'AUSTRALIAN DOLLAR',
            cashBuying: '70.7379',
            cashSelling: '78.3156',
            transactionalBuying: '75.7772',
            transactionalSelling: '83.3549'
          },
          {
            currency: 'ZAR',
            currencyName: 'SOUTH AFRICAN RAND',
            cashBuying: '0',
            cashSelling: '0',
            transactionalBuying: '6.374',
            transactionalSelling: '7.0113'
          },
          {
            currency: 'CNY',
            currencyName: 'CHINESE YUAN',
            cashBuying: '14.7922',
            cashSelling: '16.3768',
            transactionalBuying: '15.846',
            transactionalSelling: '17.4306'
          },
          {
            currency: 'KWD',
            currencyName: 'KUWAITI DINAR',
            cashBuying: '352.1354',
            cashSelling: '389.0082',
            transactionalBuying: '368.7281',
            transactionalSelling: '405.6009'
          }
        // ... other currencies
      ],
    },
    {
      bank: 'Bank B',
      rates: [
        {
            currency: 'USD',
            currencyName: 'US Dollar',
            cashBuying: '111.4816',
            cashSelling: '125.8886',
            transactionalBuying: '112.4005',
            transactionalSelling: '125.8886'
          },
          {
            currency: 'EUR',
            currencyName: 'Euro',
            cashBuying: '123.9777',
            cashSelling: '136.5008',
            transactionalBuying: '123.9777',
            transactionalSelling: '136.5011'
          },
          {
            currency: 'GBP',
            currencyName: 'Pound Sterling',
            cashBuying: '144.6929',
            cashSelling: '154.7637',
            transactionalBuying: '144.6929',
            transactionalSelling: '162.0561'
          },
          {
            currency: 'CHF',
            currencyName: 'Swiss Franc',
            cashBuying: '127.9601',
            cashSelling: '136.8664',
            transactionalBuying: '127.9601',
            transactionalSelling: '143.3153'
          },
          {
            currency: 'SAR',
            currencyName: 'Saudi Riyal',
            cashBuying: '29.9606',
            cashSelling: '30.3682',
            transactionalBuying: '29.9606',
            transactionalSelling: '33.5559'
          },
          {
            currency: 'AED',
            currencyName: 'Arab Emirates Dirham',
            cashBuying: '30.6012',
            cashSelling: '31.0175',
            transactionalBuying: '30.6012',
            transactionalSelling: '34.2734'
          },
          {
            currency: 'CAD',
            currencyName: 'Canadian Dollar',
            cashBuying: '81.2261',
            cashSelling: '82.3306',
            transactionalBuying: '81.2261',
            transactionalSelling: '90.9732'
          }
        // ... other currencies
      ],
    },
    // ... other banks
  ];

  export default exchangeRates
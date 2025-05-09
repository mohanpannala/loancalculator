import { useState, useEffect } from 'react';
import axios from 'axios';

const useExchangeRates = (baseCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/4d7402eb3e5d6ae8138a6592/latest/${baseCurrency}`);
        setRates(response.data.conversion_rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  return { rates, loading };
};

export default useExchangeRates;

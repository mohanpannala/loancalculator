import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrencyConverter = (amount, baseCurrency = 'INR') => {
  const [convertedAmounts, setConvertedAmounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!amount) return;

    const fetchRates = async () => {
        setLoading(true);
        setError(false);
        try {
          const res = await axios.get(`https://v6.exchangerate-api.com/v6/4d7402eb3e5d6ae8138a6592/latest/${baseCurrency}`);
          const data = res.data;
          if (data.result !== 'success') throw new Error('Failed to fetch exchange rates');
          const conversions = Object.entries(data.conversion_rates).map(([currency, rate]) => ({
            currency,
            converted: (amount * rate).toFixed(2),
          }));
          
          setConvertedAmounts(conversions);
        } catch (err) {
          setError(true);
          console.error('Currency conversion error:', err.message);
        } finally {
          setLoading(false);
        }
      };
      

    fetchRates();
  }, [amount, baseCurrency]);

  return { convertedAmounts, loading, error };
};

export default useCurrencyConverter;

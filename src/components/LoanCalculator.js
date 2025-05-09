import React, { useState, useEffect, useContext } from 'react';
import AmortizationTable from './AmortizationTable';
import useCurrencyConverter from '../hooks/useCurrencyConverter';
import { ColorModeContext } from '../contexts/ColorModeContext'; // Import the context
import './LoanCalculator.css';

const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

const LoanCalculator = () => {
  const { mode } = useContext(ColorModeContext); // Get the mode from the context
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('8.5');
  const [months, setMonths] = useState(60);
  const [currency, setCurrency] = useState('USD');
  const [emiUSD, setEmiUSD] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [convertedEMI, setConvertedEMI] = useState(null);

  const baseCurrency = 'USD';
  const { convertedAmounts, loading, error } = useCurrencyConverter(emiUSD, baseCurrency);

  const calculateEMIAndSchedule = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseInt(months);
    if (!p || !r || !n) return;

    const calculatedEMI = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiUSD(parseFloat(calculatedEMI.toFixed(2)));

    const rows = [];
    let balance = p;
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = calculatedEMI - interest;
      balance -= principal;
      rows.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setSchedule(rows);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAmount('100000');
    setRate('8.5');
    setMonths(60);
    setCurrency('USD');
    setEmiUSD(null);
    setSchedule([]);
    setSubmitted(false);
    setConvertedEMI(null);
  };

  useEffect(() => {
    if (!convertedAmounts.length) return;
    const rateObj = convertedAmounts.find(item => item.currency === currency)?.converted;
    if (rateObj && emiUSD) {
      setConvertedEMI(parseFloat(rateObj).toFixed(2));
    }
  }, [convertedAmounts, currency, emiUSD]);

  return (
    <div className={`loan-container ${mode === 'dark' ? 'dark' : ''}`}>
      <h2 className="title">Loan Calculator Dashboard</h2>

      <div className="form-row">
        <div className="input-group">
          <label>Loan Amount</label>
          <input
            type="number"
            placeholder="Loan Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Term (Years)</label>
          <input
            type="number"
            placeholder="Term (Years)"
            value={months / 12}
            onChange={(e) => setMonths(e.target.value * 12)}
          />
        </div>
        <button className="calculate-btn" onClick={calculateEMIAndSchedule}>CALCULATE</button>
      </div>

      {emiUSD !== null && (
        <div className="result-box">
          <div className="emi-section">
            <span>Monthly EMI (USD): ${emiUSD}</span>
            <button className="reset-btn" onClick={handleReset}>Reset Table</button>
          </div>

          <select
            className="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map(cur => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>

          {loading && <p>Loading currency conversion...</p>}
          {error && <p className="error-text">Error fetching exchange rates</p>}
          {convertedEMI && (
            <p>Converted EMI: {convertedEMI} {currency}</p>
          )}
        </div>
      )}

      {submitted && (
        <AmortizationTable
          schedule={schedule}
          conversionRate={
            currency === 'USD'
              ? 1
              : (() => {
                const convertedObj = convertedAmounts.find(c => c.currency === currency);
                return convertedObj && emiUSD
                  ? parseFloat(convertedObj.converted) / emiUSD
                  : 1;
              })()
          }
          currency={currency}
        />
      )}
    </div>
  );
};

export default LoanCalculator;

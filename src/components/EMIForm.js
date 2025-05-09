import React, { useState } from 'react';
import './EMIForm.css';

const EMIForm = ({ onCalculate }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (principal && rate && months) {
      onCalculate(Number(principal), Number(rate), Number(months));
    }
  };

  return (
    <form className="emi-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="principal">Loan Amount</label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rate">Interest Rate (%)</label>
        <input
          type="number"
          id="rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="term">Term (Years)</label>
        <input
          type="number"
          id="term"
          onChange={(e) => setMonths(e.target.value * 12)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">CALCULATE</button>
    </form>
  );
};

export default EMIForm;

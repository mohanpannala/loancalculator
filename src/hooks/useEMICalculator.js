import { useState } from 'react';

const useEMICalculator = () => {
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (principal, annualRate, duration) => {
    const monthlyRate = annualRate / 12 / 100;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
    setEmi(emiValue.toFixed(2));

    const amortization = [];
    let balance = principal;
    for (let i = 1; i <= duration; i++) {
      const interest = balance * monthlyRate;
      const principalPayment = emiValue - interest;
      balance -= principalPayment;
      amortization.push({
        month: i,
        principal: principalPayment.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setSchedule(amortization);
  };

  return { emi, schedule, calculateEMI };
};

export default useEMICalculator;

import React from 'react';
import './AmortizationTable.css';

const AmortizationTable = ({ schedule, conversionRate, currency }) => (
  <div className="amortization-box">
    <h2 className="amortization-title">
      Amortization Schedule ({currency})
    </h2>
    <div className="table-container">
      <table className="amortization-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{(parseFloat(row.principal) * conversionRate).toFixed(2)} {currency}</td>
              <td>{(parseFloat(row.interest) * conversionRate).toFixed(2)} {currency}</td>
              <td>{(parseFloat(row.balance) * conversionRate).toFixed(2)} {currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AmortizationTable;


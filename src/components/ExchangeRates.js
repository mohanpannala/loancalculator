import React, { useEffect, useState } from 'react';
import './ExchangeRates.css';

const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/usd')
      .then((res) => res.json())
      .then((data) => {
        const sortedRates = Object.entries(data.rates).sort(([a], [b]) => a.localeCompare(b));
        setRates(sortedRates);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <div className="exchange-container">
      <h2 className="exchange-title">Live Exchange Rates (Base: USD)</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="exchange-table-wrapper">
          <table className="exchange-table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {rates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(([currency, rate]) => (
                  <tr key={currency}>
                    <td>{currency}</td>
                    <td>{rate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
            >
              Prev
            </button>
            <span>Page {page + 1}</span>
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={(page + 1) * rowsPerPage >= rates.length}
            >
              Next
            </button>
            <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeRates;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeProvider } from './contexts/ColorModeContext'; // updated context using plain CSS
import ExchangeRates from './components/ExchangeRates';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import LoanCalculator from './components/LoanCalculator';
import About from './components/About';
import ErrorPage from './pages/ErrorPage';
import './App.css';

const App = () => (
  <ColorModeProvider>
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoanCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="/errorpage" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </ColorModeProvider>
);

export default App;

// src/components/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2 className="error-heading">Something went wrong in the application.</h2>
      <Link to="/" className="error-button">
        Go To Home
      </Link>
    </div>
  );
};

export default ErrorPage;

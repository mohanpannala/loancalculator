import React, { createContext, useState } from 'react';
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ currency, setCurrency, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};


import React, { useContext } from 'react';
import { ColorModeContext } from '../contexts/ColorModeContext';
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <button className="theme-toggle-btn" onClick={toggleColorMode}>
      {mode === 'dark' ? <CiLight /> :<MdLightMode />}
    </button>
  );
};

export default ThemeToggle;

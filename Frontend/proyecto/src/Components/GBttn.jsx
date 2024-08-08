import React from 'react';
import './GBttn.css';
import { FaGoogle } from 'react-icons/fa';

function GBttn() {
  return (
    <button className="g-button">
      <FaGoogle className="g-icon" />
      Connect with Google
    </button>
  );
}

export default GBttn;
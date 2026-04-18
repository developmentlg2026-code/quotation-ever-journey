// components/Step3Content.js
"use client";

import React from 'react';
import { Box } from '@mui/material';
import Calculator from './Calculator';
import PlansDisplay from './PlansDisplay';

const Step3Content = ({ onBuy, onBack }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Calculator onBack={onBack} />
      <PlansDisplay onBuy={onBuy} />
    </Box>
  );
};

export default Step3Content;
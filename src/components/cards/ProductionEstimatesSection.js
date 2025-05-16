// src/components/ProductionEstimatesSection.jsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ProductionEstimateCard } from './ProductionEstimateCard';

const initialEstimates = {
    1: {
      'Tablets (000 units)': 25,
      'Capsules (000 units)': 5,
      'Liquid (litre)': 0.1,
      'Ointment (000 kg)': 0.01,
    },
  };
  
  export default function ProductionEstimatesSection() {
    return (
      <Box sx={{ p: 3 }}>
        <ProductionEstimateCard initialEstimates={initialEstimates} />
      </Box>
    );
  }
  

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CustomNumericField from '../CustomNumericField';

/**
 * IRRNPVParametersCard
 * Captures IRR / NPV calculation settings from the model:
 * - Initial Investment ($)
 * - Discount Rate (%)
 * - Cash Flow Horizon (years)
 * - Revenue Growth Range (%)
 * Based on INPUT: IRR / NPV Calculation Parameters citeturn24file0
 *
 * Props:
 * - inputs: { [field: string]: number }
 * - onUpdateField(field: string, value: number)
 */
export default function IRRNPVParametersCard({ inputs, onUpdateField }) {
  const handleChange = (field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    onUpdateField(field, isNaN(val) ? 0 : val);
  };

  const row = (leftField, rightField, leftStep = 1, rightStep = 1) => (
    <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
      <Box width="48%">
        <CustomNumericField
          label={leftField}
          value={inputs[leftField]}
          onChange={handleChange(leftField)}
          step={leftStep}
        />
      </Box>
      <Box width="48%">
        <CustomNumericField
          label={rightField}
          value={inputs[rightField]}
          onChange={handleChange(rightField)}
          step={rightStep}
        />
      </Box>
    </Box>
  );

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          IRR / NPV Calculation Parameters
        </Typography>
        {row('Initial Investment ($)', 'Discount Rate (%)', 10000, 0.01)}
        {row('Cash Flow Horizon (years)', 'Revenue Growth Range (%)', 1, 0.1)}
      </CardContent>
    </Card>
  );
}

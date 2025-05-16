import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';

// Products and their freight & warehousing cost keys
const products = [
  { key: 'Tablets', label: 'Tablets' },
  { key: 'Capsules', label: 'Capsules' },
  { key: 'Liquid', label: 'Liquid' },
  { key: 'Ointment', label: 'Ointment' },
];

/**
 * Props:
 * - inputs: { [field: string]: number }
 *    e.g. 'Tablets Freight': 0.02, ..., 'Sales Commission (%)': 7
 * - onUpdateField(field: string, value: number)
 */
export default function FreightWarehousingCommissionCard({ inputs, onUpdateField }) {
  if (!inputs) return null;

  const handleChange = (field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    onUpdateField(field, isNaN(val) ? 0 : val);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          Freight, Warehousing & Sales Commission
        </Typography>

        {/* Freight & Warehousing costs per product */}
        {products.map(({ key, label }) => (
          <Box key={key} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>{label}</Typography>
            <CustomNumericField
              label="$ / unit"
              value={inputs[`${key} Freight`] ?? 0}
              onChange={handleChange(`${key} Freight`)}
              step={0.001}
            />
          </Box>
        ))}

        {/* Sales commission percent */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Sales Commission (%)</Typography>
          <CustomNumericField
            label="%"
            value={inputs['Sales Commission (%)'] ?? 0}
            onChange={handleChange('Sales Commission (%)')}
            step={0.1}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

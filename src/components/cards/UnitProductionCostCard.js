import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';

/**
 * UnitProductionCostCard
 * Props:
 * - inputs: { [field: string]: number }
 * - onUpdateField(field: string, value: number)
 *
 * Fields from INPUT: Unit Production Cost and Pricing:
 * - 'Tablet - Production Cost'
 * - 'Tablet - Selling Price'
 * - 'Capsule - Production Cost'
 * - 'Capsule - Selling Price'
 * - 'Liquid - Production Cost'
 * - 'Liquid - Selling Price'
 * - 'Ointment - Production Cost'
 * - 'Ointment - Selling Price'
 *
 * Example values: $0.03, $0.047, $0.05, $0.080, $1.50, $2.48, $3.00, $4.80 citeturn19file0
 */
export function UnitProductionCostCard({ inputs, onUpdateField }) {
    const handleChange = (field) => (valOrEvent) => {
      const val = typeof valOrEvent === 'number'
        ? valOrEvent
        : parseFloat(valOrEvent.target.value);
      onUpdateField(field, isNaN(val) ? 0 : val);
    };
  
    const row = (costField, priceField) => (
      <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
        <Box width="48%">
          <CustomNumericField
            label={costField}
            value={inputs[costField]}
            onChange={handleChange(costField)}
            step={0.001}
          />
        </Box>
        <Box width="48%">
          <CustomNumericField
            label={priceField}
            value={inputs[priceField]}
            onChange={handleChange(priceField)}
            step={0.001}
          />
        </Box>
      </Box>
    );
  
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ px: 3, py: 2 }}>
          <Typography variant="h6" gutterBottom>
            Unit Production Cost & Pricing
          </Typography>
          {row('Tablet - Production Cost', 'Tablet - Selling Price')}
          {row('Capsule - Production Cost', 'Capsule - Selling Price')}
          {row('Liquid - Production Cost', 'Liquid - Selling Price')}
          {row('Ointment - Production Cost', 'Ointment - Selling Price')}
        </CardContent>
      </Card>
    );
  }
  export default UnitProductionCostCard;
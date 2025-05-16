import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';

// Capacity parameters from INPUT: Production Capacity – Longevity Pharmaceuticals Swaziland
const capacityFields = [
  { key: 'Tablet Production Capacity', label: 'Tablet Capacity (MM units/yr)' },
  { key: 'Capsule Production Capacity', label: 'Capsule Capacity (MM units/yr)' },
  { key: 'Liquid Production Capacity', label: 'Liquid Capacity (MM litres/yr)' },
  { key: 'Ointment Production Capacity', label: 'Ointment Capacity (MM kg/yr)' },
];

/**
 * Props:
 * - inputs: {
 *     'Tablet Production Capacity': number,
 *     'Capsule Production Capacity': number,
 *     'Liquid Production Capacity': number,
 *     'Ointment Production Capacity': number,
 *   }
 * - onUpdateField(field: string, value: number)
 */
export default function ProductionCapacityCard({ inputs, onUpdateField }) {
  if (!inputs) return null;

  const handleChange = (field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    onUpdateField(field, isNaN(val) ? 0 : val);
  };

  // Split into two columns
  const left = capacityFields.slice(0, 2);
  const right = capacityFields.slice(2);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          Production Capacity
        </Typography>
        <Box display="flex" justifyContent="space-between" gap={4}>
          {/* Left Column */}
          <Box flex={1}>
            {left.map(({ key, label }) => (
              <Box key={key} mb={2}>
                <CustomNumericField
                  label={label}
                  value={inputs[key] ?? 0}
                  onChange={handleChange(key)}
                  step={1}
                />
              </Box>
            ))}
          </Box>
          {/* Right Column */}
          <Box flex={1}>
            {right.map(({ key, label }) => (
              <Box key={key} mb={2}>
                <CustomNumericField
                  label={label}
                  value={inputs[key] ?? 0}
                  onChange={handleChange(key)}
                  step={0.1}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

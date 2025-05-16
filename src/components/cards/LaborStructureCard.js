import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CustomNumericField from '../CustomNumericField';

// Direct and Indirect Labor roles per model inputs
const directRoles = [
  { key: 'Production Manager', label: 'Production Manager (MM $)' },
  { key: 'Production Operators', label: 'Production Operators (MM $)' },
  { key: 'Process Engineer', label: 'Process Engineer (MM $)' },
  { key: 'Process Technician', label: 'Process Technician (MM $)' },
  { key: 'QA Pharmacist', label: 'QA Pharmacist (MM $)' },
  { key: 'Production Pharmacist', label: 'Production Pharmacist (MM $)' },
  { key: 'Manufacturing Chemist', label: 'Manufacturing Chemist (MM $)' },
  { key: 'Analytical Chemist', label: 'Analytical Chemist (MM $)' },
];

const indirectRoles = [
  { key: 'General Manager', label: 'General Manager (MM $)' },
  { key: 'Sales & Marketing Manager', label: 'Sales & Marketing Manager (MM $)' },
  { key: 'Accountant', label: 'Accountant (MM $)' },
  { key: 'Procurement Officer', label: 'Procurement Officer (MM $)' },
  { key: 'Support Staff', label: 'Support Staff (MM $)' },
  { key: 'Packers', label: 'Packers (MM $)' },
  { key: 'Secretary', label: 'Secretary (MM $)' },
  { key: 'Security', label: 'Security (MM $)' },
  { key: 'Cleaner', label: 'Cleaner (MM $)' },
  { key: 'Movers', label: 'Movers (MM $)' },
  { key: 'Canteen Staff', label: 'Canteen Staff (MM $)' },
  { key: 'Driver', label: 'Driver (MM $)' },
];

/**
 * Props:
 * - inputs: { [key: string]: number }
 * - onUpdateField(field: string, value: number)
 */
export default function LaborStructureCard({ inputs, onUpdateField }) {
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
          Labor Structure
        </Typography>
        <Box display="flex" gap={4}>
          {/* Direct Labor */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Direct Labor
            </Typography>
            {directRoles.map(({ key, label }) => (
              <Box key={key} mb={2}>
                <CustomNumericField
                  label={label}
                  value={inputs[key] ?? 0}
                  onChange={handleChange(key)}
                  step={0.001}
                />
              </Box>
            ))}
          </Box>

          {/* Indirect Labor */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Indirect Labor
            </Typography>
            {indirectRoles.map(({ key, label }) => (
              <Box key={key} mb={2}>
                <CustomNumericField
                  label={label}
                  value={inputs[key] ?? 0}
                  onChange={handleChange(key)}
                  step={0.001}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

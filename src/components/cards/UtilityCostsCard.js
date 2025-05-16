import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';

/**
 * Props:
 * - inputs: { [key: string]: number }
 * - onUpdateField(field: string, value: number)
 */
export default function UtilityCostsCard({ inputs, onUpdateField }) {
  const [years, setYears] = useState([1]);

  const addYear = () => {
    setYears(prev => [...prev, prev[prev.length - 1] + 1]);
  };

  const handleChange = (field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    onUpdateField(field, isNaN(val) ? 0 : val);
  };

  // Utility fields
  const utilities = [
    { keyUsage: 'Electricity Usage', labelUsage: 'Electricity Usage (kWh/day)', keyRate: 'Electricity Rate', labelRate: 'Rate ($/kWh)' },
    { keyUsage: 'Water Usage', labelUsage: 'Water Usage (m³/day)', keyRate: 'Water Rate', labelRate: 'Rate ($/m³)' },
    { keyUsage: 'Steam Usage', labelUsage: 'Steam Usage (ton/hr)', keyRate: 'Steam Rate', labelRate: 'Rate ($/ton)' },
  ];

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          Utility Costs and Assumptions
        </Typography>
        <Box display="flex" justifyContent="space-between" gap={4}>
          {/* Left Column: Utility Usage & Rates */}
          <Box flex={1}>
            {utilities.map(({ keyUsage, labelUsage, keyRate, labelRate }) => (
              <Box key={keyUsage} mb={2}>
                <CustomNumericField
                  label={labelUsage}
                  value={inputs[keyUsage] ?? 0}
                  onChange={handleChange(keyUsage)}
                  step={1}
                />
                <CustomNumericField
                  label={labelRate}
                  value={inputs[keyRate] ?? 0}
                  onChange={handleChange(keyRate)}
                  step={0.01}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Box>

          {/* Right Column: Dynamic Operating Schedule */}
          <Box flex={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Operating Schedule</Typography>
              <Button size="small" variant="outlined" onClick={addYear}>
                Add Year
              </Button>
            </Box>
            {years.map((year) => (
              <Box key={year} display="flex" gap={2} mb={2}>
                <CustomNumericField
                  label={`Year ${year} Days`}
                  value={inputs[`Year ${year} Days`] ?? 0}
                  onChange={handleChange(`Year ${year} Days`)}
                  step={1}
                />
                <CustomNumericField
                  label={`Year ${year} Hours/day`}
                  value={inputs[`Year ${year} Hours/day`] ?? inputs[`Year ${year} Hours`] ?? 0}
                  onChange={handleChange(`Year ${year} Hours`)}
                  step={1}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
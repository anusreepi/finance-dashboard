// src/components/DepreciationScheduleCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';

const assets = [
  'Land',
  'GMP Facility Shell (3000 sqm)',
  'Equipment & Installation',
  'Office Equipment',
  'Accounting & Other Software',
  'Vehicle',
];

const DepreciationScheduleCard = ({ yearData, onUpdateField }) => {
  if (!yearData) return null;

  const handleUpdate = (field) => (value) => {
    onUpdateField(field, isNaN(value) ? 0 : value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          Depreciation Schedule
        </Typography>

        {/* Header */}
        <Box display="flex" alignItems="center" fontWeight="bold" mb={1}>
          <Box flex={3}>Asset</Box>
          <Box flex={1}>Depreciation Value ($)</Box>
          <Box flex={1}>Useful Life (Years)</Box>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Rows */}
        {assets.map((asset) => (
          <Box
            key={asset}
            display="flex"
            alignItems="center"
            mb={2}
            sx={{ '&:last-of-type': { mb: 0 } }}
          >
            <Box flex={3}>
              <Typography>{asset}</Typography>
            </Box>
            <Box flex={1} mr={2}>
              <CustomNumericField
                label=""
                value={yearData[`${asset} Value`] ?? 0}
                onChange={handleUpdate(`${asset} Value`)}
                step={1000}
              />
            </Box>
            <Box flex={1}>
              <CustomNumericField
                label=""
                value={yearData[`${asset} Life`] ?? 0}
                onChange={handleUpdate(`${asset} Life`)}
                step={1}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default DepreciationScheduleCard;

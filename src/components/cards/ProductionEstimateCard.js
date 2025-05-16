import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';
import DeleteIcon from '@mui/icons-material/Delete';

// Default estimate shape for one year
const defaultEstimate = {
  'Tablets (000 units)': 0,
  'Capsules (000 units)': 0,
  'Liquid (litre)': 0,
  'Ointment (000 kg)': 0,
};

/**
 * ProductionEstimateCard
 * Manages multiple years of production estimates within a single card.
 * Props:
 * - initialEstimates (optional): { [year: number]: { [field: string]: number } }
 * - onChangeEstimates (optional): (updatedEstimates) => void
 */
export function ProductionEstimateCard({ initialEstimates = { 1: defaultEstimate }, onChangeEstimates }) {
  const [estimates, setEstimates] = useState(() =>
    Object.keys(initialEstimates).reduce((acc, y) => {
      acc[y] = { ...defaultEstimate, ...initialEstimates[y] };
      return acc;
    }, {})
  );
  const [years, setYears] = useState(() =>
    Object.keys(estimates).map(Number).sort()
  );

  const addYear = () => {
    const next = Math.max(...years) + 1;
    setYears(prev => [...prev, next]);
    setEstimates(prev => {
      const updated = { ...prev, [next]: { ...defaultEstimate } };
      if (onChangeEstimates) onChangeEstimates(updated);
      return updated;
    });
  };

  const removeYear = (yearToRemove) => {
    if (years.length === 1) return;
    setYears(prev => prev.filter(y => y !== yearToRemove));
    setEstimates(prev => {
      const { [yearToRemove]: _, ...rest } = prev;
      if (onChangeEstimates) onChangeEstimates(rest);
      return rest;
    });
  };

  const handleUpdate = (year, field) => (val) => {
    setEstimates(prev => {
      const updated = {
        ...prev,
        [year]: { ...prev[year], [field]: val },
      };
      if (onChangeEstimates) onChangeEstimates(updated);
      return updated;
    });
  };

  const renderYearRow = (year) => (
    <Box key={year} mb={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">Year {year}</Typography>
        <IconButton
          size="small"
          onClick={() => removeYear(year)}
          disabled={years.length === 1}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
        <Box width="48%">
          <CustomNumericField
            label="Tablets (000 units)"
            value={estimates[year]['Tablets (000 units)']}
            onChange={handleUpdate(year, 'Tablets (000 units)')}
            step={1}
          />
        </Box>
        <Box width="48%">
          <CustomNumericField
            label="Capsules (000 units)"
            value={estimates[year]['Capsules (000 units)']}
            onChange={handleUpdate(year, 'Capsules (000 units)')}
            step={1}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Box width="48%">
          <CustomNumericField
            label="Liquid (litre)"
            value={estimates[year]['Liquid (litre)']}
            onChange={handleUpdate(year, 'Liquid (litre)')}
            step={0.01}
          />
        </Box>
        <Box width="48%">
          <CustomNumericField
            label="Ointment (000 kg)"
            value={estimates[year]['Ointment (000 kg)']}
            onChange={handleUpdate(year, 'Ointment (000 kg)')}
            step={0.001}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Production Estimate</Typography>
          <Button size="small" variant="outlined" onClick={addYear}>
            Add Year
          </Button>
        </Box>
        {years.map(renderYearRow)}
      </CardContent>
    </Card>
  );
}
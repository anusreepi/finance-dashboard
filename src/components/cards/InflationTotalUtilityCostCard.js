import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomNumericField from '../CustomNumericField';

/**
 * InflationTotalUtilityCostCard
 * Dynamic row-based input for manual Year & Inflation Rate entries.
 * Props:
 * - initialRows: Array<{ year: number | '', rate: number | '' }>
 * - onChange(updatedRows): void
 */
export default function InflationTotalUtilityCostCard({
  initialRows = [{ year: '', rate: '' }],
  onChange,
}) {
  const [rows, setRows] = useState(initialRows);

  const addRow = () => {
    const updated = [...rows, { year: '', rate: '' }];
    setRows(updated);
    onChange?.(updated);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    onChange?.(updated);
  };

  const handleRowChange = (index, field) => (valOrEvent) => {
    const raw = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    const value = field === 'year'
      ? (isNaN(raw) ? '' : Math.floor(raw))
      : (isNaN(raw) ? '' : raw);
    const updated = rows.map((r, i) =>
      i === index ? { ...r, [field]: value } : r
    );
    setRows(updated);
    onChange?.(updated);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Inflation Rates by Year</Typography>
          <Button size="small" variant="outlined" onClick={addRow}>
            Add Row
          </Button>
        </Box>

        {rows.map((row, idx) => (
          <Box key={idx} mb={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Box width="48%">
                <CustomNumericField
                  label="Year"
                  value={row.year}
                  onChange={handleRowChange(idx, 'year')}
                  step={1}
                />
              </Box>
              <Box width="48%" display="flex" alignItems="center">
                <CustomNumericField
                  label="Inflation Rate (%)"
                  value={row.rate}
                  onChange={handleRowChange(idx, 'rate')}
                  step={0.1}
                />
                <IconButton
                  size="small"
                  onClick={() => removeRow(idx)}
                  disabled={rows.length === 1}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

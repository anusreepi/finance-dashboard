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
 * RawMaterialCostCard
 * Manages Raw Material Cost Estimates rows with dynamic add/remove functionality.
 * Based on INPUT: Raw Material Cost Estimates (Year N Material, Unit Material Cost) citeturn21file2
 */
export default function RawMaterialCostCard({ initialRows = [{ quantity: '', unitCost: '' }], onChange }) {
  const [rows, setRows] = useState(initialRows);

  const addRow = () => {
    setRows(prev => [...prev, { quantity: '', unitCost: '' }]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    setRows(prev => {
      const newRows = [...prev];
      newRows[index] = { ...newRows[index], [field]: isNaN(val) ? '' : val };
      if (onChange) onChange(newRows);
      return newRows;
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Raw Material Cost Estimates</Typography>
          <Button size="small" variant="outlined" onClick={addRow}>
            Add Row
          </Button>
        </Box>
        {rows.map((row, idx) => (
          <Box key={idx} mb={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">Year {idx + 1} Material</Typography>
              <IconButton
                size="small"
                onClick={() => removeRow(idx)}
                disabled={rows.length === 1}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box display="flex" gap={2}>
              <CustomNumericField
                label="Quantity (kg)"
                value={row.quantity}
                onChange={handleFieldChange(idx, 'quantity')}
                step={1000}
              />
              <CustomNumericField
                label="Unit Cost ($/kg)"
                value={row.unitCost}
                onChange={handleFieldChange(idx, 'unitCost')}
                step={0.01}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

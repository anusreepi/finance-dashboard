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
 * ChangeInDebtEquityCard
 * Dynamic row-based input for Change in Debt & Equity per year.
 * Fields per row:
 *  - Year
 *  - Senior Debt Issuance/(Repayment) ($MM)
 *  - Common Stock Issuance/(Buy-Back) ($MM)
 * Props:
 *  - initialRows: Array<{ year: number|string; debt: number|string; equity: number|string }>
 *  - onChange(updatedRows): void
 */
export default function ChangeInDebtEquityCard({
  initialRows = [{ year: '', debt: '', equity: '' }],
  onChange,
}) {
  const [rows, setRows] = useState(initialRows);

  const addRow = () => {
    setRows(prev => {
      const updated = [...prev, { year: '', debt: '', equity: '' }];
      onChange?.(updated);
      return updated;
    });
  };

  const removeRow = index => {
    if (rows.length === 1) return;
    setRows(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onChange?.(updated);
      return updated;
    });
  };

  const handleFieldChange = (index, field) => valOrEvent => {
    const raw = typeof valOrEvent === 'number' ? valOrEvent : parseFloat(valOrEvent.target.value);
    const value = isNaN(raw) ? '' : raw;
    setRows(prev => {
      const updated = prev.map((r, i) => (i === index ? { ...r, [field]: value } : r));
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Change in Debt & Equity</Typography>
          <Button size="small" variant="outlined" onClick={addRow}>
            Add Year
          </Button>
        </Box>
        {rows.map((row, idx) => (
          <Box key={idx} mb={3}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <CustomNumericField
                label="Year"
                value={row.year}
                onChange={handleFieldChange(idx, 'year')}
                step={1}
              />
              <IconButton size="small" onClick={() => removeRow(idx)} disabled={rows.length === 1}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <CustomNumericField
                label="Senior Debt Issuance/(Repayment) ($MM)"
                value={row.debt}
                onChange={handleFieldChange(idx, 'debt')}
                step={0.1}
              />
              <CustomNumericField
                label="Common Stock Issuance/(Buy‑Back) ($MM)"
                value={row.equity}
                onChange={handleFieldChange(idx, 'equity')}
                step={0.1}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

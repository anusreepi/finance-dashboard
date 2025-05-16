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
 * WorkingCapitalAssumptionsCard
 * Dynamic rows for working capital assumptions per year.
 * Each row captures Days Outstanding for:
 *   - Accounts Receivable
 *   - Inventories
 *   - Prepaid Expenses
 *   - Other Assets
 *   - Accounts Payable
 *   - Other Liabilities
 * Props:
 *  - initialRows: Array<{ year: number | '', arDays: number | '', invDays: number | '', prepaidDays: number | '', otherAssetDays: number | '', apDays: number | '', olDays: number | '' }>
 *  - onChange(updatedRows): void
 */
export default function WorkingCapitalAssumptionsCard({
  initialRows = [
    { year: '', arDays: '', invDays: '', prepaidDays: '', otherAssetDays: '', apDays: '', olDays: '' }
  ],
  onChange,
}) {
  const [rows, setRows] = useState(initialRows);

  const addRow = () => {
    const updated = [...rows, { year: '', arDays: '', invDays: '', prepaidDays: '', otherAssetDays: '', apDays: '', olDays: '' }];
    setRows(updated);
    onChange?.(updated);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    onChange?.(updated);
  };

  const handleFieldChange = (index, field) => (valOrEvent) => {
    const raw = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    const value = isNaN(raw) ? '' : (field === 'year' ? Math.floor(raw) : raw);
    setRows(prev => {
      const updated = prev.map((r, i) => i === index ? { ...r, [field]: value } : r);
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Working Capital Assumptions</Typography>
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
                label="Accounts Receivable Days"
                value={row.arDays}
                onChange={handleFieldChange(idx, 'arDays')}
                step={1}
              />
              <CustomNumericField
                label="Inventory Days"
                value={row.invDays}
                onChange={handleFieldChange(idx, 'invDays')}
                step={1}
              />
              <CustomNumericField
                label="Prepaid Expenses Days"
                value={row.prepaidDays}
                onChange={handleFieldChange(idx, 'prepaidDays')}
                step={1}
              />
              <CustomNumericField
                label="Other Assets Days"
                value={row.otherAssetDays}
                onChange={handleFieldChange(idx, 'otherAssetDays')}
                step={1}
              />
              <CustomNumericField
                label="Accounts Payable Days"
                value={row.apDays}
                onChange={handleFieldChange(idx, 'apDays')}
                step={1}
              />
              <CustomNumericField
                label="Other Liabilities Days"
                value={row.olDays}
                onChange={handleFieldChange(idx, 'olDays')}
                step={1}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

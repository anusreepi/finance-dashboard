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
 * EquityScheduleCard
 * Dynamic row-based input for equity schedule per year.
 * Fields per row:
 *  - Year
 *  - Beginning Shares Outstanding (MM)
 *  - New Issuance/(Buy-Back) (MM)
 *  - Ending Shares Outstanding (MM)
 *  - Dividend Payout Rate (%)
 *  - Retained Earnings Flow ($MM)
 *  - Dividends Paid ($MM)
 *
 * Props:
 *  - initialRows: Array<{ year, begin, issued, ending, dividendRate, retained, dividendsPaid }>
 *  - onChange(updatedRows): void
 */
export default function EquityScheduleCard({
  initialRows = [
    { year: '', begin: '', issued: '', ending: '', dividendRate: '', retained: '', dividendsPaid: '' }
  ],
  onChange,
}) {
  const [rows, setRows] = useState(initialRows);

  const addRow = () => {
    const updated = [...rows, { year: '', begin: '', issued: '', ending: '', dividendRate: '', retained: '', dividendsPaid: '' }];
    setRows(updated);
    onChange?.(updated);
  };

  const removeRow = index => {
    if (rows.length === 1) return;
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    onChange?.(updated);
  };

  const handleFieldChange = (index, field) => valOrEvent => {
    const raw = typeof valOrEvent === 'number' ? valOrEvent : parseFloat(valOrEvent.target.value);
    const value = isNaN(raw) ? '' : raw;
    const updated = rows.map((r, i) => i === index ? { ...r, [field]: value } : r);
    setRows(updated);
    onChange?.(updated);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Equity Schedule</Typography>
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
                label="Beginning Shares Outstanding (MM)"
                value={row.begin}
                onChange={handleFieldChange(idx, 'begin')}
                step={0.1}
              />
              <CustomNumericField
                label="New Issuance/(Buy-Back) (MM)"
                value={row.issued}
                onChange={handleFieldChange(idx, 'issued')}
                step={0.1}
              />
              <CustomNumericField
                label="Ending Shares Outstanding (MM)"
                value={row.ending}
                onChange={handleFieldChange(idx, 'ending')}
                step={0.1}
              />
              <CustomNumericField
                label="Dividend Payout Rate (%)"
                value={row.dividendRate}
                onChange={handleFieldChange(idx, 'dividendRate')}
                step={0.1}
              />
              <CustomNumericField
                label="Retained Earnings Flow ($MM)"
                value={row.retained}
                onChange={handleFieldChange(idx, 'retained')}
                step={0.1}
              />
              <CustomNumericField
                label="Dividends Paid ($MM)"
                value={row.dividendsPaid}
                onChange={handleFieldChange(idx, 'dividendsPaid')}
                step={0.1}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

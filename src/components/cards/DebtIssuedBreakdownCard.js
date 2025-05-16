import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

/**
 * DebtIssuedBreakdownCard
 * Props:
 * - debts: Array of { id, name, amount, interestRate, duration }
 * - totalCapReq: number  (Total Capital Requirement)
 * - equityIssued: number (Equity Issued & Fully Paid)
 * - onTotalDebtChange(newAmount)
 * - onAddDebt()
 * - onRemoveDebt(id)
 * - onUpdateDebt(id, field, value)
 */
export default function DebtIssuedBreakdownCard({
  debts,                    // [{ id, name, amount, interestRate, duration }, …]
  totalDebtIssued,          // number
  cogs,                     // Cost of Sales ($MM)
  onCogsChange,             // (newCogs) => void
  onTotalDebtChange,        // (newTotal) => void
  onAddDebt,                // () => void
  onRemoveDebt,             // (id) => void
  onUpdateDebt              // (id, field, value) => void
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Debt Issued Breakdown
        </Typography>

        {/* Total Debt Issued */}
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <CustomNumericField
            label="Total Debt Issued ($MM)"
            value={totalDebtIssued}
            onChange={(e) => onTotalDebtChange(parseFloat(e.target.value) || 0)}
            step={0.01}
            fullWidth
          />
        </Box>

        {/* Cost of Sales */}
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <CustomNumericField
            label="Cost of Sales ($MM)"
            value={cogs}
            onChange={(e) => onCogsChange(parseFloat(e.target.value) || 0)}
            step={0.1}
            fullWidth
          />
        </Box>

        {/* Column Headers */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ fontWeight: 'bold', mb: 1 }}
          gap={2}
        >
          <Box flex={2}>Debt Name</Box>
          <Box flex={1}>Amount ($MM)</Box>
          <Box flex={1}>Interest Rate (%)</Box>
          <Box flex={1}>Duration (yrs)</Box>
          <Box flex="none">Action</Box>
        </Box>

        {/* Each debt row */}
        {debts.map(({ id, name, amount, interestRate, duration }) => (
          <Box
            key={id}
            display="flex"
            alignItems="center"
            gap={2}
            mb={1}
          >
            {/* Debt Name */}
            <Box flex={2}>
              <TextField
                size="small"
                fullWidth
                label=""
                value={name}
                onChange={(e) => onUpdateDebt(id, 'name', e.target.value)}
              />
            </Box>

            {/* Amount */}
            <Box flex={1}>
              <CustomNumericField
                label=""
                value={amount}
                onChange={(e) => onUpdateDebt(id, 'amount', parseFloat(e.target.value) || 0)}
                step={0.01}
              />
            </Box>

            {/* Interest Rate */}
            <Box flex={1}>
              <CustomNumericField
                label=""
                value={interestRate}
                onChange={(e) => onUpdateDebt(id, 'interestRate', parseFloat(e.target.value) || 0)}
                step={0.01}
              />
            </Box>

            {/* Duration */}
            <Box flex={1}>
              <CustomNumericField
                label=""
                value={duration}
                onChange={(e) => onUpdateDebt(id, 'duration', parseInt(e.target.value, 10) || 0)}
                step={1}
              />
            </Box>

            {/* Remove button */}
            <Box flex="none">
              <IconButton onClick={() => onRemoveDebt(id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* Add Debt */}
        <Box mt={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={onAddDebt}
            variant="outlined"
            size="small"
          >
            Add Debt
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

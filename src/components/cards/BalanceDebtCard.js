// components/cards/BalanceDebtCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const BalanceDebtCard = ({ year, yearData, debts, onUpdateDebt, onAddDebt, onRemoveDebt }) => {
  const handleInput = (field) => (e) => {
    onUpdateDebt(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance Sheet
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Accounts Receivable Days"
              type="number"
              value={yearData['Accounts Receivable Days'] || ''}
              onChange={handleInput('Accounts Receivable Days')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Inventory Days"
              type="number"
              value={yearData['Inventory Days'] || ''}
              onChange={handleInput('Inventory Days')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Accounts Payable Days"
              type="number"
              value={yearData['Accounts Payable Days'] || ''}
              onChange={handleInput('Accounts Payable Days')}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Technology Development"
              type="number"
              value={yearData['Technology Development'] || ''}
              onChange={handleInput('Technology Development')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Office Equipment"
              type="number"
              value={yearData['Office Equipment'] || ''}
              onChange={handleInput('Office Equipment')}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Technology Depreciation Years"
              type="number"
              value={yearData['Technology Depreciation Years'] || ''}
              onChange={handleInput('Technology Depreciation Years')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Office Equipment Depreciation Years"
              type="number"
              value={yearData['Office Equipment Depreciation Years'] || ''}
              onChange={handleInput('Office Equipment Depreciation Years')}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Interest Rate (Default)"
              type="number"
              value={yearData['Interest Rate'] || ''}
              onChange={handleInput('Interest Rate')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Equity Raised"
              type="number"
              value={yearData['Equity Raised'] || ''}
              onChange={handleInput('Equity Raised')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dividends Paid"
              type="number"
              value={yearData['Dividends Paid'] || ''}
              onChange={handleInput('Dividends Paid')}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Debt Issued Breakdown
        </Typography>

        {debts.length > 0 && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}><strong>Debt Name</strong></Grid>
            <Grid item xs={2}><strong>Amount</strong></Grid>
            <Grid item xs={2}><strong>Interest Rate (%)</strong></Grid>
            <Grid item xs={2}><strong>Duration (Years)</strong></Grid>
            <Grid item xs={3}><strong>Action</strong></Grid>
          </Grid>
        )}

        {debts.map((debt, i) => (
          <Grid container spacing={2} alignItems="center" key={i} sx={{ mt: 1 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Debt Name"
                value={debt.name}
                onChange={(e) => onUpdateDebt(year, i, 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                value={yearData[`Debt_${i + 1}_Amount`] || ''}
                onChange={handleInput(`Debt_${i + 1}_Amount`)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Interest Rate"
                value={yearData[`Debt_${i + 1}_Interest_Rate`] || ''}
                onChange={handleInput(`Debt_${i + 1}_Interest_Rate`)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Duration"
                value={yearData[`Debt_${i + 1}_Duration`] || ''}
                onChange={handleInput(`Debt_${i + 1}_Duration`)}
              />
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => onRemoveDebt(year, i)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          size="small"
          onClick={() => onAddDebt(year)}
          sx={{ mt: 2 }}
        >
          + Add Debt
        </Button>

        <TextField
          fullWidth
          label="Total Debt Issued"
          type="number"
          value={yearData['Debt Issued'] || ''}
          onChange={handleInput('Debt Issued')}
          sx={{ mt: 3 }}
        />
      </CardContent>
    </Card>
  );
};

export default BalanceDebtCard;

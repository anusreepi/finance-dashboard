
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';

const MarketingCard = ({ year, yearData, handleChange }) => {
  const handleInput = (field) => (e) => {
    handleChange(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Marketing Expenses
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          General Marketing Costs
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email Cost per Click"
              type="number"
              value={yearData['Email Cost per Click'] || ''}
              onChange={handleInput('Email Cost per Click')}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Organic Search Cost per Click"
              type="number"
              value={yearData['Organic Search Cost per Click'] || ''}
              onChange={handleInput('Organic Search Cost per Click')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Paid Search Cost per Click"
              type="number"
              value={yearData['Paid Search Cost per Click'] || ''}
              onChange={handleInput('Paid Search Cost per Click')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Affiliates Cost per Click"
              type="number"
              value={yearData['Affiliates Cost per Click'] || ''}
              onChange={handleInput('Affiliates Cost per Click')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Freight/Shipping per Order"
              type="number"
              value={yearData['Freight/Shipping per Order'] || ''}
              onChange={handleInput('Freight/Shipping per Order')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Labor/Handling per Order"
              type="number"
              value={yearData['Labor/Handling per Order'] || ''}
              onChange={handleInput('Labor/Handling per Order')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="General Warehouse Rent"
              type="number"
              value={yearData['General Warehouse Rent'] || ''}
              onChange={handleInput('General Warehouse Rent')}
              sx={{ mt: 2 }}
              inputProps={{ step: 1 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Other Expenses
            </Typography>
            <TextField
              fullWidth
              label="Other ($)"
              type="number"
              value={yearData['Other'] || ''}
              onChange={handleInput('Other')}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Interest ($)"
              type="number"
              value={yearData['Interest'] || ''}
              onChange={handleInput('Interest')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Tax Rate"
              type="number"
              value={yearData['Tax Rate'] || ''}
              onChange={handleInput('Tax Rate')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MarketingCard;

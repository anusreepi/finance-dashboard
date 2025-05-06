
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';

const RevenueCard = ({ year, yearData, handleChange }) => {
  const handleInput = (field) => (e) => {
    handleChange(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Revenue & Cost Assumptions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Average Item Value ($)"
              type="number"
              value={yearData['Average Item Value'] || ''}
              onChange={handleInput('Average Item Value')}
            />
            <TextField
              fullWidth
              label="Items per Order"
              type="number"
              value={yearData['Number of Items per Order'] || ''}
              onChange={handleInput('Number of Items per Order')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Average Markdown (%)"
              type="number"
              value={yearData['Average Markdown'] || ''}
              onChange={handleInput('Average Markdown')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Average Promotion/Discount (%)"
              type="number"
              value={yearData['Average Promotion/Discount'] || ''}
              onChange={handleInput('Average Promotion/Discount')}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="COGS as % of Revenue"
              type="number"
              value={yearData['COGS Percentage'] || ''}
              onChange={handleInput('COGS Percentage')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
            <TextField
              fullWidth
              label="Churn Rate"
              type="number"
              value={yearData['Churn Rate'] || ''}
              onChange={handleInput('Churn Rate')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.01 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RevenueCard;
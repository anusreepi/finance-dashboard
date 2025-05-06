
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';

const TrafficCard = ({ year, yearData, handleChange }) => {
  const handleInput = (field) => (e) => {
    handleChange(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Traffic & Conversion Assumptions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email Traffic (Monthly)"
              type="number"
              value={yearData['Email Traffic'] || ''}
              onChange={handleInput('Email Traffic')}
            />
            <TextField
              fullWidth
              label="Organic Search Traffic (Monthly)"
              type="number"
              value={yearData['Organic Search Traffic'] || ''}
              onChange={handleInput('Organic Search Traffic')}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Paid Search Traffic (Monthly)"
              type="number"
              value={yearData['Paid Search Traffic'] || ''}
              onChange={handleInput('Paid Search Traffic')}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Affiliates Traffic (Monthly)"
              type="number"
              value={yearData['Affiliates Traffic'] || ''}
              onChange={handleInput('Affiliates Traffic')}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email Conversion Rate"
              type="number"
              value={yearData['Email Conversion Rate'] || ''}
              onChange={handleInput('Email Conversion Rate')}
              inputProps={{ step: 0.001 }}
            />
            <TextField
              fullWidth
              label="Organic Search Conversion Rate"
              type="number"
              value={yearData['Organic Search Conversion Rate'] || ''}
              onChange={handleInput('Organic Search Conversion Rate')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.001 }}
            />
            <TextField
              fullWidth
              label="Paid Search Conversion Rate"
              type="number"
              value={yearData['Paid Search Conversion Rate'] || ''}
              onChange={handleInput('Paid Search Conversion Rate')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.001 }}
            />
            <TextField
              fullWidth
              label="Affiliates Conversion Rate"
              type="number"
              value={yearData['Affiliates Conversion Rate'] || ''}
              onChange={handleInput('Affiliates Conversion Rate')}
              sx={{ mt: 2 }}
              inputProps={{ step: 0.001 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrafficCard;

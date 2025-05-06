
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';

const SalariesCard = ({ year, yearData, handleChange }) => {
  const handleInput = (field) => (e) => {
    handleChange(year, field, e.target.value);
  };

  const staffTypes = [
    'Direct Staff',
    'Indirect Staff',
    'Part-Time Staff'
  ];

  const execRoles = ['CEO', 'COO', 'CFO', 'Director of HR', 'CIO'];
  const benefitTypes = ['Pension', 'Medical Insurance', 'Child Benefit', 'Car Benefit'];

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Salaries, Wages & Benefits
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Staff Costs
        </Typography>
        <Grid container spacing={2}>
          {staffTypes.map((type) => (
            <Grid item xs={12} md={4} key={type}>
              <Typography variant="subtitle2">{type}</Typography>
              <TextField
                fullWidth
                label="Hours/Year"
                type="number"
                value={yearData[`${type} Hours per Year`] || ''}
                onChange={handleInput(`${type} Hours per Year`)}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Number"
                type="number"
                value={yearData[`${type} Number`] || ''}
                onChange={handleInput(`${type} Number`)}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Hourly Rate ($)"
                type="number"
                value={yearData[`${type} Hourly Rate`] || ''}
                onChange={handleInput(`${type} Hourly Rate`)}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
          Executive Salaries
        </Typography>
        <Grid container spacing={2}>
          {execRoles.map((role) => (
            <Grid item xs={6} key={role}>
              <TextField
                fullWidth
                label={`${role} Salary ($)`}
                type="number"
                value={yearData[`${role} Salary`] || ''}
                onChange={handleInput(`${role} Salary`)}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
          Benefits
        </Typography>
        <Grid container spacing={2}>
          {benefitTypes.map((benefit) => (
            <Grid item xs={6} md={4} key={benefit}>
              <TextField
                fullWidth
                label={`${benefit} Cost per Staff`}
                type="number"
                value={yearData[`${benefit} Cost per Staff`] || ''}
                onChange={handleInput(`${benefit} Cost per Staff`)}
              />
              <TextField
                fullWidth
                label={`${benefit} Total Cost`}
                type="number"
                value={yearData[`${benefit} Total Cost`] || ''}
                onChange={handleInput(`${benefit} Total Cost`)}
                sx={{ mt: 1 }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
          Totals
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total Benefits ($)"
              type="number"
              value={yearData['Total Benefits'] || ''}
              onChange={handleInput('Total Benefits')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Salaries, Wages & Benefits (Total)"
              type="number"
              value={yearData['Salaries, Wages & Benefits'] || ''}
              onChange={handleInput('Salaries, Wages & Benefits')}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalariesCard;
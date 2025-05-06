
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfessionalFeesCard = ({ year, yearData, feeTypes, onUpdateFeeType, onAddFeeType, onRemoveFeeType }) => {
  const handleInput = (field) => (e) => {
    onUpdateFeeType(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Professional Fees Breakdown
        </Typography>

        {feeTypes.length > 0 && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}><strong>Fee Type</strong></Grid>
            <Grid item xs={4}><strong>Cost ($)</strong></Grid>
            <Grid item xs={4}><strong>Action</strong></Grid>
          </Grid>
        )}

        {feeTypes.map((fee, i) => (
          <Grid container spacing={2} alignItems="center" key={i} sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                value={fee.name}
                onChange={(e) => onUpdateFeeType(year, i, 'name', e.target.value)}
                label="Fee Type"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                label="Cost ($)"
                value={yearData[`${fee.name} Cost`] || ''}
                onChange={handleInput(`${fee.name} Cost`)}
              />
            </Grid>
            <Grid item xs={4}>
              <IconButton onClick={() => onRemoveFeeType(year, i)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="New Fee Type"
              value={yearData.newFeeType || ''}
              onChange={(e) => onUpdateFeeType(year, 'newFeeType', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <button onClick={() => onAddFeeType(year)} style={{ padding: '8px 16px', cursor: 'pointer' }}>Add Fee</button>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Professional Fees (Total) ($)"
          type="number"
          value={yearData['Professional Fees'] || ''}
          onChange={handleInput('Professional Fees')}
          sx={{ mt: 3 }}
        />
      </CardContent>
    </Card>
  );
};

export default ProfessionalFeesCard;

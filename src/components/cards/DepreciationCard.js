
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DepreciationCard = ({ year, yearData, assets, onUpdateAsset, onAddAsset, onRemoveAsset }) => {
  const handleInput = (field) => (e) => {
    onUpdateAsset(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Depreciation Breakdown
        </Typography>

        {assets.length > 0 && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}><strong>Asset</strong></Grid>
            <Grid item xs={2}><strong>Amount ($)</strong></Grid>
            <Grid item xs={2}><strong>Rate (%)</strong></Grid>
            <Grid item xs={2}><strong>NBV ($)</strong></Grid>
            <Grid item xs={3}><strong>Action</strong></Grid>
          </Grid>
        )}

        {assets.map((asset, i) => (
          <Grid container spacing={2} alignItems="center" key={i} sx={{ mt: 1 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Asset Name"
                value={asset.name}
                onChange={(e) => onUpdateAsset(year, i, 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                value={yearData[`Asset_${i + 1}_Amount`] || ''}
                onChange={handleInput(`Asset_${i + 1}_Amount`)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Rate (%)"
                value={yearData[`Asset_${i + 1}_Rate`] || ''}
                onChange={handleInput(`Asset_${i + 1}_Rate`)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="NBV ($)"
                value={yearData[`Asset_${i + 1}_NBV`] || ''}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => onRemoveAsset(year, i)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          size="small"
          onClick={() => onAddAsset(year)}
          sx={{ mt: 2 }}
        >
          + Add Asset
        </Button>

        <TextField
          fullWidth
          label="Total Depreciation from Breakdown"
          type="number"
          value={yearData['Depreciation'] || ''}
          onChange={handleInput('Depreciation')}
          sx={{ mt: 3 }}
        />
      </CardContent>
    </Card>
  );
};

export default DepreciationCard;

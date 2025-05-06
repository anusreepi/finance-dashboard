
import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RentCard = ({ year, yearData, rentCategories, onUpdateCategory, onAddCategory, onRemoveCategory }) => {
  const handleInput = (field) => (e) => {
    onUpdateCategory(year, field, e.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Office Rent Breakdown
        </Typography>

        {rentCategories.length > 0 && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}><strong>Category</strong></Grid>
            <Grid item xs={3}><strong>Square Meters</strong></Grid>
            <Grid item xs={3}><strong>Cost per SQM ($)</strong></Grid>
            <Grid item xs={2}><strong>Action</strong></Grid>
          </Grid>
        )}

        {rentCategories.map((category, i) => (
          <Grid container spacing={2} key={i} alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                value={category.name}
                onChange={(e) => onUpdateCategory(year, i, 'name', e.target.value)}
                label="Category Name"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type="number"
                label="Square Meters"
                value={yearData[`${category.name} Square Meters`] || ''}
                onChange={handleInput(`${category.name} Square Meters`)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type="number"
                label="Cost per SQM ($)"
                value={yearData[`${category.name} Cost per SQM`] || ''}
                onChange={handleInput(`${category.name} Cost per SQM`)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => onRemoveCategory(year, i)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="New Rent Category"
              value={yearData.newRentCategory || ''}
              onChange={(e) => onUpdateCategory(year, 'newRentCategory', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <button onClick={() => onAddCategory(year)} style={{ padding: '8px 16px', cursor: 'pointer' }}>Add Category</button>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Office Rent (Total)"
          type="number"
          value={yearData['Office Rent'] || ''}
          onChange={handleInput('Office Rent')}
          sx={{ mt: 3 }}
        />
      </CardContent>
    </Card>
  );
};

export default RentCard;

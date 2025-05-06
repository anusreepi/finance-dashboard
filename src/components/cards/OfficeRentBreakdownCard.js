import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import CustomNumericField from '../CustomNumericField';

const OfficeRentBreakdownCard = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Warehouse2', sqm: 0, costPerSqm: 10 },
    { id: 2, name: 'sun warehouse', sqm: 0, costPerSqm: 10 },
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (id, field, value) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
  };

  const handleRemove = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleAddCategory = () => {
    const name = newCategory.trim();
    if (name) {
      setCategories(prev => [
        ...prev,
        { id: Date.now(), name, sqm: 0, costPerSqm: 0 },
      ]);
      setNewCategory('');
    }
  };

  const total = categories.reduce((sum, cat) => sum + cat.sqm * cat.costPerSqm, 0).toFixed(2);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Office Rent Breakdown</Typography>

      {/* Table Headers */}
      <Box display="flex" fontWeight="bold" mb={1}>
        <Box width="30%">Category</Box>
        <Box width="30%">Square Meters</Box>
        <Box width="30%">Cost per SQM ($)</Box>
      </Box>

      {/* Rent Rows */}
      {categories.map(({ id, name, sqm, costPerSqm }) => (
        <Box key={id} display="flex" alignItems="center" gap={1} mb={1}>
          <Box width="30%">
            <Typography variant="body2" sx={{ pt: 1 }}>{name}</Typography>
          </Box>
          <Box width="30%">
            <CustomNumericField
              value={sqm}
              onChange={(val) => handleChange(id, 'sqm', val)}
              step={1}
            />
          </Box>
          <Box width="30%">
            <CustomNumericField
              value={costPerSqm}
              onChange={(val) => handleChange(id, 'costPerSqm', val)}
              step={1}
            />
          </Box>
          <Button onClick={() => handleRemove(id)} variant="outlined" size="small" color="error">
            Remove
          </Button>
        </Box>
      ))}

      {/* Add New Rent Category */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Add New Rent Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ width: '250px', background: '#ffffff', input: { color: '#000000' } }}
        />
        <Button variant="contained" size="small" onClick={handleAddCategory}>
          Add Rent Category
        </Button>
      </Box>

      {/* Total Office Rent */}
      <Box mt={3} width="50%">
        <CustomNumericField
          label="Office Rent (Total)"
          value={parseFloat(total)}
          onChange={() => {}}
          disabled
        />
      </Box>
    </Box>
  );
};

export default OfficeRentBreakdownCard;

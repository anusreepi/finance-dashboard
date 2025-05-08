import React, { useState } from 'react';
import { Box, Typography, Button, TextField,Card,CardContent } from '@mui/material';
  
import CustomNumericField from '../CustomNumericField';

const ProfessionalFeesCard = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Legal', Cost: 0 },
   
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

  const total = categories.reduce((sum, cat) => sum + cat.Cost, 0).toFixed(2);

  return (
   <Card className="marketing-card">
         <CardContent>
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Professional Fees Breakdown</Typography>

      {/* Table Headers */}
      <Box display="flex" fontWeight="bold" mb={1}>
        <Box width="30%">Fee Type</Box>
        <Box width="30%">Cost ($)</Box>
        
      </Box>

      {/* Rent Rows */}
      {categories.map(({ id, name,Cost }) => (
        <Box key={id} display="flex" alignItems="center" gap={1} mb={1}>
          <Box width="30%">
            <Typography variant="body2" sx={{ pt: 1 }}>{name}</Typography>
          </Box>
          <Box width="30%">
            <CustomNumericField
              value={Cost}
              onChange={(val) => handleChange(id, 'sqm', val)}
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
          placeholder="Add New Fee Type"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ width: '250px', background: '#ffffff', input: { color: '#000000' } }}
        />
        <Button variant="contained" size="small" onClick={handleAddCategory}>
        Add New Fee Type
        </Button>
      </Box>

      {/* Total Office Rent */}
      <Box mt={3} width="50%">
        <CustomNumericField
          label="Professional Fees (Total) ($)"
          value={parseFloat(total)}
          onChange={() => {}}
          disabled
        />
      </Box>
    </Box>
    </CardContent>
    </Card>
  );
};

export default ProfessionalFeesCard;

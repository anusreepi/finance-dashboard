// src/components/ProductsToManufactureCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';

// Assembly line parameters
const assemblyLines = [
  { key: 'Solid Assem Line',    label: 'Solid Assembly Lines' },
  { key: 'Liquid Assem Line',   label: 'Liquid Assembly Lines' },
  { key: "Pack'g Assem Line",   label: 'Packaging Assembly Lines' },
];

// Full list of products (must match your state keys: <Product>_Selected)
const products = [
  { key: 'Tablets_Selected', label: 'Tablets' },
  { key: 'Cream_Selected',   label: 'Cream' },
  { key: 'Blister_Selected', label: 'Blister' },
  { key: 'Capsule_Selected', label: 'Capsule' },
  { key: 'Ointment_Selected',label: 'Ointment' },
  { key: 'Bottle_Selected',  label: 'Bottle' },
  { key: 'Powder_Selected',  label: 'Powder' },
  { key: 'Syrup_Selected',   label: 'Syrup (Sol & Susp)' },
  { key: 'Sachet_Selected',  label: 'Sachet' },
];

export default function ProductsToManufactureCard({ inputs, onUpdateField }) {
  if (!inputs) return null;

  // Numeric inputs for assembly lines
  const handleNumericChange = (field) => (evt) => {
    const val = parseInt(evt.target.value, 10);
    onUpdateField(field, isNaN(val) ? 0 : val);
  };

  // Checkbox toggles for products
  const handleCheckboxChange = (key) => (evt) => {
    onUpdateField(key, evt.target.checked);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          Products to Manufacture
        </Typography>
        <Box display="flex" gap={4}>
          {/* Left: Assembly Lines */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Assembly Lines
            </Typography>
            {assemblyLines.map(({ key, label }) => (
              <Box key={key} mb={2}>
                <CustomNumericField
                  label={label}
                  value={inputs[key] || 0}
                  onChange={handleNumericChange(key)}
                  step={1}
                />
              </Box>
            ))}
          </Box>

          {/* Right: Products */}
          <Box flex={1}>
            <Typography variant="subtitle1" gutterBottom>
              Products to Manufacture
            </Typography>
            <FormGroup>
              {products.map(({ key, label }) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={!!inputs[key]}
                      onChange={handleCheckboxChange(key)}
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

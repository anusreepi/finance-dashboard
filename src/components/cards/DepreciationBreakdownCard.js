import React, { useState } from 'react';
import { Box, Typography, Button, TextField,Card,CardContent } from '@mui/material';
import CustomNumericField from '../CustomNumericField';

const DepreciationBreakdownCard = ({ data, onUpdate, onAdd, onRemove }) => {
    const getNetBookValue = (amount, rate) => (amount * (1 - rate / 100)).toFixed(2);
    const totalDepreciation = data.reduce((sum, a) => sum + Number(a.amount || 0), 0).toFixed(2);
  
    return (
        <Card className="marketing-card">
              <CardContent>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Depreciation Breakdown</Typography>
        {data.map(({ id, name, amount, rate }) => (
          <Box key={id} display="flex" alignItems="center" gap={1} mb={1}>
            <TextField
              value={name}
              size="small"
              sx={{ width: '25%' }}
              onChange={(e) => onUpdate(id, 'name', e.target.value)}
            />
            <Box width="15%">
              <CustomNumericField value={amount} onChange={(val) => onUpdate(id, 'amount', val)} step={1} />
            </Box>
            <Box width="15%">
              <CustomNumericField value={rate} onChange={(val) => onUpdate(id, 'rate', val)} step={1} />
            </Box>
            <Box width="20%">
              <CustomNumericField value={getNetBookValue(amount, rate)} disabled />
            </Box>
            <Button onClick={() => onRemove(id)} variant="outlined" size="small" color="error">
              Remove
            </Button>
          </Box>
        ))}
  
        <Button onClick={onAdd} variant="contained" size="small" sx={{ mt: 1 }}>
          Add Asset
        </Button>
  
        <Box mt={2} width="40%">
          <CustomNumericField
            label="Total Depreciation from Breakdown"
            value={parseFloat(totalDepreciation)}
            onChange={() => {}}
            disabled
          />
        </Box>
      </Box>
      </CardContent>
          </Card>
    );
  };
  

export default DepreciationBreakdownCard;

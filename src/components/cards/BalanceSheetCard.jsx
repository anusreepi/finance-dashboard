import React from 'react';
import { Box, Typography,Card,CardContent } from '@mui/material';
import CustomNumericField from '../CustomNumericField';
import '../../css/BalanceSheetCard.css';

const BalanceSheetCard = ({ data, onUpdate }) => {
  const handleChange = (field) => (val) => {
    onUpdate(field, val);
  };

  return (
    <Card className="marketing-card">
          <CardContent>
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Balance Sheet</Typography>

      {/* Left & Right side layout */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box width="48%">
          <CustomNumericField
            label="Accounts Receivable Days"
            value={data['Accounts Receivable Days']}
            onChange={handleChange('Accounts Receivable Days')}
            step={1}
          />
          <CustomNumericField
            label="Inventory Days"
            value={data['Inventory Days']}
            onChange={handleChange('Inventory Days')}
            step={1}
          />
          <CustomNumericField
            label="Accounts Payable Days"
            value={data['Accounts Payable Days']}
            onChange={handleChange('Accounts Payable Days')}
            step={1}
          />
          <CustomNumericField
            label="Technology Development"
            value={data['Technology Development']}
            onChange={handleChange('Technology Development')}
            step={1000}
          />
          <CustomNumericField
            label="Office Equipment"
            value={data['Office Equipment']}
            onChange={handleChange('Office Equipment')}
            step={1000}
          />
        </Box>

        <Box width="48%">
          <CustomNumericField
            label="Technology Depreciation Years"
            value={data['Technology Depreciation Years']}
            onChange={handleChange('Technology Depreciation Years')}
            step={1}
          />
          <CustomNumericField
            label="Office Equipment Depreciation Years"
            value={data['Office Equipment Depreciation Years']}
            onChange={handleChange('Office Equipment Depreciation Years')}
            step={1}
          />
          <CustomNumericField
            label="Interest Rate (Default)"
            value={data['Interest Rate']}
            onChange={handleChange('Interest Rate')}
            step={0.01}
          />
          <CustomNumericField
            label="Equity Raised"
            value={data['Equity Raised']}
            onChange={handleChange('Equity Raised')}
            step={10000}
          />
          <CustomNumericField
            label="Dividends Paid"
            value={data['Dividends Paid']}
            onChange={handleChange('Dividends Paid')}
            step={100}
          />
        </Box>
      </Box>
    </Box>
    </CardContent>
        </Card>
  );
};

export default BalanceSheetCard;

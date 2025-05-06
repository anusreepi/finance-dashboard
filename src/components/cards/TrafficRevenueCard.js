import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField.js';

const TrafficRevenueCard = ({ year, yearData, onUpdateField }) => {
  const handleUpdate = (field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    onUpdateField(year, field, isNaN(val) ? '' : val);
  };

  const row = (leftField, rightField, leftStep = 1, rightStep = 1) => (
    <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
      <Box width="48%">
        <CustomNumericField
          label={leftField}
          value={yearData[leftField]}
          onChange={handleUpdate(leftField)}
          step={leftStep}
        />
      </Box>
      <Box width="48%">
        <CustomNumericField
          label={rightField}
          value={yearData[rightField]}
          onChange={handleUpdate(rightField)}
          step={rightStep}
        />
      </Box>
    </Box>
  );

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" gutterBottom>
          Traffic & Conversion Assumptions
        </Typography>

        {row('Email Traffic (Monthly)', 'Email Conversion Rate', 100, 0.001)}
        {row('Organic Search Traffic (Monthly)', 'Organic Search Conversion Rate', 100, 0.001)}
        {row('Paid Search Traffic (Monthly)', 'Paid Search Conversion Rate', 100, 0.001)}
        {row('Affiliates Traffic (Monthly)', 'Affiliates Conversion Rate', 100, 0.001)}

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Revenue & Cost Assumptions
        </Typography>

        {row('Average Item Value ($)', 'Average Promotion/Discount (%)', 0.01, 0.01 )}
        {row('Items per Order','COGS as % of Revenue',10, 0.1 )}
        {row('Average Markdown (%)', 'Churn Rate', 0.01, 0.01)}
      </CardContent>
    </Card>
  );
};

export default TrafficRevenueCard;

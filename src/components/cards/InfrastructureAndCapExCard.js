import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CustomNumericField from '../CustomNumericField.js';

const InfrastructureAndCapExCard = ({ yearData, onUpdateField }) => {
  const handleUpdate = (field) => (valOrEvent) => {
    const val = typeof valOrEvent === 'number'
      ? valOrEvent
      : parseFloat(valOrEvent.target.value);
    onUpdateField(field, isNaN(val) ? '' : val);
  };

  // helper to render a pair of inputs side by side
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
        {/* Section 1 */}
        <Typography variant="h6" gutterBottom>
          Production Infrastructure
        </Typography>
        {row('Land Cost($)', 'Building Cost ($)', 10000, 10000)}
        {row('Installation Cost ($)', 'Equipment Cost ($)', 5000, 5000)}
        

        {/* Section 2 */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Start-Up Capital
        </Typography>
        {row('Commissioning Fees ($)', 'Licensing Fees ($)', 1000, 1000)}
        {row('Dossier Acquisition ($)', 'Contingency Reserve ($)', 1000, 1000)}
        {row('Project Running Cost ($)', 'Total Capital Requirement ($)', 1000, 1000)}
      </CardContent>
    </Card>
  );
};

export default InfrastructureAndCapExCard;

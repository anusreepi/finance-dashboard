
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import CustomNumericField from '../CustomNumericField';
import '../../css/MarketingExpensesCard.css';

const benefitTypes = ['Pension', 'Medical Insurance', 'Child Benefit', 'Car Benefit'];
const executiveRoles = ['CEO', 'COO', 'CFO', 'Director of HR', 'CIO'];

const MarketingExpensesCard = ({ yearData, onUpdateField }) => {
  if (!yearData) return null;

  const handleUpdate = (field) => (value) => {
    onUpdateField(field, isNaN(value) ? 0 : value);
  };

  return (
    <Card className="marketing-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>Marketing Expenses</Typography>
        <Box className="marketing-content">
          {/* LEFT SIDE */}
          <Box className="marketing-left">
            <Typography variant="subtitle1">General Marketing Costs</Typography>
            <CustomNumericField label="Email Cost per Click" value={yearData['Email CPC']} onChange={handleUpdate('Email CPC')} step={0.01} />
            <CustomNumericField label="Organic Search CPC" value={yearData['Organic CPC']} onChange={handleUpdate('Organic CPC')} step={0.01} />
            <CustomNumericField label="Paid Search CPC" value={yearData['Paid CPC']} onChange={handleUpdate('Paid CPC')} step={0.01} />
            <CustomNumericField label="Affiliates CPC" value={yearData['Affiliates CPC']} onChange={handleUpdate('Affiliates CPC')} step={0.01} />
            <CustomNumericField label="Freight/Shipping per Order" value={yearData['Freight per Order']} onChange={handleUpdate('Freight per Order')} step={0.01} />
            <CustomNumericField label="Labor/Handling per Order" value={yearData['Labor per Order']} onChange={handleUpdate('Labor per Order')} step={0.01} />
            <CustomNumericField label="General Warehouse Rent" value={yearData['Warehouse Rent']} onChange={handleUpdate('Warehouse Rent')} step={0.01} />

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Other Expenses</Typography>
            <CustomNumericField label="Other ($)" value={yearData['Other']} onChange={handleUpdate('Other')} step={0.01} />
            <CustomNumericField label="Interest ($)" value={yearData['Interest']} onChange={handleUpdate('Interest')} step={0.01} />
            <CustomNumericField label="Tax Rate (%)" value={yearData['Tax Rate']} onChange={handleUpdate('Tax Rate')} step={0.01} />
          </Box>

          {/* RIGHT SIDE */}
          <Box className="marketing-right">
            <Typography variant="subtitle1">Salaries, Wages & Benefits Breakdown</Typography>
            <Typography variant="body2" className="section-title">Staff Costs</Typography>
            <Box className="staff-costs-header">
              <span>Category</span><span>Hours/Year</span><span>Number</span><span>Hourly Rate ($)</span>
            </Box>
            {['Direct Staff', 'Indirect Staff', 'Part-Time Staff'].map(role => (
              <Box className="staff-costs-row" key={role}>
                <span>{role}</span>
                <CustomNumericField label="" value={yearData[`${role} Hours`]} onChange={handleUpdate(`${role} Hours`)} step={100} />
                <CustomNumericField label="" value={yearData[`${role} Number`]} onChange={handleUpdate(`${role} Number`)} step={1} />
                <CustomNumericField label="" value={yearData[`${role} Rate`]} onChange={handleUpdate(`${role} Rate`)} step={1} />
              </Box>
            ))}

            <Typography variant="body2" className="section-title">Executive Salaries</Typography>
            <Box className="exec-salary-header">
              <span>Position</span><span>Annual Salary ($)</span>
            </Box>
            {executiveRoles.map(role => (
              <Box className="exec-salary-row" key={role}>
                <span>{role}</span>
                <CustomNumericField label="" value={yearData[`${role} Salary`]} onChange={handleUpdate(`${role} Salary`)} step={1000} />
              </Box>
            ))}

            <Typography variant="body2" className="section-title">Benefits</Typography>
            <Box className="benefits-header">
              <span>Type</span><span>Cost/Staff ($)</span><span>Total Cost ($)</span>
            </Box>
            {benefitTypes.map(benefit => (
              <Box className="benefits-row" key={benefit}>
                <span>{benefit}</span>
                <CustomNumericField label="" value={yearData[`${benefit} Cost`]} onChange={handleUpdate(`${benefit} Cost`)} step={10} />
                <CustomNumericField label="" value={yearData[`${benefit} Total`] || 0} onChange={() => {}} step={0} disabled />
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketingExpensesCard;
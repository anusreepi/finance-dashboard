import React, { useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import ChartCard from '../components/ChartCard';
import TrafficRevenueCard from '../components/cards/TrafficRevenueCard';
import MarketingExpensesCard from '../components/cards/MarketingExpensesCard';
import OfficeRentBreakdownCard from '../components/cards/OfficeRentBreakdownCard';


const FinanceDashboard = () => {
  const [discountRate, setDiscountRate] = useState(10);
  const [wacc, setWacc] = useState(8);
  const [growthRate, setGrowthRate] = useState(3);
  const [taxRate, setTaxRate] = useState(20);
  const [inflationRate, setInflationRate] = useState(2);
  const [laborRateIncrease, setLaborRateIncrease] = useState(4);
  const [analysisPeriod, setAnalysisPeriod] = useState([2025, 2040]);
  

  const year = 2025; // Currently showing a single year (you can extend later)
  const [yearData, setYearData] = useState({});
  const initialMarketingData = {
    'Email CPC': 0,
    'Organic CPC': 0,
    'Paid CPC': 0,
    'Affiliates CPC': 0,
    'Freight per Order': 0,
    'Labor per Order': 0,
    'Warehouse Rent': 0,
    'Other': 0,
    'Interest': 0,
    'Tax Rate': 0,
    'Direct Staff Hours': 0,
    'Direct Staff Number': 0,
    'Direct Staff Rate': 0,
    'Indirect Staff Hours': 0,
    'Indirect Staff Number': 0,
    'Indirect Staff Rate': 0,
    'Part-Time Staff Hours': 0,
    'Part-Time Staff Number': 0,
    'Part-Time Staff Rate': 0,
    'CEO Salary': 0,
    'COO Salary': 0,
    'CFO Salary': 0,
    'Director of HR Salary': 0,
    'CIO Salary': 0,
    'Pension Cost': 0,
    'Medical Insurance Cost': 0,
    'Child Benefit Cost': 0,
    'Car Benefit Cost': 0,
    'Pension Total': 0,
    'Medical Insurance Total': 0,
    'Child Benefit Total': 0,
    'Car Benefit Total': 0,
  };
  
  const [marketingData, setMarketingData] = useState(initialMarketingData);
  const [officeRentData, setOfficeRentData] = useState([
    { category: 'Warehouse1', squareMeters: 0, costPerSQM: 0 },
  ]);
  
  const handleUpdateField = (year, field, value) => {
    setYearData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };
  const handleMarketingFieldUpdate = (field, value) => {
    setMarketingData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleUpdateRent = (index, field, value) => {
    const updated = [...officeRentData];
    updated[index][field] = value;
    setOfficeRentData(updated);
  };
  
  const handleAddRentCategory = (category) => {
    setOfficeRentData(prev => [...prev, { category, squareMeters: 0, costPerSQM: 0 }]);
  };
  
  const handleRemoveRentCategory = (index) => {
    setOfficeRentData(prev => prev.filter((_, i) => i !== index));
  };
  

  return (
    <Box display="flex" height="100vh">
      <Sidebar
        discountRate={discountRate} setDiscountRate={setDiscountRate}
        wacc={wacc} setWacc={setWacc}
        growthRate={growthRate} setGrowthRate={setGrowthRate}
        taxRate={taxRate} setTaxRate={setTaxRate}
        inflationRate={inflationRate} setInflationRate={setInflationRate}
        laborRateIncrease={laborRateIncrease} setLaborRateIncrease={setLaborRateIncrease}
        analysisPeriod={analysisPeriod} setAnalysisPeriod={setAnalysisPeriod}
      />

<Box flex={1} p={0} sx={{ height: '100vh', overflowY: 'auto' }}>
<Card sx={{ height: '100%', borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
  <CardContent sx={{ px: 4, py: 3, overflowY: 'auto', flex: 1 }}>
    <Typography variant="h5" gutterBottom>
      Ecommerce Financial Analysis Dashboard
    </Typography>

    <Typography variant="h6" gutterBottom>
      Year {year}
    </Typography>

    <TrafficRevenueCard
      year={year}
      yearData={yearData}
      onUpdateField={handleUpdateField}
    />
    
    <MarketingExpensesCard
    yearData={marketingData}
    onUpdateField={handleMarketingFieldUpdate}
  />

<OfficeRentBreakdownCard
  data={officeRentData}
  onUpdate={handleUpdateRent}
  onAdd={handleAddRentCategory}
  onRemove={handleRemoveRentCategory}
/>

  </CardContent>
</Card>

  </Box>
    </Box>
  );
};

export default FinanceDashboard;

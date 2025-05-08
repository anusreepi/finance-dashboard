import React, { useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button,MenuItem, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';

import TrafficRevenueCard from '../components/cards/TrafficRevenueCard';
import MarketingExpensesCard from '../components/cards/MarketingExpensesCard';
import OfficeRentBreakdownCard from '../components/cards/OfficeRentBreakdownCard';
import ProfessionalFeesCard from '../components/cards/ProfessionalFeesCard';
import DepreciationBreakdownCard from '../components/cards/DepreciationBreakdownCard';
import BalanceSheetCard from '../components/cards/BalanceSheetCard';
import DebtIssuedCard from '../components/cards/DebtIssuedCard';
import BestCaseScenarioCard from '../components/cards/BestCaseScenarioCard';
import WorstCaseScenarioCard from '../components/cards/WorstCaseScenarioCard';
import { IconButton, Collapse } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SummaryCard from '../components/cards/SummaryCard';
import CombinedPerformanceCard from '../components/cards/CombinedPerformanceCard';
import DashboardTabs from '../components/cards/DashboardTabs';


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const FinanceDashboard = () => {
  const [discountRate, setDiscountRate] = useState(10);
  const [wacc, setWacc] = useState(8);
  const [growthRate, setGrowthRate] = useState(3);
  const [taxRate, setTaxRate] = useState(20);
  const [inflationRate, setInflationRate] = useState(2);
  const [laborRateIncrease, setLaborRateIncrease] = useState(4);
  const [analysisPeriod, setAnalysisPeriod] = useState([2025, 2040]);
  
  const [year, setYear] = useState(null);
   // Currently showing a single year (you can extend later)
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
  const [balanceSheetData, setBalanceSheetData] = useState({
    'Accounts Receivable Days': 0,
    'Inventory Days': 0,
    'Accounts Payable Days': 0,
    'Technology Development': 0,
    'Office Equipment': 0,
    'Technology Depreciation Years': 0,
    'Office Equipment Depreciation Years': 0,
    'Interest Rate (Default)': 0,
    'Equity Raised': 0,
    'Dividends Paid': 0,
  });
  const [bestCaseData, setBestCaseData] = useState({
    conversionRateMultiplier: 1.2,
    averageOrderValueMultiplier: 1.1,
    cogsReduction: 0.95,
    interestCostReduction: 0.99,
    laborCostReduction: 0.99,
    materialCostReduction: 0.99,
    markdownAdjustment: 0.99,
    politicalRisk: 2,
    environmentalImpact: 2,
  });
  const handleBestCaseChange = (key, value) => {
    setBestCaseData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const [marketingData, setMarketingData] = useState(initialMarketingData);
  const [officeRentData, setOfficeRentData] = useState([
    { category: 'Warehouse1', squareMeters: 0, costPerSQM: 0 },
  ]);
  const [feeData, setFeeData] = useState([
    { id: 1, name: 'Legal', Cost: 0 }
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
  
  const handleUpdateFee = (id, field, value) => {
    setFeeData(prev =>
      prev.map(fee => (fee.id === id ? { ...fee, [field]: value } : fee))
    );
  };
  
  const handleAddFee = (name) => {
    setFeeData(prev => [...prev, { id: Date.now(), name, Cost: 0 }]);
  };
  
  const handleRemoveFee = (id) => {
    setFeeData(prev => prev.filter(fee => fee.id !== id));
  };
  const [depreciationData, setDepreciationData] = useState([
    { id: 1, name: 'Asset 1', amount: 0, rate: 10 }
  ]);
  
  const handleUpdateDep = (id, field, value) => {
    setDepreciationData(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };
  
  const handleAddDep = () => {
    const newId = Date.now();
    setDepreciationData(prev => [...prev, { id: newId, name: `Asset ${prev.length + 1}`, amount: 0, rate: 10 }]);
  };
  
  const handleRemoveDep = (id) => {
    setDepreciationData(prev => prev.filter(item => item.id !== id));
  };
  const handleUpdateBalanceSheet = (field, value) => {
    setBalanceSheetData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const [debtData, setDebtData] = useState([
    { id: 1, name: 'Debt 1', amount: 0, interestRate: 0, duration: 1 }
  ]);
  
  const handleUpdateDebt = (id, field, value) => {
    setDebtData(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };
  
  const handleAddDebt = () => {
    setDebtData(prev => [
      ...prev,
      { id: Date.now(), name: `Debt ${prev.length + 1}`, amount: 0, interestRate: 0, duration: 1 }
    ]);
  };
  
  const handleRemoveDebt = (id) => {
    setDebtData(prev => prev.filter(item => item.id !== id));
  };
  const handleSaveAllData = () => {
    const allData = {
      YearData: yearData,
      MarketingData: marketingData,
      OfficeRentData: officeRentData,
      ProfessionalFees: feeData,
      Depreciation: depreciationData,
      BalanceSheet: balanceSheetData,
      DebtIssued: debtData,
      
    };
  
    const worksheet = XLSX.utils.json_to_sheet([allData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Financial Inputs');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'financial_data.xlsx');
  };
  const [worstCaseData, setWorstCaseData] = useState({
    conversionRateMultiplier: 0.8,
    averageOrderValueMultiplier: 0.9,
    politicalRisk: 4,
    environmentalImpact: 4,
    cogsIncrease: 1.05,
    interestCostIncrease: 1.2,
    laborCostIncrease: 1.2,
    materialCostIncrease: 1.2,
    markdownAdjustment: 1.1,
  });
  
  const handleWorstCaseChange = (key, value) => {
    setWorstCaseData((prev) => ({ ...prev, [key]: value }));
  };
  const [showMainCards, setShowMainCards] = useState(false);

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
   <Card sx={{ mx: 4, mt: 3, mb: 2, borderRadius: 0 }}>
  <CardContent sx={{ px: 4, py: 3 }}>
    {/* Header */}
    <Typography variant="h5" gutterBottom>
      Ecommerce Financial Analysis Dashboard
    </Typography>

    {/* Input Section Title and Toggle */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
      <Typography variant="h6">Input Parameters</Typography>
      <IconButton onClick={() => setShowMainCards(prev => !prev)}>
        {showMainCards ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Box>

    {/* Year Dropdown */}
    <TextField
      label="Year"
      select
      fullWidth
      size="small"
      value={year ?? ''}
      onChange={(e) => {
        const val = e.target.value ? parseInt(e.target.value) : null;
        setYear(val);
        setShowMainCards(!!val);
      }}
    >
      <MenuItem value="">Select Year</MenuItem>
      {Array.from({ length: 16 }, (_, i) => 2025 + i).map((yr) => (
        <MenuItem key={yr} value={yr}>
          {yr}
        </MenuItem>
      ))}
    </TextField>

    {/* Collapsible Inputs */}
    <Collapse in={showMainCards}>
      <Box mt={3}>
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

        <ProfessionalFeesCard
          data={feeData}
          onUpdate={handleUpdateFee}
          onAdd={handleAddFee}
          onRemove={handleRemoveFee}
        />

        <DepreciationBreakdownCard
          data={depreciationData}
          onUpdate={handleUpdateDep}
          onAdd={handleAddDep}
          onRemove={handleRemoveDep}
        />

        <BalanceSheetCard
          data={balanceSheetData}
          onUpdate={handleUpdateBalanceSheet}
        />

        <DebtIssuedCard
          data={debtData}
          onUpdate={handleUpdateDebt}
          onAdd={handleAddDebt}
          onRemove={handleRemoveDebt}
        />
      </Box>
    </Collapse>
    <Box sx={{ mt: 3 ,mb: 3 }}>    
<Button variant="contained" color="primary" onClick={handleSaveAllData}>
  Save All Data
</Button>
</Box>
<Box sx={{ mb: 3 }}>
<BestCaseScenarioCard data={bestCaseData} onChange={handleBestCaseChange} />
  <WorstCaseScenarioCard
  data={worstCaseData}
  onChange={handleWorstCaseChange}
/>
</Box>

<Box sx={{ mb: 3 }}>
<SummaryCard />
</Box>
<Box sx={{ mb: 3 }}>
<CombinedPerformanceCard />

</Box>
<Box flex={1} p={3} sx={{ overflowY: 'auto' }}>
        <DashboardTabs />
      </Box>


  </CardContent>
</Card>
  
  </Box>
    </Box>
  );
};

export default FinanceDashboard;

  // src/pages/FinanceDashboard.jsx
  import React, { useEffect, useState, useMemo } from 'react';
  import {
    Box, Card, CardContent, Typography,
    Button, MenuItem, TextField, IconButton, Collapse
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


  import Sidebar                          from '../components/Sidebar';
  import InfrastructureAndCapExCard       from '../components/cards/InfrastructureAndCapExCard';
  import DepreciationScheduleCard         from '../components/cards/DepreciationScheduleCard';
  import ProductsToManufactureCard         from '../components/cards/ProductsToManufactureCard';
  import ProductionCapacityCard            from '../components/cards/ProductionCapacityCard';
  import UtilityCostsCard                  from '../components/cards/UtilityCostsCard';
  import LaborStructureCard                from '../components/cards/LaborStructureCard';
  import ProductionEstimatesSection        from '../components/cards/ProductionEstimatesSection';
  import UnitProductionCostCard            from '../components/cards/UnitProductionCostCard';
  import RawMaterialCostCard               from '../components/cards/RawMaterialCostCard';
  import FreightWarehousingCommissionCard  from '../components/cards/FreightWarehousingCommissionCard';
  import IRRNPVParametersCard              from '../components/cards/IRRNPVParametersCard';
  import InflationTotalUtilityCostCard     from '../components/cards/InflationTotalUtilityCostCard';
  import WorkingCapitalAssumptionsCard     from '../components/cards/WorkingCapitalAssumptionsCard';
  import ChangeInDebtEquityCard            from '../components/cards/ChangeInDebtEquityCard';
  import EquityScheduleCard                from '../components/cards/EquityScheduleCard';
  import DebtIssuedBreakdownCard           from '../components/cards/DebtIssuedBreakdownCard';
  import BestCaseScenarioCard              from '../components/cards/BestCaseScenarioCard';
  import WorstCaseScenarioCard             from '../components/cards/WorstCaseScenarioCard';
  import SummaryCard                       from '../components/cards/SummaryCard';
  import CombinedPerformanceCard           from '../components/cards/CombinedPerformanceCard';
import Plot from 'react-plotly.js';
  import DashboardTabs                     from '../components/cards/DashboardTabs';
  import { defaults } from './default.js'
  import { CircularProgress } from "@mui/material";
  export function pick(obj, keys) {
    return keys.reduce((out, k) => {
      if (k in obj) out[k] = obj[k];
      return out;
    }, {})
  }

  export default function FinanceDashboard() {
    // --- Sidebar settings
    const [discountRate, setDiscountRate]           = useState(10);
    const [wacc, setWacc]                           = useState(8);
    const [growthRate, setGrowthRate]               = useState(3);
    const [taxRate, setTaxRate]                     = useState(20);
    const [inflationRate, setInflationRate]         = useState(2);
    const [laborRateIncrease, setLaborRateIncrease] = useState(4);
    const [allYearInputs, setAllYearInputs] = useState([{ id: Date.now(), ...defaults }])
    const [selectedFileName, setSelectedFileName]     = useState(null);
    const [analysisPeriod, setAnalysisPeriod]       = useState([2025, 2040])
    const [historicalData, setHistoricalData] = useState([]);
    const [forecastData,   setForecastData]   = useState([]);
    const [combinedData,   setCombinedData]   = useState([]);
  // Revenue chart state
  const [revenueChart, setRevenueChart] = useState({ data: [], layout: {} });
  const [trafficChart, setTrafficChart] = useState({ data: [], layout: {} });
  const [waterChart, setWaterChart] = useState({ data: [], layout: {} });
  const [cashBalance, setCashBalance] = useState({ data: [], layout: {} });
  const [breakEvenChart, setBreakEvenChart] = useState({ data: [], layout: {} });
  const [cashFlowChart, setCashFlowChart] = useState({ data: [], layout: {} });
  const [safetyChart, setSafetyChart] = useState({ data: [], layout: {} });
  const [capegChart, setCapegChart] = useState({ data: [], layout: {} });
  
  const [scenario, setScenario] = useState('Base Case');
  const [scenarioSeries,    setScenarioSeries]    = useState([]);  // the filtered time-series
  const [scenarioSummary,   setScenarioSummary]   = useState([]); 
  const [filteredSeries,   setFilteredSeries]   = useState([]); 
  const [loading, setLoading] = useState(true);
    // --- Scenario sliders ---
    const [bestCaseData, setBestCaseData]   = useState({
      conversionRateMultiplier: 0.2, averageOrderValueMultiplier: 0.1,
      cogsReduction: 0.25, interestCostReduction: 0.59,
      laborCostReduction: 0.19, materialCostReduction: 0.19,
      markdownAdjustment: 0.19, politicalRisk: 1, environmentalImpact: 1,
    });
    const [worstCaseData, setWorstCaseData] = useState({
      conversionRateMultiplier: 1.8, averageOrderValueMultiplier: 1.9,
      politicalRisk: 6, environmentalImpact: 8,
      cogsIncrease: 2.05, interestCostIncrease: 2.2,
      laborCostIncrease: 2.2, materialCostIncrease: 3.2,
      markdownAdjustment: 2.1,
    });
    const handleBestCaseChange  = (k,v)=>setBestCaseData(prev=>({...prev,[k]:v}));
    const handleWorstCaseChange = (k,v)=>setWorstCaseData(prev=>({...prev,[k]:v}));
    const [openBlocks, setOpenBlocks] = useState({});
    const [analysisStart, analysisEnd] = analysisPeriod;

  const [scenarioMetrics, setScenarioMetrics] = useState({
    base: null, best: null, worst: null, headline: null
  });
  useEffect(() => {
  // Always load from backend on mount for initial load.
  fetchInitialData();
  // eslint-disable-next-line
}, []);
 useEffect(() => {
    // Try localStorage first
    const savedBlocks = localStorage.getItem('pharmaAllYearInputs');
    const s = localStorage.getItem('pharmaAnalysisSettings');
    const b = localStorage.getItem('pharmaBestCaseData');
    const w = localStorage.getItem('pharmaWorstCaseData');

    if (savedBlocks && s && b && w) {
      setAllYearInputs(JSON.parse(savedBlocks));
      setSelectedFileName(localStorage.getItem('pharmaSelectedFileName'));
      const settings = JSON.parse(s);
      setDiscountRate(settings.discountRate);
      setWacc(settings.wacc);
      setGrowthRate(settings.growthRate);
      setTaxRate(settings.taxRate);
      setInflationRate(settings.inflationRate);
      setLaborRateIncrease(settings.laborRateIncrease);
      setBestCaseData(JSON.parse(b));
      setWorstCaseData(JSON.parse(w));
      setLoading(false);
    } else {
      // Otherwise, load from backend
      
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
      localStorage.setItem('pharmaAnalysisSettings', JSON.stringify({
        discountRate,
        wacc,
        growthRate,
        taxRate,
        inflationRate,
        laborRateIncrease
      }));
    }, [discountRate, wacc, growthRate, taxRate, inflationRate, laborRateIncrease]);
    
    useEffect(() => {
      localStorage.setItem('pharmaBestCaseData', JSON.stringify(bestCaseData));
    }, [bestCaseData]);
    
    useEffect(() => {
      localStorage.setItem('pharmaWorstCaseData', JSON.stringify(worstCaseData));
    }, [worstCaseData]);
  async function fetchInitialData() {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:8000/load-existing");
      console.log(resp)
      if (!resp.ok) throw new Error(await resp.text());
      const { years, fileName } = await resp.json();
      setAllYearInputs(years || []);
      setSelectedFileName(fileName || null);
      // set other defaults if needed
      if (years && years.length > 0) {
      await runInitialAnalysis(years);
    }
    } catch (err) {
      alert("Failed to load initial data: " + err.message);
    }
    setLoading(false);
  }
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <CircularProgress />
        <div>Loading data...</div>
      </div>
    );
  }
    async function runInitialAnalysis(yearsData) {
  const analysis_settings = { 
    taxRate, discountRate, wacc, perpetualGrowth: growthRate, inflationRate, 
    laborRateIncrease, selected_scenario: scenario 
  };
  const best_case_params = bestCaseData, worst_case_params = worstCaseData;
  const debts = yearsData.reduce((acc, ent) => {
    acc[ent.Year] = (ent.debts || []).map(d => ({
      name: d.name,
      amount: d.amount,
      interest_rate: d.interestRate,
      duration: d.duration,
    }));
    return acc;
  }, {});

  const payload = {
    historical_data: yearsData,
    debts: debts,
    analysis_settings,
    best_case_params,
    worst_case_params,
    start_year: analysisPeriod[0],
    end_year: analysisPeriod[1],
  };

  try {
    const resp = await fetch('http://localhost:8000/run-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error(await resp.text());
    const results = await resp.json();
    setScenarioMetrics(results);
    if(results.charts && results.charts.revenue) setRevenueChart(results.charts.revenue);
    if(results.charts && results.charts.profitability) setTrafficChart(results.charts.profitability);
    if(results.charts && results.charts.profit_bridge) setWaterChart(results.charts.profit_bridge);
    if(results.charts && results.charts.cash_balance) setCashBalance(results.charts.cash_balance);
    if(results.charts && results.charts.break_even) setBreakEvenChart(results.charts.break_even);
    if(results.charts && results.charts.cash_flow) setCashFlowChart(results.charts.cash_flow);
    if(results.charts && results.charts.safety_chart) setSafetyChart(results.charts.safety_chart);
    if(results.charts && results.charts.capeg_chart) setCapegChart(results.charts.capeg_chart);
    
    // if(results.charts && results.charts.profit_bridge) setWaterChart(results.charts.profit_bridge);
    
    // ...set other state variables as needed
  } catch (err) {
    alert("Analysis failed: " + err.message);
  }
}

  const toggleBlock = idx => {
    setOpenBlocks(ob => ({ 
      ...ob, 
      [idx]: !ob[idx] 
    }));
  };
    async function handleLoadExisting() {
      const json = localStorage.getItem('pharmaAllYearInputs')
      if (json) setAllYearInputs(JSON.parse(json))
        
      else alert("No saved scenario found")
      setAllYearInputs(JSON.parse(json));
      
    }

    const handleStartNew = (startYear) => {
      setAllYearInputs([{
        id: Date.now(),
    year: startYear,
    inputs:        { ...defaults.inputs },
    deprInputs:    { ...defaults.deprInputs },
    pinputs:       { ...defaults.pinputs },
    pcinputs:      { ...defaults.pcinputs },
    ucinputs:      { ...defaults.ucinputs },
    linputs:       { ...defaults.linputs },
    unitCosts:     { ...defaults.unitCosts },
    rawMaterialRows: [...defaults.rawMaterialRows],
    fwinputs:      { ...defaults.fwinputs },
    irrinputs:     { ...defaults.irrinputs },
    inflationRows: [...defaults.inflationRows],
    wcRows:        [...defaults.wcRows],
    deRows:        [...defaults.deRows],
    eqRows:        [...defaults.eqRows],
    debts:         [...defaults.debts],
    cogs:          0,
        // … etc …
      }])
    }
    // --- One big array of “year blocks” ---
  

   
    // Helpers
    const addYearBlock    = () => setAllYearInputs(prev=>[...prev,{
      ...prev[0], id:Date.now(), year:''
    }]);
    const removeYearBlock = idx => setAllYearInputs(prev=>prev.filter((_,i)=>i!==idx));
    const updateBlock     = (idx, slice, newSlice) => {
      setAllYearInputs(prev=>{
        const copy = [...prev];
        copy[idx] = { ...copy[idx], [slice]: newSlice };
        return copy;
      });
    };
    // === handleUploadFile: POST to /upload-excel ===
    async function handleUploadFile(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const resp = await fetch('http://localhost:8000/upload-excel', {
          method: 'POST',
          body: formData
        });
        if (!resp.ok) throw new Error(await resp.text());

        // after upload, load back the saved assumptions & recalc
        await loadExisting();
        
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload failed: ' + err.message);
      }
    };

    // Build the array we POST
    const buildYearsData = () =>
  allYearInputs.map(ent => {
    const snap = {
      // the year
      Year: ent.year,

      // capex inputs
      ...ent.inputs,

      // depreciation inputs
      ...ent.deprInputs,

      // production “lines” / selections (if your model needs them)
      ...ent.pinputs,

      // --- explicit capacity columns ---
     "Tablet Production Capacity":  ent.pcinputs?.["Tablet Production Capacity"] ?? 0,
      "Capsule Production Capacity": ent.pcinputs?.["Capsule Production Capacity"] ?? 0,
      "Liquid Production Capacity":  ent.pcinputs?.["Liquid Production Capacity"] ?? 0,
      "Ointment Production Capacity":ent.pcinputs?.["Ointment Production Capacity"] ?? 0,
      // utility costs
      ...ent.ucinputs,

      // labor inputs
      ...ent.linputs,

      // --- explicit cost & price columns ---
      "Tablet - Production Cost":   ent.unitCosts['Tablet - Production Cost'],
      "Capsule - Production Cost":  ent.unitCosts['Capsule - Production Cost'],
      "Liquid - Production Cost":   ent.unitCosts['Liquid - Production Cost'],
      "Ointment - Production Cost": ent.unitCosts['Ointment - Production Cost'],

      "Tablet - Selling Price":   ent.unitCosts['Tablet - Selling Price'],
      "Capsule - Selling Price":  ent.unitCosts['Capsule - Selling Price'],
      "Liquid - Selling Price":   ent.unitCosts['Liquid - Selling Price'],
      "Ointment - Selling Price": ent.unitCosts['Ointment - Selling Price'],

      // freight, commission, etc.
      ...ent.fwinputs,

      // IRR/NPV inputs
      ...ent.irrinputs,
    };

    // raw materials
    ent.rawMaterialRows.forEach(r => {
      snap['Raw Material Qty (kg)']    = r.quantity;
      snap['Raw Material Cost ($/kg)'] = r.unitCost;
    });

    // inflation rates by year
    ent.inflationRows.forEach(r => {
      snap[`Inflation Rate ${r.year} (%)`] = r.rate;
    });

    // working capital days
    ent.wcRows.forEach(r => {
      snap['AR Days']               = r.arDays;
      snap['Inventory Days']        = r.invDays;
      snap['Prepaid Days']          = r.prepaidDays;
      snap['Other Assets Days']     = r.otherAssetDays;
      snap['AP Days']               = r.apDays;
      snap['Other Liabilities Days']= r.olDays;
    });

    // debt & equity changes
    ent.deRows.forEach(r => {
      snap['Debt Δ ($MM)']   = r.debt;
      snap['Equity Δ ($MM)'] = r.equity;
    });

    // share schedule
    ent.eqRows.forEach(r => {
      snap['Shares Begin (MM)']       = r.begin;
      snap['Shares Issued (MM)']      = r.issued;
      snap['Shares End (MM)']         = r.ending;
      snap['Dividend Rate (%)']       = r.dividendRate;
      snap['Retained Earnings ($MM)'] = r.retained;
      snap['Dividends Paid ($MM)']    = r.dividendsPaid;
    });
    Object.assign(snap, ent.inputs, ent.deprInputs, ent.pinputs, ent.ucinputs,
                      ent.linputs, ent.unitCosts, ent.fwinputs, ent.irrinputs);
    return snap;
  });
    const debtsByYear = allYearInputs.reduce((acc, ent) => {
      acc[ent.year] = (ent.debts || []).map(d => ({
        name:          d.name,
        amount:        d.amount,
        interest_rate: d.interestRate,
        duration:      d.duration,
      }));
      return acc;
    }, {});
    
    
    
  async function loadExisting() {
    try {
      const resp = await fetch('http://localhost:8000/load-existing');
      if (!resp.ok) throw new Error(resp.statusText);
      const { years, fileName } = await resp.json();
      setSelectedFileName(fileName);
      const blocks = years.map(r => ({
        id: Date.now() + Math.random(),
  year: r.Year,
  inputs: { ...defaults.inputs, ...pick(r, Object.keys(defaults.inputs)) },
  deprInputs: { ...defaults.deprInputs, ...pick(r, Object.keys(defaults.deprInputs)) },
  pinputs: { ...defaults.pinputs, ...pick(r, Object.keys(defaults.pinputs)) },
  pcinputs: { ...defaults.pcinputs, ...pick(r, Object.keys(defaults.pcinputs)) },
  ucinputs: { ...defaults.ucinputs, ...pick(r, Object.keys(defaults.ucinputs)) },
  linputs: { ...defaults.linputs, ...pick(r, Object.keys(defaults.linputs)) },
  unitCosts: { ...defaults.unitCosts, ...pick(r, Object.keys(defaults.unitCosts)) },
  fwinputs: { ...defaults.fwinputs, ...pick(r, Object.keys(defaults.fwinputs)) },
  irrinputs: { ...defaults.irrinputs, ...pick(r, Object.keys(defaults.irrinputs)) },
  rawMaterialRows: r.rawMaterialRows && Array.isArray(r.rawMaterialRows) ? r.rawMaterialRows : [...defaults.rawMaterialRows],
  inflationRows:   r.inflationRows   && Array.isArray(r.inflationRows)   ? r.inflationRows   : [...defaults.inflationRows],
  wcRows:          r.wcRows          && Array.isArray(r.wcRows)          ? r.wcRows          : [...defaults.wcRows],
  deRows:          r.deRows          && Array.isArray(r.deRows)          ? r.deRows          : [...defaults.deRows],
  eqRows:          r.eqRows          && Array.isArray(r.eqRows)          ? r.eqRows          : [...defaults.eqRows],
  debts:           r.debts           && Array.isArray(r.debts)           ? r.debts           : [...defaults.debts],
  cogs:            r.cogs ?? 0,
      }));
      setAllYearInputs(blocks);
      // Re-run calculations
      await handleSaveAllData();
      
    } catch (err) {
      console.error('load-existing failed:', err);
      alert('Load existing failed: ' + err.message);
    }
  }
   // Inside FinanceDashboard.js

const handleSaveAllData = async () => {
  const years_data = buildYearsData();
  const analysis_settings = { 
    taxRate, discountRate, wacc, perpetualGrowth: growthRate, inflationRate, 
    laborRateIncrease, selected_scenario: scenario 
  };
  const best_case_params = bestCaseData, worst_case_params = worstCaseData;
  const payload = {
    historical_data: years_data,
    debts: debtsByYear,
    analysis_settings,
    best_case_params,
    worst_case_params,
    start_year: analysisPeriod[0],
    end_year: analysisPeriod[1],
  };

  try {
    const resp = await fetch('http://localhost:8000/run-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error(await resp.text());
    const results = await resp.json();
    console.log(results)
    // Parse results into state for charts, tables, summaries, etc.
    setScenarioMetrics(results);
    if(results.charts && results.charts.revenue) setRevenueChart(results.charts.revenue);
    if(results.charts && results.charts.profitability) setTrafficChart(results.charts.profitability);
    if(results.charts && results.charts.profit_bridge) setTrafficChart(results.charts.profit_bridge);
    if(results.charts && results.charts.profit_bridge) setTrafficChart(results.charts.profit_bridge);
    
    // ...set other state variables as needed
  } catch (err) {
    alert("Analysis failed: " + err.message);
  }
};


  // Save / Export
  //   const handleSaveAllData = async () => {
  //     const years_data        = buildYearsData();
    
  //     const analysis_settings = { taxRate:taxRate, discountRate, wacc, perpetualGrowth:growthRate, inflationRate, laborRateIncrease,selected_scenario: scenario };
  //     const best_case_params  = bestCaseData, worst_case_params = worstCaseData;
  //     const payload = {
  //   historical_data:   years_data,
  //   debts:             debtsByYear,
  //   analysis_settings,
  //   best_case_params,
  //   worst_case_params,
  //   start_year:        analysisPeriod[0],
  //   end_year:          analysisPeriod[1],
  // };
      
     
      
  //   };
  // Fetch Revenue Chart when combinedData updates
  

    
    return (
      
      <Box display="flex" height="100vh">
        <Sidebar
          discountRate={discountRate}   setDiscountRate={setDiscountRate}
          wacc={wacc}                   setWacc={setWacc}
          growthRate={growthRate}       setGrowthRate={setGrowthRate}
          taxRate={taxRate}             setTaxRate={setTaxRate}
          inflationRate={inflationRate} setInflationRate={setInflationRate}
          laborRateIncrease={laborRateIncrease} setLaborRateIncrease={setLaborRateIncrease}
          analysisPeriod={analysisPeriod}    setAnalysisPeriod={setAnalysisPeriod}                                   
          onLoadExisting={handleLoadExisting}
          onStartNew={handleStartNew}
          selectedFileName={selectedFileName}
          onUploadFile={handleUploadFile}
          scenario={scenario}
          setScenario={setScenario}
        />
        <Box flex={1} p={0} sx={{ overflowY:'auto', height:'100vh' }}>
          <Card sx={{ m:4, borderRadius:0 }}>
            <CardContent>
              <Typography variant="h5">Pharma Financial Dashboard</Typography>

              {allYearInputs.map((ent, idx) => {
    const isOpen = !!openBlocks[idx];
    return (
      <Box key={ent.id} mb={4} p={2} border="1px solid #eee" borderRadius={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton
              size="small"
              onClick={() => toggleBlock(idx)}
              sx={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>

            <TextField
              label="Year"
              select
              size="small"
              sx={{ minWidth: 120 }}
              value={ent.year || ''}
              onChange={e => updateBlock(idx, 'year', +e.target.value)}
            >
              <MenuItem value="">Select Year</MenuItem>
              {Array.from({ length: 16 }, (_, i) => 2025 + i).map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>
          </Box>

          <IconButton
            size="small"
            onClick={() => removeYearBlock(idx)}
            disabled={allYearInputs.length === 1}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Collapse in={isOpen}>
          <InfrastructureAndCapExCard
            yearData={ent.inputs || {}}
            onUpdateField={(f, v) => updateBlock(idx, 'inputs', { ...ent.inputs, [f]: v })}
          />
          <DepreciationScheduleCard
            yearData={ent.deprInputs}
            onUpdateField={(f, v) => updateBlock(idx, 'deprInputs', { ...ent.deprInputs, [f]: v })}
          />
          <ProductsToManufactureCard
            inputs={ent.pinputs}
            onUpdateField={(f, v) => updateBlock(idx, 'pinputs', { ...ent.pinputs, [f]: v })}
          />
          <ProductionCapacityCard
            inputs={ent.pcinputs }
            onUpdateField={(f, v) => updateBlock(idx, 'pcinputs', { ...ent.pcinputs, [f]: v })}
          />
          <UtilityCostsCard 
            inputs={ent.ucinputs || {}}
            onUpdateField={(f, v) => updateBlock(idx, 'ucinputs', { ...ent.ucinputs, [f]: v })}
          />
          <LaborStructureCard
            inputs={{ 'Production Manager':        0.150,
      'Production Operators':      0.300,
      'Process Engineer':          0.120,
      'Process Technician':        0.100,
      'QA Pharmacist':             0.180,
      'Production Pharmacist':     0.180,
      'Manufacturing Chemist':     0.160,
      'Analytical Chemist':        0.140,
      'General Manager':           0.200,
      'Sales & Marketing Manager': 0.180,
      'Accountant':                0.050,
      'Procurement Officer':       0.060,
      'Support Staff':             0.040,
      'Packers':                   0.030,
      'Secretary':                 0.025,
      'Security':                  0.020,
      'Cleaner':                   0.015,
      'Movers':                    0.010,
      'Canteen Staff':             0.018,
      'Driver':                    0.012 }}
            onUpdateField={(f, v) => console.log("update", f, v)}
          />
          <ProductionEstimatesSection
            initialEstimates={ent.productionEstimates}
            onChangeEstimates={vals => updateBlock(idx, 'productionEstimates', vals)}
          />
          <UnitProductionCostCard
            inputs={ent.unitCosts || {}}
            onUpdateField={(f, v) => updateBlock(idx, 'unitCosts', { ...ent.unitCosts, [f]: v })}
          />
          <RawMaterialCostCard
            initialRows={ent.rawMaterialRows }
            onChange={rows => updateBlock(idx, 'rawMaterialRows', rows)}
          />
          <FreightWarehousingCommissionCard
            inputs={ent.fwinputs }
            onUpdateField={(f, v) => updateBlock(idx, 'fwinputs', { ...ent.fwinputs, [f]: v })}
          />
          <IRRNPVParametersCard
            inputs={ent.irrinputs || {} }
            onUpdateField={(f, v) => updateBlock(idx, 'irrinputs', { ...ent.irrinputs, [f]: v })}
          />
          <InflationTotalUtilityCostCard
            initialRows={ent.inflationRows}
            onChange={rows => updateBlock(idx, 'inflationRows', rows)}
          />
          <WorkingCapitalAssumptionsCard
            initialRows={ent.wcRows}
            onChange={rows => updateBlock(idx, 'wcRows', rows)}
          />
          <ChangeInDebtEquityCard
            initialRows={ent.deRows}
            onChange={rows => updateBlock(idx, 'deRows', rows)}
          />
          <EquityScheduleCard
            initialRows={ent.eqRows}
            onChange={rows => updateBlock(idx, 'eqRows', rows)}
          />
          <DebtIssuedBreakdownCard
            debts={Array.isArray(ent.debts) ? ent.debts : []}
           totalDebtIssued={(Array.isArray(ent.debts) ? ent.debts : []).reduce((s, d) => s + d.amount, 0)}
            onAddDebt={() => {
              const newDebts = [...(ent.debts || []), { id: Date.now(), name: '', amount: 0, interestRate: 0, duration: 1 }];
              updateBlock(idx, 'debts', newDebts);
            }}
            onRemoveDebt={id => {
              const newDebts = (ent.debts || []).filter(d => d.id !== id);
              updateBlock(idx, 'debts', newDebts);
            }}
            onUpdateDebt={(id, field, value) => {
              const newDebts = (ent.debts || []).map(d =>
                d.id === id ? { ...d, [field]: value } : d
              );
              updateBlock(idx, 'debts', newDebts);
            }}
          />
        </Collapse>
      </Box>
    );
  })}

              <Button variant="outlined" onClick={addYearBlock}>Add Year</Button>
              <Box mt={3}>
                <Button variant="contained" onClick={handleSaveAllData}>
                  Save All Data
                </Button>
              </Box>

              <Box my={3}>
                <BestCaseScenarioCard data={bestCaseData} onChange={handleBestCaseChange}/>
                <WorstCaseScenarioCard data={worstCaseData} onChange={handleWorstCaseChange}/>
              </Box>

              <Box mb={3}>
                <SummaryCard metrics={scenarioMetrics}/>
              </Box>

              <Box mb={3}>
                <CombinedPerformanceCard
                
                  revenueChart={revenueChart}
                  trafficChart={trafficChart}
                  waterChart={waterChart}
                  cashBalance= {cashBalance}
                  breakEvenChart={breakEvenChart}
                  cashFlowChart={cashFlowChart}
                  safetyChart={safetyChart}
                  capegChart={capegChart}
                  
/> 
              </Box>

              <Box p={3}>
                <DashboardTabs/>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }
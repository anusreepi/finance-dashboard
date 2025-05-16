import React, { useState, useEffect } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Collapse,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
  Select,
  MenuItem
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon  from '@mui/icons-material/ArrowForwardIos';
import SidebarSlider        from './SidebarSlider';
import '../css/Sidebar.css';

const Sidebar = ({
  discountRate, setDiscountRate,
  wacc, setWacc,
  growthRate, setGrowthRate,
  taxRate, setTaxRate,
  inflationRate, setInflationRate,
  laborRateIncrease, setLaborRateIncrease,
  analysisPeriod, setAnalysisPeriod,
  onLoadExisting,
  onStartNew,
  selectedFileName,
  onUploadFile
}) => {
  const [collapsed, setCollapsed]     = useState(false);
  const [existingChecked, setExistingChecked] = useState(false);
  const [newChecked, setNewChecked]   = useState(false);
  const [fileChecked, setFileChecked] = useState(false);
  const [startYear, setStartYear]     = useState(2025);
  const [scenario, setScenario] = useState('Base Case');
  const toggleSidebar = () => setCollapsed(c => !c);

  const sliders = [
    { label: 'Discount Rate (%)', value: discountRate, setValue: setDiscountRate, max: 30 },
    { label: 'WACC (%)',           value: wacc,         setValue: setWacc,       max: 20 },
    { label: 'Growth Rate (%)',    value: growthRate,   setValue: setGrowthRate, max: 10 },
    { label: 'Tax Rate (%)',       value: taxRate,      setValue: setTaxRate,    max: 50 },
    { label: 'Inflation Rate (%)', value: inflationRate, setValue: setInflationRate, max: 10 },
    { label: 'Labor Increase (%)', value: laborRateIncrease, setValue: setLaborRateIncrease, max: 20 },
  ];

  useEffect(() => {
    if (existingChecked) onLoadExisting();
  }, [existingChecked]);

  useEffect(() => {
    if (newChecked) onStartNew(startYear);
  }, [newChecked, startYear]);
  
  useEffect(() => {
    if (selectedFileName) {
      setFileChecked(true);
      setExistingChecked(false);
      setNewChecked(false);
    }
  }, [selectedFileName]);
  const handleFileChange = e => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    onUploadFile(file);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 60 : 320,
        '& .MuiDrawer-paper': {
          width: collapsed ? 60 : 320,
          transition: 'width 0.3s',
        },
      }}
    >
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        {!collapsed && <Typography variant="h6">Pharma Dashboard</Typography>}
        <IconButton onClick={toggleSidebar} size="small">
          {collapsed
            ? <ArrowForwardIosIcon fontSize="small" />
            : <ArrowBackIosNewIcon  fontSize="small" />}
        </IconButton>
      </Box>

      <Collapse in={!collapsed}>
        <Box p={2}>
          <Typography variant="subtitle2">File Management</Typography>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={existingChecked} onChange={() => { setExistingChecked(true); setNewChecked(false); setFileChecked(false); }} />}
              label="Load Existing"
            />
            <FormControlLabel
              control={<Radio checked={newChecked} onChange={() => { setExistingChecked(false); setNewChecked(true); setFileChecked(false); }} />}
              label="Start New"
            />
            <FormControlLabel
              control={<Radio checked={fileChecked} onChange={() => { setExistingChecked(false); setNewChecked(false); setFileChecked(true); }} />}
              label="Select a File"
            />
          </RadioGroup>

          {newChecked && (
            <Box my={1}>
              <Typography>Starting Year</Typography>
              <Input
                type="number"
                value={startYear}
                onChange={e => setStartYear(+e.target.value)}
                fullWidth
              />
            </Box>
          )}

          {fileChecked && (
            <Box mt={1}>
              <Input
                type="file"
                onChange={handleFileChange}
                fullWidth
              />
              {selectedFileName && (
                <Typography variant="caption" mt={1} display="block">
                  Loaded: {selectedFileName}
                </Typography>
              )}
            </Box>
          )}

          <Typography variant="subtitle2" mt={3}>Analysis Settings</Typography>
          {sliders.map((s,i) => <SidebarSlider key={i} {...s} />)}

          <Typography variant="subtitle2" mt={3}>Scenario</Typography>
          <Select
              fullWidth
              size="small"
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Base Case">Base Case</MenuItem>
              <MenuItem value="Best Case">Best Case</MenuItem>
              <MenuItem value="Worst Case">Worst Case</MenuItem>
            </Select>

          <Typography variant="subtitle2" mt={3}>Analysis Period</Typography>
          <SidebarSlider
            value={analysisPeriod}
            setValue={setAnalysisPeriod}
            min={2020}
            max={2040}
            step={1}
          />
        </Box>
      </Collapse>
    </Drawer>
  );
};

export default Sidebar;

// components/Sidebar.jsx
import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  Divider,
  Box,
  Collapse,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Input,
  Slider
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SidebarSlider from './SidebarSlider';
import '../css/Sidebar.css';

const Sidebar = ({
  discountRate, setDiscountRate,
  wacc, setWacc,
  growthRate, setGrowthRate,
  taxRate, setTaxRate,
  inflationRate, setInflationRate,
  laborRateIncrease, setLaborRateIncrease,
  analysisPeriod, setAnalysisPeriod
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [existingChecked, setExistingChecked] = useState(false);
  const [newChecked, setNewChecked] = useState(false);
  const [fileChecked, setFileChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleSidebar = () => setCollapsed(!collapsed);
   

  const sliders = [
    { label: 'Discount Rate (%)', value: discountRate, setValue: setDiscountRate, max: 30 },
    { label: 'WACC (%)', value: wacc, setValue: setWacc, max: 20 },
    { label: 'Perpetual Growth Rate (%)', value: growthRate, setValue: setGrowthRate, max: 5 },
    { label: 'Tax Rate (%)', value: taxRate, setValue: setTaxRate, max: 50 },
    { label: 'Inflation Rate (%)', value: inflationRate, setValue: setInflationRate, max: 10 },
    { label: 'Direct Labor Rate Increase (%)', value: laborRateIncrease, setValue: setLaborRateIncrease, max: 20 }
  ];

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 60 : 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 60 : 320,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
        },
      }}
    >
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center" className="box-icon">
        {!collapsed && <Typography variant="h6"></Typography>}
        <IconButton onClick={toggleSidebar} size="small">
          {collapsed ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" />}
        </IconButton>
      </Box>
      

      <Collapse in={!collapsed}>
        <Box p={2} className="sidebar-content">
          <Typography variant="subtitle2" gutterBottom>File Management</Typography>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={existingChecked} onChange={(e) => setExistingChecked(e.target.checked)} />}
              label="Load Existing"
            />
            <FormControlLabel
              control={<Radio checked={newChecked} onChange={(e) => setNewChecked(e.target.checked)} />}
              label="Start New"
            />
            <FormControlLabel
              control={<Radio checked={fileChecked} onChange={(e) => setFileChecked(e.target.checked)} />}
              label="Select a File"
            />
          </RadioGroup>

          {fileChecked && (
            <Box mt={1}>
              <Input type="file" onChange={handleFileChange} fullWidth size="small" />
              {selectedFile && (
                <Typography variant="caption" display="block" mt={1}>Selected: {selectedFile}</Typography>
              )}
            </Box>
          )}

          <Typography variant="subtitle2" mt={3}>Analysis Settings</Typography>
          {sliders.map((s, i) => (
            <SidebarSlider key={i} {...s} />
          ))}

          <Typography variant="subtitle2" gutterBottom>Scenario Selection</Typography>
          <Select fullWidth size="small" defaultValue="Base Case" sx={{ mb: 2 }}>
            <MenuItem value="Base Case">Base Case</MenuItem>
            <MenuItem value="Best Case">Best Case</MenuItem>
            <MenuItem value="Worst Case">Worst Case</MenuItem>
          </Select>
          <Box className="analysis-period-slider">
            <Typography variant="body2" gutterBottom>Select Analysis Period (Years)</Typography>
            <SidebarSlider
                value={analysisPeriod}
                setValue={setAnalysisPeriod}
                min={2020}
                max={2040}
                step={1}
                />
          </Box>
        </Box>
      </Collapse>
    </Drawer>
  );
};

export default Sidebar;

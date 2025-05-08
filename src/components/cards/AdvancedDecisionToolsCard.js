// src/components/cards/AdvancedDecisionToolsCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Autocomplete
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarSlider from '../SidebarSlider';
import CustomNumericField from '../CustomNumericField';  

const BUDGET_LINES = [
  'Total Marketing Budget',
  'COGS Budget',
  'Labor Budget',
  'Office Rent Budget'
];

const SENSITIVITY_OPTIONS = [
  'Average Item Value',
  'COGS Percentage',
  'Conversion Rate',
  'Traffic Volume',
  'Labor Cost'
];

export default function AdvancedDecisionToolsCard() {
  const [open, setOpen] = useState(false);

  // Sliders
  const [forecastYears, setForecastYears] = useState(10);
  const [sensitivityChange, setSensitivityChange] = useState(10);
  const [numSimulations, setNumSimulations] = useState(500);
  const [trafficIncrease, setTrafficIncrease] = useState(10);
  const [confidenceLevel, setConfidenceLevel] = useState(95);

  // Dropdowns / multiselect / numeric
  const [budgetLine, setBudgetLine] = useState(BUDGET_LINES[0]);
  const [totalBudget, setTotalBudget] = useState(100000);
  const [sensitivityVars, setSensitivityVars] = useState([
    'Average Item Value',
    'COGS Percentage',
  ]);

  const adjustBudget = delta => {
    setTotalBudget(prev => Math.max(0, prev + delta));
  };

  return (
    <Card sx={{ mx: 4, my: 3, borderRadius: 0 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Advanced Decision Making Tools
        </Typography>

        <Accordion
          expanded={open}
          onChange={() => setOpen(o => !o)}
          sx={{ mt: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Decision Making Tools Parameters</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={12}>
              {/* Left column */}
              <Grid item xs={12} md={6}>
                <SidebarSlider
                  label="Forecast Years"
                  value={forecastYears}
                  setValue={setForecastYears}
                  min={1}
                  max={20}
                  step={1}
                />

                <SidebarSlider
                  label="Number of Simulations"
                  value={numSimulations}
                  setValue={setNumSimulations}
                  min={100}
                  max={5000}
                  step={100}
                />

                <SidebarSlider
                  label="Confidence Level (%)"
                  value={confidenceLevel}
                  setValue={setConfidenceLevel}
                  min={80}
                  max={99}
                  step={0.1}
                />
      <Box mt={1}>
      {/* external label */}
      <Typography variant="body2" fontWeight={500} gutterBottom>
        Variables for Sensitivity Analysis
      </Typography>

      {/* Autocomplete without its own label */}
      <Autocomplete
        multiple
        options={SENSITIVITY_OPTIONS}
        value={sensitivityVars}
        onChange={(e, v) => setSensitivityVars(v)}
        renderInput={params => (
          <TextField
            {...params}
            size="small"
            placeholder="Select one or more…"
            fullWidth
          />
        )}
        sx={{ width: 340 , height:45 }}
      />
    </Box>
                
              </Grid>

              {/* Right column */}
              <Grid item xs={12} md={6}>
              <SidebarSlider
                  label="Sensitivity Change Percentage"
                  value={sensitivityChange}
                  setValue={setSensitivityChange}
                  min={5}
                  max={20}
                  step={0.5}
                />
                <SidebarSlider
                  label="Traffic Increase for NeuralTools (%)"
                  value={trafficIncrease}
                  setValue={setTrafficIncrease}
                  min={5}
                  max={50}
                  step={1}
                />

     
                <Box mt={2}>
      
      <Typography variant="body2" fontWeight={500} gutterBottom>
        Select Budget Line for Optimization
      </Typography>

      
      <TextField
        select
        value={budgetLine}
        onChange={e => setBudgetLine(e.target.value)}
        placeholder="Choose a line…"    
        
        size="small"
        sx={{ width: 350 }}
      >
        {BUDGET_LINES.map(line => (
          <MenuItem key={line} value={line}>
            {line}
          </MenuItem>
        ))}
      </TextField>
    </Box>
               

    <Box display="flex" alignItems="center" mt={2}>
        <CustomNumericField
            label="Total Marketing Budget Amount ($)"
            value={totalBudget}
            onChange={val => setTotalBudget(val)}
            step={1000}
            width={350}    
            height={30}       
        />
        </Box>
        </Grid>
         </Grid>
 
          </AccordionDetails>
        </Accordion>
         {/* Action buttons */}
         <Grid container spacing={2} mt={3}>
              <Grid item>
                <Button variant="outlined">Run Tree Analysis</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Run Neural Prediction</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Run Sensitivity Analysis</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Run Optimization</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Run Forecasting Stats</Button>
              </Grid>
              <Grid item>
                <Button  variant="outlined">
                  Run Risk Analysis (Schedule Risk)
                </Button>
              </Grid>
            </Grid>
            {/* Export Options */}
                    <Box mt={4}>
                      <Typography variant="h6" gutterBottom>
                        Export Options 🔗
                      </Typography>
                      <Button variant="outlined" color="primary">
                        Download Detailed Analysis Report
                      </Button>
                    </Box>

      </CardContent>
    </Card>
  );
}

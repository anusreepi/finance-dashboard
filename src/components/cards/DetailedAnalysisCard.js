// components/DetailedAnalysisCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  IconButton,
  TextField,
  Slider,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SidebarSlider from '../SidebarSlider';

const VARIABLE_OPTIONS = [
  'Total Orders',
  'Net Revenue',
  'Gross Profit',
  'EBITDA',
  'Net Income'
];
const DISTRIBUTIONS = ['Normal', 'Uniform', 'Triangular'];
export default function DetailedAnalysisCard() {
  // --- Analysis Parameters Accordion ---
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [forecastYears, setForecastYears] = useState(10);
  const [numSimulations, setNumSimulations] = useState(500);
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [distribution, setDistribution] = useState('Normal');
  // --- What-If Analysis State ---
  const [numAdjustments, setNumAdjustments] = useState(1);
  const [adjustments, setAdjustments] = useState([
    { year: 2025, variable: VARIABLE_OPTIONS[0], multiplier: 1 },
  ]);

  const updateAdjustment = (idx, key, value) => {
    setAdjustments(adjs => {
      const copy = [...adjs];
      copy[idx] = { ...copy[idx], [key]: value };
      return copy;
    });
  };

  const changeNum = delta => {
    setNumAdjustments(n => {
      const next = Math.max(1, n + delta);
      // add or trim adjustments array
      setAdjustments(adjs => {
        let c = [...adjs];
        while (c.length < next) c.push({ year: 2025, variable: VARIABLE_OPTIONS[0], multiplier: 1 });
        return c.slice(0, next);
      });
      return next;
    });
  };

  // dummy what-if results
  const whatIfResults = [
    { year: 2025, netRevenue: '$0', grossProfit: '$0', EBITDA: '$0', netIncome: '$0', totalOrders: 0 }
  ];

  // --- Goal Seek State ---
  const [goalOpen, setGoalOpen] = useState(false);
  const [goalYear, setGoalYear] = useState(2025);
  const [targetMargin, setTargetMargin] = useState(15);
  const [seekVariable, setSeekVariable] = useState(VARIABLE_OPTIONS[0]);
  const currentMargin = '26.17%';
  const targetMarginDisplay = '30.09%';

  return (
    <Card sx={{ mx: 4, my: 3, borderRadius: 0 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Detailed Analysis
        </Typography>

        {/* Analysis Parameters */}
        <Accordion expanded={analysisOpen} onChange={() => setAnalysisOpen(o => !o)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Analysis Parameters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxWidth: 600, width: '100%', pr: 2 }}>
              {/* Forecast Years */}
              <SidebarSlider
                label="Forecast Years"
                value={forecastYears}
                setValue={setForecastYears}
                min={1}
                max={20}
                step={1}
              />

              {/* Number of Simulations */}
              <SidebarSlider
                label="Number of Simulations"
                value={numSimulations}
                setValue={setNumSimulations}
                min={100}
                max={5000}
                step={100}
              />

              {/* Confidence Level */}
              <SidebarSlider
                label="Confidence Level (%)"
                value={confidenceLevel}
                setValue={setConfidenceLevel}
                min={80}
                max={99}
                step={0.1}
              />

              {/* Distribution Select */}
              <Box mt={2}>
                <Typography variant="body2" gutterBottom>
                  Select Distribution for Monte Carlo Simulation
                </Typography>
                <Select
                  value={distribution}
                  onChange={e => setDistribution(e.target.value)}
                  fullWidth
                  size="small"
                >
                  {DISTRIBUTIONS.map(d => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box mt={2}>
          <Button variant="outlined" color="primary">
            Run Monte Carlo Simulation
          </Button>
        </Box>

        {/* What-If Analysis */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            What-If Analysis for E-commerce
          </Typography>

          {/* # adjustments control */}
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Typography>Number of Adjustments</Typography>
            <IconButton size="small" onClick={() => changeNum(-1)}><RemoveIcon/></IconButton>
            <Typography>{numAdjustments}</Typography>
            <IconButton size="small" onClick={() => changeNum(1)}><AddIcon/></IconButton>
          </Box>

          {/* each adjustment accordion */}
          {adjustments.map((adj, i) => (
            <Accordion key={i} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Adjustment {i + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {/* Year picker */}
                  <TextField
                    label="Year"
                    type="number"
                    size="small"
                    value={adj.year}
                    onChange={e => updateAdjustment(i, 'year', +e.target.value)}
                  />
                  {/* Variable dropdown */}
                  <Select
                    label="Variable"
                    size="small"
                    value={adj.variable}
                    onChange={e => updateAdjustment(i, 'variable', e.target.value)}
                  >
                    {VARIABLE_OPTIONS.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                  </Select>
                  {/* Multiplier slider */}
                  <Box flexGrow={1}>
                    <Typography gutterBottom>Multiplier: {adj.multiplier.toFixed(2)}</Typography>
                    <Slider
                      min={0.5}
                      max={1.5}
                      step={0.01}
                      value={adj.multiplier}
                      onChange={(e, v) => updateAdjustment(i, 'multiplier', v)}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* What-If Results */}
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              What-If Analysis Results:
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Net Revenue</TableCell>
                  <TableCell>Gross Profit</TableCell>
                  <TableCell>EBITDA</TableCell>
                  <TableCell>Net Income</TableCell>
                  <TableCell>Total Orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {whatIfResults.map((row,i) => (
                  <TableRow key={i}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.netRevenue}</TableCell>
                    <TableCell>{row.grossProfit}</TableCell>
                    <TableCell>{row.EBITDA}</TableCell>
                    <TableCell>{row.netIncome}</TableCell>
                    <TableCell>{row.totalOrders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Goal Seek Analysis */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Goal Seek Analysis
          </Typography>

          <Accordion expanded={goalOpen} onChange={() => setGoalOpen(o => !o)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Goal Seek Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {/* Year */}
                <TextField
                  label="Year to Adjust"
                  type="number"
                  size="small"
                  value={goalYear}
                  onChange={e => setGoalYear(+e.target.value)}
                />
                {/* Target % slider */}
                <Box flexGrow={1}>
                  <Typography gutterBottom>Target Profit Margin Increase (%)</Typography>
                  <Slider
                    min={0}
                    max={50}
                    step={0.1}
                    value={targetMargin}
                    onChange={(e, v) => setTargetMargin(v)}
                  />
                </Box>
                {/* Variable */}
                <Select
                  label="Variable to Adjust"
                  size="small"
                  value={seekVariable}
                  onChange={e => setSeekVariable(e.target.value)}
                >
                  {VARIABLE_OPTIONS.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                </Select>
              </Box>
              <Box mt={2}>
                <Typography>Current Profit Margin for {goalYear}: {currentMargin}</Typography>
                <Typography>Target Profit Margin: {targetMarginDisplay}</Typography>
                <Box mt={1}>
                  <Button variant="contained">Run Goal Seek</Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

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

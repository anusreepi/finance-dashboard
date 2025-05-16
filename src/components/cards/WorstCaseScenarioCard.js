import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import SidebarSlider from '../SidebarSlider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function WorstCaseScenarioCard({ data, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Worst Case Scenario Parameters</Typography>
          <IconButton onClick={toggleExpand}>
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>

        {expanded && (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {/* Left Column */}
            <Box width="48%">
              <SidebarSlider
                label="Conversion Rate Multiplier"
                value={data.conversionRateMultiplier}
                setValue={val => onChange('conversionRateMultiplier', val)}
                min={0.5}
                max={1}
                step={0.01}
              />
              <SidebarSlider
                label="Average Order Value Multiplier"
                value={data.averageOrderValueMultiplier}
                setValue={val => onChange('averageOrderValueMultiplier', val)}
                min={0.5}
                max={1}
                step={0.01}
              />
              <SidebarSlider
                label="Cost Inflation Rate (%)"
                value={data.costInflationRate}
                setValue={val => onChange('costInflationRate', val)}
                min={0}
                max={15}
                step={0.1}
              />
              <SidebarSlider
                label="Interest Rate (%)"
                value={data.interestRate}
                setValue={val => onChange('interestRate', val)}
                min={0}
                max={25}
                step={0.1}
              />
             
            </Box>

            {/* Right Column */}
            <Box width="48%">
              <SidebarSlider
                label="Volume Growth Multiplier"
                value={data.volumeGrowthMultiplier}
                setValue={val => onChange('volumeGrowthMultiplier', val)}
                min={0.5}
                max={1}
                step={0.01}
              />
              <SidebarSlider
                label="COGS Increase Multiplier"
                value={data.cogsIncreaseMultiplier}
                setValue={val => onChange('cogsIncreaseMultiplier', val)}
                min={1}
                max={1.2}
                step={0.01}
              />
              <SidebarSlider
                label="Working-Capital Days Increase"
                value={data.workingCapitalDaysIncrease}
                setValue={val => onChange('workingCapitalDaysIncrease', val)}
                min={1}
                max={2}
                step={0.01}
              />
               <SidebarSlider
                label="Selling-Price Multiplier"
                value={data.sellingPriceMultiplier}
                setValue={val => onChange('sellingPriceMultiplier', val)}
                min={0.5}
                max={1}
                step={0.01}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

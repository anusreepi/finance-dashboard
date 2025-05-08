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

const WorstCaseScenarioCard = ({ data, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Card className="marketing-card" sx={{ mb: 3 }}>
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
                setValue={(val) => onChange('conversionRateMultiplier', val)}
                min={0.5}
                max={1}
                step={0.01}
              />
              <SidebarSlider
                label="Average Order Value Multiplier"
                value={data.averageOrderValueMultiplier}
                setValue={(val) => onChange('averageOrderValueMultiplier', val)}
                min={0.5}
                max={1}
                step={0.01}
              />
              <SidebarSlider
                label="Political Risk (1–5)"
                value={data.politicalRisk}
                setValue={(val) => onChange('politicalRisk', val)}
                min={1}
                max={5}
                step={1}
              />
              <SidebarSlider
                label="Environmental Impact (1–5)"
                value={data.environmentalImpact}
                setValue={(val) => onChange('environmentalImpact', val)}
                min={1}
                max={5}
                step={1}
              />
            </Box>

            {/* Right Column */}
            <Box width="48%">
              <SidebarSlider
                label="COGS Increase (%)"
                value={data.cogsIncrease}
                setValue={(val) => onChange('cogsIncrease', val)}
                min={1}
                max={1.2}
                step={0.01}
              />
              <SidebarSlider
                label="Interest Cost Increase"
                value={data.interestCostIncrease}
                setValue={(val) => onChange('interestCostIncrease', val)}
                min={1}
                max={1.5}
                step={0.01}
              />
              <SidebarSlider
                label="Labor Cost Increase"
                value={data.laborCostIncrease}
                setValue={(val) => onChange('laborCostIncrease', val)}
                min={1}
                max={1.5}
                step={0.01}
              />
              <SidebarSlider
                label="Material Cost Increase"
                value={data.materialCostIncrease}
                setValue={(val) => onChange('materialCostIncrease', val)}
                min={1}
                max={1.5}
                step={0.01}
              />
              <SidebarSlider
                label="Markdown Adjustment"
                value={data.markdownAdjustment}
                setValue={(val) => onChange('markdownAdjustment', val)}
                min={1}
                max={1.2}
                step={0.01}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WorstCaseScenarioCard;

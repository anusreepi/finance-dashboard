import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Plot from 'react-plotly.js';

const CombinedPerformanceCard = ({  revenueChart ,trafficChart,waterChart,cashBalance,breakEvenChart,cashFlowChart,safetyChart,capegChart}) => {
  const plotConfig = { displaylogo: false, responsive: true };
  const baseLayout = { margin: { l: 40, r: 40, t: 20, b: 30 }, hovermode: 'x unified' };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Financial Performance Analysis
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2} mt={2}>

          {/* 1. Revenue & Profitability from backend */}
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Revenue & Profitability Trends</Typography>
            <Plot
              data={revenueChart.data}
              layout={{ ...revenueChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box>

           {/* 1. Revenue & Profitability from backend */}
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Profitability Margin Trends</Typography>
            <Plot
              data={trafficChart.data}
              layout={{ ...trafficChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box>
          
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Profit Bridge Analysis</Typography>
            <Plot
              data={waterChart.data}
              layout={{ ...waterChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box>
       <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Cash Balance Over Time</Typography>
            <Plot
              data={cashBalance.data}
              layout={{ ...cashBalance.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box> 
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Break-Even Analysis</Typography>
            <Plot
              data={breakEvenChart.data}
              layout={{ ...breakEvenChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box>  
           
           <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Cash Flow Forecast</Typography>
            <Plot
              data={cashFlowChart.data}
              layout={{ ...cashFlowChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box>  
          
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Margin of Safety Analysis</Typography>
            <Plot
              data={safetyChart.data}
              layout={{ ...safetyChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box> 
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Margin of Safety Analysis</Typography>
            <Plot
              data={capegChart.data}
              layout={{ ...capegChart.layout, margin: { l: 40, r: 40, t: 30, b: 30 } }}
              config={plotConfig}
              style={{ width: '100%', height: '200px' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CombinedPerformanceCard;

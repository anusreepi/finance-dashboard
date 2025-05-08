// src/components/cards/CombinedPerformanceCard.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Plot from 'react-plotly.js';
import '../../css/CombinedPerformanceCard.css';

const CombinedPerformanceCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // dummy API data
    setData([
      {
        year: 2025,
        revenue: 5000000,
        margin: 0.10,
        cash: 1000000,
        breakeven: 2000000,
        actualSales: 3000000,
        cac: 300,
        ltvToCac: 3.0,
        cashOps: 2000000,
        cashInvest: -1000000,
        netCashFlow: 3000000,
        grossMargin: 0.50,
        ebitdaMargin: 0.40,
        netMargin: 0.30,
        consideration: 250,
        conversion: 10000,
        marginOfSafetyDollar: 10000000,
        marginOfSafetyPercent: 0.60,
        discounts: 2000000,
        cogs: 4000000,
        opex: 3000000,
      },
      {
        year: 2026,
        revenue: 8000000,
        margin: 0.20,
        cash: 3000000,
        breakeven: 2500000,
        actualSales: 5000000,
        cac: 320,
        ltvToCac: 3.4,
        cashOps: 3000000,
        cashInvest: -1000000,
        netCashFlow: 4000000,
        grossMargin: 0.52,
        ebitdaMargin: 0.41,
        netMargin: 0.32,
        consideration: 270,
        conversion: 12000,
        marginOfSafetyDollar: 11000000,
        marginOfSafetyPercent: 0.62,
        discounts: 2200000,
        cogs: 4200000,
        opex: 3200000,
      },
      {
        year: 2027,
        revenue: 12000000,
        margin: 0.30,
        cash: 8000000,
        breakeven: 4000000,
        actualSales: 8000000,
        cac: 290,
        ltvToCac: 4.5,
        cashOps: 4000000,
        cashInvest: -1000000,
        netCashFlow: 5000000,
        grossMargin: 0.55,
        ebitdaMargin: 0.45,
        netMargin: 0.35,
        consideration: 300,
        conversion: 14000,
        marginOfSafetyDollar: 12000000,
        marginOfSafetyPercent: 0.64,
        discounts: 2500000,
        cogs: 4600000,
        opex: 3500000,
      },
    ]);
  }, []);

  // extract arrays for Plotly traces
  const years = data.map(d => d.year);
  const revenue = data.map(d => d.revenue);
  const margin = data.map(d => d.margin);
  const cash = data.map(d => d.cash);
  const breakeven = data.map(d => d.breakeven);
  const actualSales = data.map(d => d.actualSales);
  const cac = data.map(d => d.cac);
  const ltvToCac = data.map(d => d.ltvToCac);
  const cashOps = data.map(d => d.cashOps);
  const cashInvest = data.map(d => d.cashInvest);
  const netCashFlow = data.map(d => d.netCashFlow);
  const grossMargin = data.map(d => d.grossMargin);
  const ebitdaMargin = data.map(d => d.ebitdaMargin);
  const netMargin = data.map(d => d.netMargin);
  const consideration = data.map(d => d.consideration);
  const conversion = data.map(d => d.conversion);
  const mosDollar = data.map(d => d.marginOfSafetyDollar);
  const mosPercent = data.map(d => d.marginOfSafetyPercent);
  const discounts = data.map(d => d.discounts);
  const cogs = data.map(d => d.cogs);
  const opex = data.map(d => d.opex);

  const plotConfig = {
    displaylogo: false,
    responsive: true,
  };

  const baseLayout = {
    margin: { l: 40, r: 40, t: 20, b: 30 },
    hovermode: 'x unified',
  };

  return (
    <Card className="combined-performance-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Financial Performance Analysis
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={2}
          mt={2}
        >
          {/* 1. Revenue & Profitability */}
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Revenue & Profitability</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: revenue,
                  type: 'bar',
                  name: 'Revenue',
                  marker: { color: '#8884d8' },
                  yaxis: 'y1',
                },
                {
                  x: years,
                  y: margin,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Margin',
                  marker: { color: '#ff7300' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Revenue ($)' },
                yaxis2: {
                  title: 'Margin (%)',
                  overlaying: 'y',
                  side: 'right',
                  tickformat: ',.0%',
                },
                legend: { orientation: 'h', y: -0.2 },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 2. Cash Balance */}
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Cash Balance</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: cash,
                  type: 'scatter',
                  mode: 'lines',
                  fill: 'tozeroy',
                  marker: { color: '#82ca9d' },
                  name: 'Cash',
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Cash Balance ($)' },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 3. Break-Even Analysis */}
          <Box flex="0 1 32%" sx={{ minWidth: 240 }}>
            <Typography variant="subtitle1">Break-Even Analysis</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: breakeven,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Break-Even',
                  marker: { color: '#d62728' },
                },
                {
                  x: years,
                  y: actualSales,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Actual Sales',
                  marker: { color: '#2ca02c' },
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Revenue ($)' },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 4. LTV vs CAC */}
          <Box flex="0 1 32%" sx={{ minWidth: 240, mt: 2 }}>
            <Typography variant="subtitle1">LTV vs CAC</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: cac,
                  type: 'bar',
                  name: 'CAC',
                  marker: { color: '#ff7300' },
                  yaxis: 'y1',
                },
                {
                  x: years,
                  y: ltvToCac,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'LTV/CAC',
                  marker: { color: '#8884d8' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'CAC ($)' },
                yaxis2: {
                  title: 'LTV/CAC',
                  overlaying: 'y',
                  side: 'right',
                },
                legend: { orientation: 'h', y: -0.2 },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 5. Cash Flow Forecast */}
          <Box flex="0 1 32%" sx={{ minWidth: 240, mt: 2 }}>
            <Typography variant="subtitle1">Cash Flow Forecast</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: cashOps,
                  type: 'bar',
                  name: 'Ops',
                  marker: { color: '#00C49F' },
                },
                {
                  x: years,
                  y: cashInvest,
                  type: 'bar',
                  name: 'Invest',
                  marker: { color: '#FF8042' },
                },
                {
                  x: years,
                  y: netCashFlow,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Net CF',
                  marker: { color: '#0000FF' },
                },
              ]}
              layout={{
                ...baseLayout,
                barmode: 'stack',
                xaxis: { title: 'Year' },
                yaxis: { title: 'Cash Flow ($)' },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 6. Margin of Safety */}
          <Box flex="0 1 32%" sx={{ minWidth: 240, mt: 2 }}>
            <Typography variant="subtitle1">Margin of Safety</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: mosDollar,
                  type: 'bar',
                  name: 'Margin $',
                  marker: { color: '#8884d8' },
                  yaxis: 'y1',
                },
                {
                  x: years,
                  y: mosPercent,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Margin %',
                  marker: { color: '#ff7300' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Margin ($)' },
                yaxis2: {
                  title: 'Margin (%)',
                  overlaying: 'y',
                  side: 'right',
                  tickformat: ',.0%',
                },
                legend: { orientation: 'h', y: -0.2 },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 7. Profitability Margin Trends */}
          <Box flex="0 1 32%" sx={{ minWidth: 240, mt: 2 }}>
            <Typography variant="subtitle1">Profitability Margin Trends</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: grossMargin,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Gross',
                  marker: { color: '#00C49F' },
                },
                {
                  x: years,
                  y: ebitdaMargin,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'EBITDA',
                  marker: { color: '#ff7300' },
                },
                {
                  x: years,
                  y: netMargin,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Net',
                  marker: { color: '#8884d8' },
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Margin (%)', tickformat: ',.0%' },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 8. Funnel Metrics */}
          <Box flex="0 1 32%" sx={{ minWidth: 240, mt: 2 }}>
            <Typography variant="subtitle1">Funnel Metrics</Typography>
            <Plot
              data={[
                {
                  x: years,
                  y: consideration,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Consideration',
                  marker: { color: '#1f77b4' },
                  yaxis: 'y1',
                },
                {
                  x: years,
                  y: conversion,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Conversion',
                  marker: { color: '#2ca02c' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Consideration (%)', tickformat: ',.0%' },
                yaxis2: {
                  title: 'Conversion (count)',
                  overlaying: 'y',
                  side: 'right',
                },
                legend: { orientation: 'h', y: -0.2 },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>

          {/* 9. Profit Bridge Analysis */}
          <Box flex="0 1 32%" sx={{ minWidth: 240, mt: 2 }}>
            <Typography variant="subtitle1">Profit Bridge Analysis</Typography>
            <Plot
              data={[
                {
                  x: ['Gross', 'Discounts', 'COGS', 'Opex', 'Net'],
                  y: [revenue[0], -discounts[0], -cogs[0], -opex[0], revenue[0] - discounts[0] - cogs[0] - opex[0]],
                  type: 'waterfall',
                  measure: ['absolute','relative','relative','relative','total'],
                  textposition: 'outside',
                  texttemplate: '%{y:$,}',
                  connector: { line: { color: 'rgb(63, 63, 63)' } },
                },
              ]}
              layout={{
                ...baseLayout,
                xaxis: { title: '' },
                yaxis: { title: 'Amount ($)' },
              }}
              style={{ width: '100%', height: '200px' }}
              config={plotConfig}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CombinedPerformanceCard;

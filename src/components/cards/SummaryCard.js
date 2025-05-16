
import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const SummaryCard = ({ metrics }) => {
  // Dummy summary data for now
  if (!metrics.base || !metrics.headline) return null;
  console.log(metrics)
  const { base, best, worst, headline } = metrics;

  const summaryData = [
    {
      scenario: "Base Case",  
      ...metrics.base
    },
    {
      scenario: "Best Case",
      ...metrics.best
    },
    {
      scenario: "Worst Case",
      ...metrics.worst
    },
   
  ];

  return (
    <Card className="marketing-card" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Scenario Analysis: Base Case
        </Typography>

        <Box display="flex" justifyContent="space-between" my={2}>
          <Box>
            <Typography variant="h6">Revenue Growth</Typography>
            <Typography variant="h4" color="success.main"> {headline["Revenue Growth (%)"].toFixed(1)}%</Typography>
            <Typography color={headline["Revenue Growth Δ (%)"] >= 0 ? "success.main" : "error.main"}>
      {headline["Revenue Growth Δ (%)"] >= 0 ? "↑" : "↓"}
      {Math.abs(headline["Revenue Growth Δ (%)"]).toFixed(1)}%
    </Typography>
          </Box>
          <Box>
            <Typography variant="h6">EBITDA Margin</Typography>
            <Typography variant="h4">{headline["EBITDA Margin (%)"].toFixed(1)}%</Typography>
            
            <Typography color={headline["EBITDA Margin Δ (%)"] >= 0 ? "success.main" : "error.main"}>
      {headline["EBITDA Margin Δ (%)"] >= 0 ? "↑" : "↓"}
      {Math.abs(headline["EBITDA Margin Δ (%)"]).toFixed(1)}%
    </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Enterprise Value</Typography>
            <Typography variant="h4"> ${headline["Enterprise Value ($M)"].toFixed(2)} M</Typography>
          </Box>
        </Box>

        <Typography variant="h6" mt={4}>Summary of Analyses</Typography>
        <Table size="small" sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Scenario</TableCell>
              <TableCell>Net Income ($M)</TableCell>
              <TableCell>EBITDA ($M)</TableCell>
              <TableCell>IRR (%)</TableCell>
              <TableCell>NPV ($M)</TableCell>
              <TableCell>Payback Period (Orders)</TableCell>
              <TableCell>Gross Profit Margin (%)</TableCell>
              <TableCell>Net Profit Margin (%)</TableCell>
              <TableCell>Net Cash Flow ($M)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaryData.map((row) => (
              <TableRow key={row.scenario}>
              <TableCell>{row.scenario}</TableCell>
              <TableCell>{row["Net Income ($M)"]?.toFixed(2)}</TableCell>
              <TableCell>{row["EBITDA ($M)"]?.toFixed(2)}</TableCell>
              <TableCell>{row["IRR (%)"]?.toFixed(1)}</TableCell>
              <TableCell>{row["NPV ($M)"]?.toFixed(2)}</TableCell>
              <TableCell>{row["Payback Period (yrs)"]}</TableCell>
              <TableCell>{row["Gross Profit Margin (%)"]?.toFixed(1)}</TableCell>
              <TableCell>{row["Net Profit Margin (%)"]?.toFixed(1)}</TableCell>
              <TableCell>{row["Net Cash Flow ($M)"]?.toFixed(2)}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="h6" mt={4}>Key Implications</Typography>
        <ul>
          <li><strong>Base Case:</strong> Stable performance baseline with moderate growth and risk.</li>
          <li><strong>Best Case:</strong> Optimistic growth with improved efficiencies and reduced costs.</li>
          <li><strong>Worst Case:</strong> Challenging conditions with higher costs and reduced revenue.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;

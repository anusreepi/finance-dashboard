// src/components/cards/SummaryCard.js
import React from 'react';
import { Card, CardContent, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const SummaryCard = () => {
  // Dummy summary data for now
  const summaryData = [
    { scenario: 'Base Case', netIncome: 9.2, ebitda: 9.2, irr: 53.3, npv: 15.3, payback: 0.04, gpm: 61.7, npm: 53.1 },
    { scenario: 'Best Case', netIncome: 9.4, ebitda: 12.6, irr: 50.6, npv: 15.6, payback: 0.03, gpm: 62.5, npm: 41.7 },
    { scenario: 'Worst Case', netIncome: 3.8, ebitda: 5.0, irr: 50.1, npv: 6.1, payback: 0.07, gpm: 55.7, npm: 32.4 }
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
            <Typography variant="h4" color="success.main">20.1%</Typography>
            <Typography color="success.main">↑ 13.3%</Typography>
          </Box>
          <Box>
            <Typography variant="h6">EBITDA Margin</Typography>
            <Typography variant="h4">53.2%</Typography>
            <Typography color="success.main">↑ 0.0%</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Enterprise Value</Typography>
            <Typography variant="h4">$2.2M</Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {summaryData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.scenario}</TableCell>
                <TableCell>{row.netIncome}</TableCell>
                <TableCell>{row.ebitda}</TableCell>
                <TableCell>{row.irr}</TableCell>
                <TableCell>{row.npv}</TableCell>
                <TableCell>{row.payback}</TableCell>
                <TableCell>{row.gpm}</TableCell>
                <TableCell>{row.npm}</TableCell>
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

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function DCFValuationCard() {
  const [dcf, setDcf] = useState({
    enterpriseValue: 0,
    equityValue: 0,
    bridgeData: [],
  });

  useEffect(() => {
    // dummy bridge data (replace with your API later!)
    const bridge = [
      { label: 'Present Value of FCF', value: 18_000_000 },
      { label: 'Terminal Value (PV)',    value: 35_000_000 },
      { label: 'Net Debt',               value: -10_000_000 },
      { label: 'Equity Value',           value: 43_000_000 },
    ];

    // compute enterprise = PV + Terminal, equity = sum of all bars
    const ev = bridge[0].value + bridge[1].value;
    const eq = bridge.reduce((sum, b) => sum + b.value, 0);

    setDcf({ enterpriseValue: ev, equityValue: eq, bridgeData: bridge });
  }, []);

  const fmtM = num => `$${(num / 1e6).toFixed(1)}M`;

  return (
    <Card sx={{ mx: 4, my: 3, borderRadius: 0 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          DCF Valuation Summary
        </Typography>

        <Grid container spacing={10} alignItems="flex-start">
          {/* left metrics */}
          <Grid item xs={12} md={12}>
            <Box mb={3} width={220}>
              <Typography variant="subtitle2">Enterprise Value</Typography>
              <Typography variant="h4">{fmtM(dcf.enterpriseValue)}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Equity Value</Typography>
              <Typography variant="h4">{fmtM(dcf.equityValue)}</Typography>
            </Box>
          </Grid>

          {/* right waterfall chart */}
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              DCF Valuation Bridge
            </Typography>
            <ResponsiveContainer width={500} height={300}>
              <BarChart
                data={dcf.bridgeData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis tickFormatter={val => `${(val / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={val => fmtM(val)} />
                <Bar dataKey="value" isAnimationActive={false}>
                  {dcf.bridgeData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={
                        idx === dcf.bridgeData.length - 1
                          ? '#0000FF'
                          : entry.value >= 0
                          ? '#00C49F'
                          : '#D62728'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

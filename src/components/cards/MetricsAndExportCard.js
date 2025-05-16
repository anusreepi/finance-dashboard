import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';

export default function MetricsAndExportCard() {
  const [opRows, setOpRows] = useState([]);
  const [custRows, setCustRows] = useState([]);
  const [irr, setIrr] = useState(0);

  useEffect(() => {
    // simulate API
    setOpRows([
      { id: 0, metric: 'Revenue Growth', current: '13.3%' },
      { id: 1, metric: 'Gross Margin',   current: '61.7%' },
      { id: 2, metric: 'EBITDA Margin',  current: '53.2%' },
      { id: 3, metric: 'Return on Equity', current: '15.4%' },
      { id: 4, metric: 'Asset Turnover', current: '0.36' },
    ]);

    setCustRows(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        year: 2025 + i,
        npv: `$${(Math.random()*10_000_000 + 2_000_000).toLocaleString()}`,
        cac: `$${(Math.random()*50).toFixed(2)}`,
        contribution: `$${(Math.random()*100).toFixed(0)}`,
        ltv: `$${(Math.random()*200).toFixed(0)}`,
      }))
    );

    
    setIrr(50.45);
  }, []);

  const opColumns = [
    { field: 'metric', headerName: 'Metric', flex: 1 },
    { field: 'current', headerName: 'Current', width: 120 },
  ];

  const custColumns = [
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'npv', headerName: 'NPV', flex: 1 },
    { field: 'cac', headerName: 'CAC', flex: 1 },
    { field: 'contribution', headerName: 'Contribution Margin Per Order', flex: 1.5 },
    { field: 'ltv', headerName: 'LTV', flex: 1 },
  ];

  return (
    <Card sx={{ mx: 4, my: 3, borderRadius: 0 }}>
      <CardContent>
        <Grid container spacing={12}>
          {/* Operational Metrics */}
          <Grid item xs={12} md={12}>
            <Typography variant="h5" gutterBottom>
              Operational Metrics
            </Typography>
            <Box height={300} width={300}>
              <DataGrid
                rows={opRows}
                columns={opColumns}
                hideFooter
                disableColumnMenu
                sx={{
                  '.MuiDataGrid-root': { border: 0 },
                  '.MuiDataGrid-cell': { borderBottom: 'none' }
                }}
              />
            </Box>
          </Grid>

          {/* Customer Metrics */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Customer Metrics
            </Typography>

            <Typography variant="h3" sx={{ mb: 2 }}>
              {irr.toFixed(2)}%
            </Typography>

            <Box height={300}>
              <DataGrid
                rows={custRows}
                columns={custColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                sx={{
                  '.MuiDataGrid-root': { border: 0 },
                  '.MuiDataGrid-cell': { borderBottom: 'none' }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Export Options */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Export Options&nbsp;
            <Typography component="span" variant="body2" color="text.secondary">
              🔗
            </Typography>
          </Typography>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Download Complete Financial Report
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

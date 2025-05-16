import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';


const SCHEDULE_OPTIONS = [
  'Income Statement',
  'Balance Sheet',
  'Cash Flow Statement',
];


const DUMMY_DATA = {
  'Income Statement': {
    columns: [
      { field: 'year', headerName: 'Year', width: 100 },
      { field: 'netRevenue', headerName: 'Net Revenue', flex: 1 },
      { field: 'grossProfit', headerName: 'Gross Profit', flex: 1 },
      { field: 'ebitda', headerName: 'EBITDA', flex: 1 },
      { field: 'netIncome', headerName: 'Net Income', flex: 1 },
      { field: 'totalOrders', headerName: 'Total Orders', flex: 1 },
    ],
    rows: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      year: 2025 + i,
      netRevenue: `$${(Math.random() * 2_000_000).toLocaleString()}`,
      grossProfit: `$${(Math.random() * 1_000_000).toLocaleString()}`,
      ebitda: `$${(Math.random() * 500_000 - 250_000).toLocaleString()}`,
      netIncome: `$${(Math.random() * 300_000 - 100_000).toLocaleString()}`,
      totalOrders: Math.floor(Math.random() * 20000),
    })),
  },
  'Balance Sheet': {
    columns: [
      { field: 'year', headerName: 'Year', width: 100 },
      { field: 'assets', headerName: 'Total Assets', flex: 1 },
      { field: 'liabilities', headerName: 'Total Liabilities', flex: 1 },
      { field: 'equity', headerName: 'Total Equity', flex: 1 },
    ],
    rows: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      year: 2025 + i,
      assets: `$${(Math.random() * 50_000_000).toLocaleString()}`,
      liabilities: `$${(Math.random() * 30_000_000).toLocaleString()}`,
      equity: `$${(Math.random() * 20_000_000).toLocaleString()}`,
    })),
  },
  'Cash Flow Statement': {
    columns: [
      { field: 'year', headerName: 'Year', width: 100 },
      { field: 'operatingCF', headerName: 'Operating CF', flex: 1 },
      { field: 'investingCF', headerName: 'Investing CF', flex: 1 },
      { field: 'financingCF', headerName: 'Financing CF', flex: 1 },
      { field: 'netCF', headerName: 'Net Cash Flow', flex: 1 },
    ],
    rows: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      year: 2025 + i,
      operatingCF: `$${(Math.random() * 10_000_000).toLocaleString()}`,
      investingCF: `$${(Math.random() * -5_000_000).toLocaleString()}`,
      financingCF: `$${(Math.random() * 5_000_000).toLocaleString()}`,
      netCF: `$${(Math.random() * 8_000_000 - 1_000_000).toLocaleString()}`,
    })),
  },
};

export default function FinancialSchedulesCard() {
  const [selected, setSelected] = useState(['Income Statement']);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
   
    const key = selected[0];
    if (key && DUMMY_DATA[key]) {
      setColumns(DUMMY_DATA[key].columns);
      setRows(DUMMY_DATA[key].rows);
    } else {
      setColumns([]);
      setRows([]);
    }
  }, [selected]);

  return (
    <Card sx={{ mx: 4, my: 3, borderRadius: 0 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Financial Schedules
        </Typography>

        <Box mb={2} width="50%">
          <Autocomplete
            multiple
            options={SCHEDULE_OPTIONS}
            value={selected}
            onChange={(_, v) => setSelected(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Schedules to View"
                placeholder="Schedules"
                size="small"
              />
            )}
          />
        </Box>

        <Box height={400}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            sx={{
              '.MuiDataGrid-root': { border: 0 },
              '.MuiDataGrid-cell': { borderBottom: 'none' },
            }}
          />
        </Box>
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

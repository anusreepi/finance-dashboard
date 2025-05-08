import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider
} from '@mui/material';
import MetricsAndExportCard from './MetricsAndExportCard';
import FinancialSchedulesCard from './FinancialSchedulesCard';
import DCFValuationCard from './DCFValuationCard';
import DetailedAnalysisCard from './DetailedAnalysisCard';
import AdvancedDecisionToolsCard from './AdvancedDecisionToolsCard';

<Box flex={1} p={0} sx={{ overflowY: 'auto', height: '100vh' }}>
    
</Box>

function TabPanel({ children, value, index, ...props }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function DashboardTabs() {
  const [tab, setTab] = useState(0);
  const handleChange = (_, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Key Metrics" />
        <Tab label="Financial Schedules" />
        <Tab label="DCF Analysis" />
        <Tab label="Detailed Analysis" />
        <Tab label="Advanced Tools" />
      </Tabs>

      <Divider />

      {/* Key Metrics panel */}
      <TabPanel value={tab} index={0}>
        <Typography variant="h4" gutterBottom>
          Operational Metrics
        </Typography>
        <MetricsAndExportCard />
        <Box height={32} />
      </TabPanel>

      {/* Financial Schedules panel */}
      <TabPanel value={tab} index={1}>
        <Typography variant="h4" gutterBottom>
          Financial Schedules
        </Typography>
        <FinancialSchedulesCard />
      </TabPanel>

      {/* DCF Analysis panel */}
      <TabPanel value={tab} index={2}>
        <Typography variant="h4" gutterBottom>
          DCF Analysis
        </Typography>
        <DCFValuationCard />
      </TabPanel>

      {/* Detailed Analysis panel */}
      <TabPanel value={tab} index={3}>
        <Typography variant="h4" gutterBottom>
          Detailed Analysis
        </Typography>
        <DetailedAnalysisCard />
      </TabPanel>

      {/* Advanced Tools panel */}
      <TabPanel value={tab} index={4}>
        <Typography variant="h4" gutterBottom>
          Advanced Tools
        </Typography>
        <AdvancedDecisionToolsCard />
      </TabPanel>
    </Box>
  );
}

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomNumericField from '../CustomNumericField';

/**
 * EstimatedUtilityCostCard
 * Captures daily utility usage & rates, and dynamic annual operating schedules.
 * Based on INPUT: Estimated Utility Cost – Longevity Pharmaceuticals Swaziland citeturn22file0
 * 
 * Props:
 * - initialUtilities: Array<{ key: string; label: string; usage: number; rate: number;}>
 * - initialSchedule: Array<{ year: number; days: number; hours: number;}>
 * - onUtilitiesChange(updatedUtilities)
 * - onScheduleChange(updatedSchedule)
 */
export default function EstimatedUtilityCostCard({
  initialUtilities = [
    { key: 'Electricity', label: 'Electricity per day (kW/day)', usage: 750.0, rate: 0.25 },
    { key: 'Water',       label: 'Water consumption per day (m³/day)', usage: 50.0,  rate: 2.145 },
    { key: 'Steam',       label: 'Steam per hour (ton/hr)', usage: 0.0,    rate: 2.145 },
  ],
  initialSchedule = [ { year: 1, days: 260, hours: 10 } ],
  onUtilitiesChange,
  onScheduleChange,
}) {
  const [utilities, setUtilities] = useState(initialUtilities);
  const [schedule, setSchedule]     = useState(initialSchedule);

  const handleUtilityChange = (index, field) => (val) => {
    const value = typeof val === 'number' ? val : parseFloat(val.target.value);
    setUtilities(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: isNaN(value) ? 0 : value };
      onUtilitiesChange?.(updated);
      return updated;
    });
  };

  const addScheduleYear = () => {
    const nextYear = schedule.length > 0 ? Math.max(...schedule.map(r => r.year)) + 1 : 1;
    setSchedule(prev => {
      const updated = [...prev, { year: nextYear, days: 0, hours: 0 }];
      onScheduleChange?.(updated);
      return updated;
    });
  };

  const removeScheduleYear = (yearToRemove) => {
    if (schedule.length === 1) return;
    setSchedule(prev => {
      const updated = prev.filter(r => r.year !== yearToRemove);
      onScheduleChange?.(updated);
      return updated;
    });
  };

  const handleScheduleChange = (year, field) => (val) => {
    const value = typeof val === 'number' ? val : parseFloat(val.target.value);
    setSchedule(prev => {
      const updated = prev.map(r =>
        r.year === year ? { ...r, [field]: isNaN(value) ? 0 : value } : r
      );
      onScheduleChange?.(updated);
      return updated;
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Estimated Utility Cost
        </Typography>

        {/* Utility Usage & Rate inputs */}
        <Box mb={3}>
          {utilities.map((u, i) => (
            <Box key={u.key} display="flex" gap={2} mb={2}>
              <Box flex={1}>
                <Typography variant="subtitle2" gutterBottom>{u.label}</Typography>
                <CustomNumericField
                  label="Usage"
                  value={u.usage}
                  onChange={handleUtilityChange(i, 'usage')}
                  step={1}
                />
              </Box>
              <Box flex={1}>
                <Typography variant="subtitle2" gutterBottom>Rate ($/{u.key === 'Water' ? 'm³' : u.key === 'Electricity' ? 'kWh' : 'ton'})</Typography>
                <CustomNumericField
                  label="Rate"
                  value={u.rate}
                  onChange={handleUtilityChange(i, 'rate')}
                  step={0.01}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Annual Operating Schedule */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1">Annual Operating Schedule</Typography>
          <Button size="small" variant="outlined" onClick={addScheduleYear}>
            Add Year
          </Button>
        </Box>
        {schedule.map(r => (
          <Box key={r.year} display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="subtitle2">Year {r.year}:</Typography>
            <CustomNumericField
              label="Days"
              value={r.days}
              onChange={handleScheduleChange(r.year, 'days')}
              step={1}
            />
            <CustomNumericField
              label="Hours/day"
              value={r.hours}
              onChange={handleScheduleChange(r.year, 'hours')}
              step={1}
            />
            <IconButton
              size="small"
              onClick={() => removeScheduleYear(r.year)}
              disabled={schedule.length === 1}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

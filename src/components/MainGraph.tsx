import { AgCharts } from 'ag-charts-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import type { AgChartOptions } from 'ag-charts-community';
import Box from '@mui/material/Box';
import { useMemo, useEffect } from 'react';
import { useBreathingData } from '../context/BreathingDataContext';

ModuleRegistry.registerModules([AllCommunityModule]);

const PARTICIPANT_COLORS = [
  '#792842', '#4A90E2', '#50C878', '#F39C12',
  '#9B59B6', '#E74C3C', '#1ABC9C', '#34495E'
];

type MainGraphProps = {
  latestOnly?: boolean;
};

const MainGraph = ({ latestOnly = false }: MainGraphProps) => {
  const { cleanedData, participants, setLatestOnly } = useBreathingData();

  // ✅ Sync prop → context
  useEffect(() => {
    setLatestOnly(latestOnly);
  }, [latestOnly, setLatestOnly]);

  // ✅ Chart config
  const chartOptions = useMemo<AgChartOptions>(() => ({
    theme: {
      overrides: {
        common: {
          title: { color: '#ffffff' },
          subtitle: { color: '#ffffff' },
          legend: {
            item: {
              label: { color: '#ffffff' },
            },
          },
          axes: {
            number: {
              label: { color: '#ffffff' },
              title: { color: '#ffffff' },
            },
          },
        },
      },
    },
    background: { fill: 'transparent' },
    data: cleanedData,

    series: participants.map((pid, i) => ({
      type: 'line' as const,
      xKey: 't_min',
      yKey: `participant_${pid}`,
      yName: `Participant ${pid}`,
      stroke: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length],
      strokeWidth: 2,
      marker: { enabled: false },
    })),

    axes: {
      x: {
        type: 'number',
        position: 'bottom',
        title: { text: 'Time (minutes)' },
        min: 0,
        max: 7,
      },
      y: {
        type: 'number',
        position: 'left',
      },
    },

    tooltip: { enabled: true }
  }), [cleanedData, participants]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <AgCharts options={chartOptions} />
    </Box>
  );
};

export default MainGraph;

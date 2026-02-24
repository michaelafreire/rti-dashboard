import { AgCharts } from 'ag-charts-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

const MainGraph = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transformedData, setTransformedData] = useState<any[]>([]);

  useEffect(() => {
    const updateData = async () => {
      try {
        const response = await fetch('./pressure.json'); // fetch from public folder
        const pressureData = await response.json();

        const transformed = pressureData.map((point: { t_sec: number; raw: number }) => ({
          t_min: point.t_sec / 60,
          raw: point.raw,
        }));

        setTransformedData(transformed);
      } catch (err) {
        console.error('Failed to fetch pressure data:', err);
      }
    };

    updateData(); // run immediately on mount

    const interval = setInterval(updateData, 2500); // fetch every 2.5s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const chartOptions = {
    theme: {
      overrides: {
        common: {
          title: { color: '#ffffff' },
          axes: {
            label: { color: '#ffffff' },
            title: { color: '#ffffff' },
          },
          legend: {
            item: { label: { color: '#ffffff' } },
          },
        },
        area: {
          series: { interpolation: { type: 'smooth' } as const, strokeWidth: 2, fillOpacity: 0.7 },
        },
      },
    },
    background: { fill: 'transparent' },
    data: transformedData,
    // title: { text: 'Breathing Rate' },
    series: [
      {
        type: 'line' as const,
        xKey: 't_min',
        yKey: 'raw',
        yName: 'Pressure',
        stroke: '#792842',
        strokeWidth: 1,
        marker: { enabled: false },
      },
    ],
    axes: {
      x: {
        type: 'number',
        position: 'bottom',
        min: 0,
        max: 7,
        interval: 1,
        title: { text: 'Time (minutes)', enabled: true, color: '#ffffff', fontSize: 12 },
        label: { color: '#ffffff' },
        tick: { color: '#ffffff', size: 0 },
        line: { strokeWidth: 0 },
        gridLine: { enabled: false },
        crossLines: [
          { type: 'range' as const, range: [0, 0.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [1, 1.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [2, 2.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [3, 3.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [4, 4.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [5, 5.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [6, 6.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
          { type: 'range' as const, range: [7, 7.01], stroke: '#ffffff', strokeWidth: 1, lineDash: [5, 5] },
        ],
      },
      y: {
        type: 'number',
        position: 'left',
        title: { text: 'Pressure (raw)', enabled: true, color: '#ffffff', fontSize: 12 },
        label: { color: '#ffffff' },
      },
    },
    tooltip: { position: { placement: ['right', 'left', 'top', 'bottom'] } },
  };

  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <AgCharts options={chartOptions as any} />
    </Box>
  );
};

export default MainGraph;

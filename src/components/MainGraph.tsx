import { AgCharts } from 'ag-charts-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import Box from '@mui/material/Box';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';

ModuleRegistry.registerModules([AllCommunityModule]);

// Colors for different participants
const PARTICIPANT_COLORS = ['#792842', '#4A90E2', '#50C878', '#F39C12', '#9B59B6', '#E74C3C', '#1ABC9C', '#34495E'];

interface DataPoint {
  t_min: number;
  [key: string]: number;
}

const MainGraph = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    const updateData = async () => {
      try {
        console.log('Fetching data...');
        const { data: pressureData, error } = await supabase
          .from('breath_raw')
          .select('t_sec, raw, participant_id')
          .order('t_sec', { ascending: true })
          .range(0, 99999); // Fetch up to 100k rows

        if (error) {
          console.error(error);
          return;
        }

        console.log(`Fetched ${pressureData?.length || 0} rows`);

        // Get unique participants
        const uniqueParticipants = Array.from(
          new Set(pressureData.map((p: { participant_id: string }) => p.participant_id))
        ).sort();

        console.log(`Found ${uniqueParticipants.length} participants:`, uniqueParticipants);
        setParticipants(uniqueParticipants);

        // Group data by time, with each participant as a separate column
        const dataByTime = new Map<number, DataPoint>();

        pressureData.forEach((point: { t_sec: number; raw: number; participant_id: string }) => {
          const t_min = point.t_sec / 60;

          if (!dataByTime.has(t_min)) {
            dataByTime.set(t_min, { t_min });
          }

          const timePoint = dataByTime.get(t_min);
          if (timePoint) {
            timePoint[`participant_${point.participant_id}`] = point.raw;
          }
        });

        const transformed = Array.from(dataByTime.values()).sort((a, b) => a.t_min - b.t_min);
        setTransformedData(transformed);
      } catch (err) {
        console.error('Failed to fetch breathing data:', err);
      }
    };

    updateData(); // run immediately on mount

    const interval = setInterval(updateData, 1000); // fetch every 1 second for live updates

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const chartOptions = useMemo(() => ({
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
    series: participants.map((participantId, index) => ({
      type: 'line' as const,
      xKey: 't_min',
      yKey: `participant_${participantId}`,
      yName: `Participant ${participantId}`,
      stroke: PARTICIPANT_COLORS[index % PARTICIPANT_COLORS.length],
      strokeWidth: 2,
      marker: { enabled: false },
    })),
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
  }), [transformedData, participants]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <AgCharts options={chartOptions as any} />
    </Box>
  );
};

export default MainGraph;

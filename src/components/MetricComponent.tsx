import { AgCharts } from "ag-charts-react";
import {
  LegendModule,
  DonutSeriesModule,
  ModuleRegistry,
} from "ag-charts-community";
import Box from "@mui/material/Box";
import { useMemo } from 'react';
import { useBreathingData } from '../context/BreathingDataContext';

// Register the modules
ModuleRegistry.registerModules([DonutSeriesModule, LegendModule]);

function MetricComponent() {
  const { metrics } = useBreathingData();

  const chartData = useMemo(() => {
    const values = Object.values(metrics);
    const avgCompliance = values.length > 0
      ? values.reduce((sum, m) => sum + m.compliance, 0) / values.length
      : 0;

    const compliance = Math.max(0, Math.min(100, avgCompliance));
    const remaining = Math.max(0, 100 - compliance);

    return [
      { asset: 'Compliance', amount: Number(compliance.toFixed(1)) },
      { asset: 'Remaining', amount: Number(remaining.toFixed(1)) },
    ];
  }, [metrics]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    data: chartData,
    background: { fill: "transparent" },
    theme: {
      palette: {
        fills: [
          "rgba(127, 198, 161, 0.35)",
          "rgba(218, 32, 104, 0.2)",
        ],
        strokes: ["#7fc6a1", "#ea6fa3"],
      },
      overrides: {
        common: {
          title: { color: "#ffffff" },
          legend: { item: { label: { color: "#ffffff" } } },
        },
        pie: {
          series: {
            calloutLabel: { color: "#ffffff" },
            sectorLabel: { color: "#ffffff" },
          },
        },
      },
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        strokeWidth: 0,
        innerRadiusRatio: 0.65,
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", height: "400px" }}>
      <AgCharts options={options} />
    </Box>
  );
}

export default MetricComponent;

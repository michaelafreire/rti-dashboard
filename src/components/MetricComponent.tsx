import { AgCharts } from "ag-charts-react";
import {
  LegendModule,
  DonutSeriesModule,
  ModuleRegistry,
} from "ag-charts-community";
import Box from "@mui/material/Box";

// Register the modules
ModuleRegistry.registerModules([DonutSeriesModule, LegendModule]);

// Example data function
const getData = () => [
  { asset: "Inhalation", amount: 45 },
  { asset: "Exhalation", amount: 35 },
  { asset: "Rest", amount: 20 },
];

function MetricComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    data: getData(),
    background: { fill: "transparent" },
    theme: {
      palette: {
        fills: [
          "rgba(218, 32, 104, 0.3)",
          "rgba(231, 65, 140, 0.3)",
          "rgba(127, 160, 198, 0.3)",
        ],
        strokes: ["#ea6fa3", "#ff7fc6", "#7fa3a0"],
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
    // title: {
    //   text: "Breathing Composition",
    // },
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

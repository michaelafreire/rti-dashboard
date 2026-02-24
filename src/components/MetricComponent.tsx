import { useState } from "react";
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
  { asset: "Inhalation", amount: 40 },
  { asset: "Exhalation", amount: 25 },
  { asset: "Rest", amount: 20 },
  { asset: "Other", amount: 15 },
];

function MetricComponent() {
  const [options, setOptions] = useState({
    data: getData(),
    background: { fill: "transparent" },
    theme: {
      palette: {
        fills: [
          "rgba(223, 153, 70, 0.3)",
          "rgba(216, 32, 104, 0.3)",
          "rgba(77, 102, 98, 0.3)",
          "rgba(121, 40, 66, 0.3)",
        ],
        strokes: ["#f3a55f", "#ea6fa3", "#7fa3a0", "#b8728d"],
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
        strokeWidth: 1,
      },
    ],
  });

  return (
    <Box sx={{ width: "100%", height: "400px" }}>
      <AgCharts options={options as any} />
    </Box>
  );
}

export default MetricComponent;

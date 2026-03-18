import { Box } from "@mui/material"
import MetricComponent from '../components/MetricComponent';
import MainGraph from '../components/MainGraph';
import IconText from '../components/IconText';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import InsightsIcon from '@mui/icons-material/Insights';
import { Typography } from '@mui/material';
import Navbar from "../components/Navbar";
import { useBreathingData } from '../context/BreathingDataContext';
import { useEffect, useMemo } from 'react';

const glassCard = {
  bgcolor: 'rgba(21, 30, 34, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
};

function AllUsers() {
  const { metrics, setLatestOnly } = useBreathingData();
  const metricValues = Object.values(metrics);

  useEffect(() => {
    setLatestOnly(false);
  }, [setLatestOnly]);

  const averageBpm = useMemo(() => {
    if (!metricValues.length) return 0;
    return Number(
      (metricValues.reduce((sum, m) => sum + m.bpm, 0) / metricValues.length).toFixed(1)
    );
  }, [metricValues]);

  const meanDepth = useMemo(() => {
    if (!metricValues.length) return 0;
    return Number(
      (metricValues.reduce((sum, m) => sum + m.meanDepth, 0) / metricValues.length).toFixed(2)
    );
  }, [metricValues]);

  const averageBreaths = useMemo(() => {
    if (!metricValues.length) return 0;
    return Number(
      (metricValues.reduce((sum, m) => sum + m.breaths, 0) / metricValues.length).toFixed(0)
    );
  }, [metricValues]);

  return (
    <>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: { xs: '10px', sm: '230px' }, marginRight: '10px', gap: 2, padding: 2 }}>

        {/* Top */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>

          <Box sx={{ flex: { xs: 1, md: 2 }, ...glassCard, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
            <Typography variant="h6">Breathing Over Time</Typography>
            <MainGraph />
          </Box>

          <Box sx={{ flex: { xs: 1, md: 1 }, ...glassCard, borderRadius: 3, display: 'flex', flexDirection: "column", alignItems: 'center', padding: 3 }}>
            <Typography variant="h6">Breathing Compliance</Typography>
            <MetricComponent />
          </Box>

        </Box>

        {/* Bottom */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>

          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3 }}>
            <IconText icon={TrendingUpIcon} number={averageBpm} title="Average BPM" description="All users" />
          </Box>

          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3 }}>
            <IconText icon={DataUsageIcon} number={meanDepth} title="Mean Depth" description="All users" />
          </Box>

          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3 }}>
            <IconText icon={InsightsIcon} number={averageBreaths} title="Avg Breaths" description="All users" />
          </Box>

        </Box>
      </Box>
    </>
  )
}

export default AllUsers;

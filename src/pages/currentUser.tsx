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
import { useEffect } from 'react';

const glassCard = {
  bgcolor: 'rgba(21, 30, 34, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
};

function CurrentUser() {
  const { metrics, participants, setLatestOnly } = useBreathingData();

  useEffect(() => {
    setLatestOnly(true);
  }, [setLatestOnly]);

  const currentParticipantId = participants[0];
  const currentMetrics = currentParticipantId ? metrics[currentParticipantId] ?? null : null;

  const bpm = Number((currentMetrics?.bpm ?? 0).toFixed(1));
  const meanDepth = Number((currentMetrics?.meanDepth ?? 0).toFixed(2));
  const breaths = currentMetrics?.breaths ?? 0;

  return (
    <>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: { xs: '10px', sm: '230px' }, marginRight: '10px', gap: 2, padding: 2 }}>

        {/* Top */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>

          <Box sx={{ flex: { xs: 1, md: 2 }, ...glassCard, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
              Breathing Over Time
            </Typography>
            <MainGraph latestOnly />
          </Box>

          <Box sx={{ flex: { xs: 1, md: 1 }, ...glassCard, borderRadius: 3, display: 'flex', flexDirection: "column", alignItems: 'center', padding: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
              Breathing Compliance
            </Typography>
            <MetricComponent />
          </Box>

        </Box>

        {/* Bottom */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>

          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3 }}>
            <IconText
              icon={TrendingUpIcon}
              number={bpm}
              title="BPM"
              description="Latest participant"
            />
          </Box>

          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3 }}>
            <IconText
              icon={DataUsageIcon}
              number={meanDepth}
              title="Mean Depth"
              description="Latest participant"
            />
          </Box>

          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3 }}>
            <IconText
              icon={InsightsIcon}
              number={breaths}
              title="Total Breaths"
              description="Latest participant"
            />
          </Box>

        </Box>
      </Box>
    </>
  )
}

export default CurrentUser;

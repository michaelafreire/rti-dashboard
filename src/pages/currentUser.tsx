import { Box } from "@mui/material"
import MetricComponent from '../components/MetricComponent';
import MainGraph from '../components/MainGraph';
import IconText from '../components/IconText';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import InsightsIcon from '@mui/icons-material/Insights';
import { Typography } from '@mui/material';
import Navbar from "../components/Navbar";

const glassCard = {
  bgcolor: 'rgba(21, 30, 34, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
};

function currentUser() {
  return (
    <>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: { xs: '10px', sm: '230px' }, marginRight: '10px', gap: 2, padding: 2 }}>
        {/* Top Section */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ flex: { xs: 1, md: 2 }, flexDirection: 'column', ...glassCard, borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', marginBottom: 3, fontWeight: 600 }}>
              Breathing Over Time
            </Typography>
            <MainGraph />
          </Box>
          <Box sx={{ flex: { xs: 1, md: 1 }, flexDirection: "column", ...glassCard, borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', marginBottom: 3, fontWeight: 600 }}>
              Breathing Composition
            </Typography>
            <MetricComponent />
          </Box>
        </Box>
        {/* Bottom Section */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3, overflow: 'hidden' }}>
            <IconText icon={TrendingUpIcon} number={23} title="Total Breaths" description="Measured across current session" />
          </Box>
          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3, overflow: 'hidden' }}>
            <IconText icon={DataUsageIcon} number={40} title="Inhalation Rate" description="Breaths per minute" />
          </Box>
          <Box sx={{ flex: 1, ...glassCard, borderRadius: 3, overflow: 'hidden' }}>
            <IconText icon={InsightsIcon} number={52} title="Exhalation Rate" description="Breaths per minute" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default currentUser

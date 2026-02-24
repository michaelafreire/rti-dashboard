import './App.css'
import Navbar from './components/Navbar'
import Box from '@mui/material/Box';
import MetricComponent from './components/MetricComponent';
import MainGraph from './components/MainGraph';
import IconText from './components/IconText';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import InsightsIcon from '@mui/icons-material/Insights';
import { Typography } from '@mui/material';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 20px)',
    }}>
      <Navbar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: '220px', marginRight: '10px', gap: 1 }}>
        {/* Top 2/3 */}
        <Box sx={{ flex: 2, display: "flex", gap: 1 }}>
          <Box sx={{ flex: 2, flexDirection: 'column', bgcolor: "primary.main", borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Typography  sx={{ color: 'text.secondary', marginBottom: 2 }}>
              Breathing Rate Over Time
            </Typography>
            <MainGraph />
          </Box>
          <Box sx={{ flex: 1, flexDirection: "column", bgcolor: "primary.main", borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Typography  sx={{ color: 'text.secondary', marginBottom: 2 }}>
              Breathing Composition
            </Typography>
            <MetricComponent />
          </Box>
        </Box>
        {/* Bottom 1/3 */}
        <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}>
            <IconText icon={TrendingUpIcon} number={23} title="Total Breaths" description1="Lorem ipsum dolor sit amet" description2="amet lorem ipsum" />
          </Box>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}>
            <IconText icon={DataUsageIcon} number={40} title="Inhalation Rate" description1="Lorem ipsum dolor sit amet" description2="amet lorem ipsum" />
          </Box>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}>
            <IconText icon={InsightsIcon} number={52} title="Exhalation Rate" description1="Lorem ipsum dolor sit amet" description2="amet lorem ipsum" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App

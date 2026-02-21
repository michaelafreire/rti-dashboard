import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Box from '@mui/material/Box';
import MetricComponent from './components/MetricComponent';

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
          <Box sx={{ flex: 2, bgcolor: "primary.main", borderRadius: 3 }}></Box>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}></Box>
        </Box>
        {/* Bottom 1/3 */}
        <Box sx={{ flex: 1, display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}></Box>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}></Box>
          <Box sx={{ flex: 1, bgcolor: "primary.main", borderRadius: 3 }}></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App

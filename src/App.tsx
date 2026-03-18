import './App.css'
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import AllUsers from './pages/allUsers';
import CurrentUser from './pages/currentUser';
import Landing from './pages/landing';
import { BreathingDataProvider } from './context/BreathingDataProvider';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <BreathingDataProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/currentUser" element={<CurrentUser />} />
          <Route path="/allUsers" element={<AllUsers />} />
        </Routes>
      </BreathingDataProvider>
    </Box>
  )
}

export default App

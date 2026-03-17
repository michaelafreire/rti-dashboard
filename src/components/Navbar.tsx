import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';

const pages = [
  { title: 'Current User', path: '/currentUser' },
  { title: 'All Users', path: '/allUsers' }
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 10,
        left: 10,
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        width: 200,
        bgcolor: 'rgba(21, 30, 34, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        color: 'text.primary',
        borderRadius: 3,
        p: 2,
        minHeight: 'calc(100vh - 20px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Logo */}
      <Box
        onClick={() => navigate('/')}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          mt: 4,
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <img src="./favicon.png" alt="logo" style={{ width: 32, height: 32 }} />
        <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1, textAlign: 'center' }}>
          Just Breathe
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        {pages.map((page) => (
          <Button
            key={page.title}
            onClick={() => navigate(page.path)}
            sx={{
              color: 'text.primary',
              justifyContent: 'flex-start',
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              py: 1.5,
              fontSize: '0.875rem',
              borderLeft: isActive(page.path) ? '3px solid #ff7fc6' : '3px solid transparent',
              bgcolor: isActive(page.path) ? 'rgba(255, 127, 198, 0.1)' : 'transparent',
              fontWeight: isActive(page.path) ? 600 : 400,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: isActive(page.path) ? 'rgba(255, 127, 198, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default Navbar

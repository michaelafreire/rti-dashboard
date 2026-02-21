import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const pages = ['Current User', 'All Users'];
function Navbar() {
  return (
    <Box
      sx={{
        position: 'fixed',           // stick to left
        top: 10,
        left: 10,
        display: 'flex',
        flexDirection: 'column',     // vertical always
        alignItems: 'center',
        width: 200,
        bgcolor: 'primary.light',
        color: 'text.primary',
        borderRadius: 3,
        p: 2,
        minHeight: 'calc(100vh - 20px)',
        boxShadow: 3,                // subtle shadow
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, mt: 4 }}>
        <img src="./favicon.png" alt="logo" style={{ width: 32, height: 32 }} />
        <Typography sx={{ fontWeight: 'bold', marginTop: 1, textAlign: 'center' }}>
          Just Breathe
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        {pages.map((page) => (
          <Button
            key={page}
            sx={{
              color: 'text.primary',
              justifyContent: 'flex-start',
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              '&:hover': { bgcolor: 'primary.main' },
            }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default Navbar

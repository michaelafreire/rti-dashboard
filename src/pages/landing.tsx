import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const glassCard = {
  bgcolor: 'rgba(21, 30, 34, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
};

const imageFrame = {
  borderRadius: 3,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  bgcolor: 'rgba(255, 255, 255, 0.04)',
};

function landing() {
  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 1 }}>
      <Box sx={{ minHeight: (theme) => `calc(100dvh - ${theme.spacing(2)})`, flex: 1, display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', bgcolor: "primary.main", borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="./background.mp4" type="video/mp4" />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.35)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Just Breathe
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary'}}>
            Live Breathing Biofeedback Experience
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 190,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button onClick={scrollToAbout} variant="outlined" sx={{color: 'text.secondary', borderColor: 'text.secondary', width: 140, textTransform: 'none', transition: 'all 0.2s ease', '&:hover': { color: '#ff7fc6', borderColor: '#ff7fc6', bgcolor: 'rgba(255, 127, 198, 0.15)' }}}>About</Button>
          <Button component={Link} to="/currentUser" variant="outlined" sx={{color: 'text.secondary', borderColor: 'text.secondary', width: 140, textTransform: 'none', transition: 'all 0.2s ease', '&:hover': { color: '#ff7fc6', borderColor: '#ff7fc6', bgcolor: 'rgba(255, 127, 198, 0.15)' }}}>Dashboard</Button>
        </Box>
      </Box>

      <Box
        id="about-section"
        sx={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          ...glassCard,
          borderRadius: 3,
          px: { xs: 2, sm: 4 },
          pt: 8,
          pb: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 700, mb: 4, mt: 8 }}>
          About Just Breathe
        </Typography>

        {/* Introduction*/}
        <Box sx={{ mb: 8, maxWidth: 800, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
            Our approach is grounded in respiratory physiology and biofeedback science. By providing real-time
            visual feedback of breathing patterns, users develop body awareness and can improve breath control.
            This promotes parasympathetic nervous system activation, reducing stress and enhancing overall well-being.
          </Typography>
        </Box>

        {/* Theory */}
        <Box sx={{ mb: 8, maxWidth: 800, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            Theory
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
            Our approach is grounded in respiratory physiology and biofeedback science. By providing real-time
            visual feedback of breathing patterns, users develop body awareness and can improve breath control.
            This promotes parasympathetic nervous system activation, reducing stress and enhancing overall well-being.
          </Typography>
        </Box>

        {/* Implementation */}
        <Box sx={{ mb: 8, maxWidth: 800, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            Implementation
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box
              component="img"
              src="./Image_Implementation.png"
              alt="Implementation"
              sx={{
                ...imageFrame,
                width: { xs: '100%', md: 220 },
                minWidth: { md: 220 },
                height: 260,
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
              Just Breathe is an interactive breathing biofeedback experience designed to help users slow down,
              focus on breath rhythm, and track breathing patterns over time. By combining real-time visualization
              with guided breathing exercises, we create a mindful environment for respiratory exploration.
            </Typography>
          </Box>
        </Box>

        {/* Experimental Procedure */}
        <Box sx={{ mb: 8, maxWidth: 800, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            Experimental Procedure
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                src="./experiment-1.mp4"
                sx={{
                  ...imageFrame,
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                }}
              />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center' }}>
                Condition 1: Interaction and feedback
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                src="./experiment-2.mp4"
                sx={{
                  ...imageFrame,
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                }}
              />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center' }}>
                Condition 2: Interaction only
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                src="./experiment-3.mp4"
                sx={{
                  ...imageFrame,
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                }}
              />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center' }}>
                Condition 3: Control
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
            Participants engage with breathing exercises under controlled conditions, with their respiratory data
            collected in real-time. The platform tracks inhalation and exhalation rates, identifies individual patterns,
            and adapts guidance to optimize user experience and outcome.
          </Typography>
        </Box>

        {/* Team */}
        <Box sx={{ maxWidth: 800, textAlign: 'left', mb: 8  }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            Team
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
            Just Breathe is developed by a multidisciplinary team of engineers, designers, and researchers. Our team members are Yennyfer Tellez Marin, Gabriel Patricio Asis, Mehmet Ezici and Michaela Freire.
          </Typography>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          ...glassCard,
          borderRadius: 3,
          px: { xs: 2, sm: 4 },
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          © 2026 Just Breathe
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.65)' }}>
          Built for CSIM - Real Time Interaction - Universitat Pompeu Fabra
        </Typography>
      </Box>
    </Box>
  )
}

export default landing

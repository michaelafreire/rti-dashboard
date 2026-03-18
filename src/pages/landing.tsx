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
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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
          <Button onClick={scrollToAbout} variant="outlined" sx={{ color: 'text.secondary', borderColor: 'text.secondary', width: 140, textTransform: 'none', transition: 'all 0.2s ease', '&:hover': { color: '#ff7fc6', borderColor: '#ff7fc6', bgcolor: 'rgba(255, 127, 198, 0.15)' } }}>About</Button>
          <Button component={Link} to="/currentUser" variant="outlined" sx={{ color: 'text.secondary', borderColor: 'text.secondary', width: 140, textTransform: 'none', transition: 'all 0.2s ease', '&:hover': { color: '#ff7fc6', borderColor: '#ff7fc6', bgcolor: 'rgba(255, 127, 198, 0.15)' } }}>Dashboard</Button>
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
            Just Breathe is a closed-loop breathing biofeedback system that translates users’ respiratory activity into real-time visual feedback. By directly coupling breathing patterns with system responses, it creates an interactive and continuous feedback loop in which users can both observe and influence their physiological state. The goal of this system is to enhance awareness of breathing and support its regulation, enabling users to gradually adjust their respiration through ongoing, perceptible interaction.
          </Typography>
        </Box>

        {/* Theory */}
        <Box sx={{ mb: 8, maxWidth: 800, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            Theory
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
            Deep or slow breathing is widely recognized as an effective mechanism for reducing stress and anxiety, improving autonomic regulation, and increasing heart rate variability, reflecting enhanced parasympathetic activation and relaxation (Cheng et al., 2018). Building on this physiological foundation, immersive digital environments, such as virtual reality (VR), have been shown to be safe and effective tools for supporting stress and anxiety management and inducing relaxation in healthy individuals (Chittaro et al., 2024). Further, studies on biofeedback suggest that these relaxation effects can be enhanced by allowing users’ physiological signals—such as breathing—to directly shape the interaction, while simultaneously making these signals visible to the user in real time. This creates a closed-loop system in which individuals become aware of their internal states and can intentionally regulate them, contributing to reductions in perceived stress, breathing rate, and heart rate (Chittaro et al., 2024). The duration of deep breathing also plays a critical role, with anxiety reduction occurring after approximately five minutes and deeper physiological relaxation typically requiring 7–9 minutes of sustained practice (Cheng et al., 2018). However, despite these insights, existing studies have not examined whether brief, single-session mixed-reality (MR) experiences—particularly those in which interaction is explicitly controlled by users’ breathing and supported by continuous, perceivable visual feedback—are sufficient to guide users toward the optimal deep-breathing frequency of approximately 0.1 Hz. Addressing this gap, the present research investigates whether interacting with a system whose mechanics are driven by users’ breathing, and which provides real-time visual feedback on that breathing, can lead participants to slow their breathing rate and converge toward this target frequency.
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
              The system captures breathing pressure using a force-sensitive resistor (FSR) sensor, which is continuously normalized and processed in real time. Inhalation onsets are detected from the signal using a combination of baseline-relative thresholds, dynamic hysteresis, and slope analysis to ensure robust identification of breathing cycles. Based on these detected events, breathing rate (in breaths per minute) is estimated over a rolling time window and mapped to visual properties—such as opacity and scale—providing users with immediate, perceivable feedback. All data is streamed live to drive the visualization while also being recorded for post hoc analysis.
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
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, mb: 1.5 }}>
            Participants complete a single 7-minute interactive biofeedback breathing experience in one of three between-subjects conditions.
          </Typography>
          <Box component="ul" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, pl: 3, m: 0, mb: 1.5 }}>
            <li>
              Condition 1 (Interaction + Feedback): Visual system where interaction is controlled by breathing, with a visual feedback visual that grows with inhalation, shrinks with exhalation, and guides toward slower breathing with a pink circle to set ideal rhythm.
            </li>
            <li>
              Condition 2 (Interaction Only): Visual system where interaction is controlled by breathing, with a visual that grows with inhalation and shrinks with exhalation (no explicit rate guidance).
            </li>
            <li>
              Condition 3 (Control): No breathing-controlled interaction or feedback.
            </li>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
            Breathing rate is measured continuously to test convergence toward 0.1 Hz deep breathing. A User Experience Questionnaire (UEQ) is administered post-interaction to assess perceived attractiveness, perspicuity, efficiency, dependability, stimulation, and novelty of the system.
          </Typography>
        </Box>

        {/* Team */}
        <Box sx={{ maxWidth: 800, textAlign: 'left', mb: 8 }}>
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

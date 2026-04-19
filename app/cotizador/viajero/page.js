"use client";

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Stack
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ASSETS = {
  background: '/images/viajeros/home/fondo.png', 
  logo: '/images/viajeros/home/logo_home.png',
  step1Icon: '/images/viajeros/home/icono1.png',
  step2Icon: '/images/viajeros/home/icono2.png',
  step3Icon: '/images/viajeros/home/icono3.png',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#004b8d',
      dark: '#002d5a',
    },
    text: {
      primary: '#003366',
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Page() {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
          component="img" 
          src={ASSETS.logo} 
          alt="Ever Journey" 
          sx={{ 
            height: 'auto', 
            width: '100%',
            display: 'block'
          }} 
      />
      <Box 
        sx={{ 
          minHeight: '100vh', 
          width: '100%',
          position: 'relative',
          overflowX: 'hidden',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${ASSETS.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.80,
            zIndex: 0,
            pointerEvents: 'none',
          }
        }}
      >
     
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, pb: 6, px: { xs: 4, md: 4 } }}>
          {/* Header */}
          
          
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: { xs: 4, md: 6 } 
            }}
          >
           
          </MotionBox>

          {/* Title */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            sx={{ mb: { xs: 6, md: 10 } }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'primary.main',
                lineHeight: 1.2,
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem' },
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Adquiere de una forma rápida tu póliza asistencia al viajero
            </Typography>
          </MotionBox>

          {/* Timeline */}
          <Box sx={{ position: 'relative', mb: 8, px: { xs: 2, sm: 0 } }}>
            {/* Vertical Line */}
            <Box
              sx={{
                position: 'absolute',
                left: { xs: '30px', sm: '50%' },
                top: 0,
                bottom: 0,
                width: '4px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, #4DA6FF, #004b8d, #4DA6FF)',
                boxShadow: '0 0 15px rgba(77, 166, 255, 0.4)',
                borderRadius: '2px',
                zIndex: 0,
              }}
            />

            <Stack spacing={{ xs: 6, sm: 12 }}>
              <TimelineRow 
                side="right" 
                icon={ASSETS.step1Icon}
                text="Tu póliza de viaje a un escaneo de distancia. Sin papeles, sin esperas y con tecnología OCR."
                delay={0.4}
              />
              <TimelineRow 
                side="left" 
                icon={ASSETS.step2Icon}
                text="Ante cualquier imprevisto, no tendrás que esperar. Garantizamos atención inmediata y la liquidación directa a tu billetera GuiaPay. Soluciones en tiempo real, estés donde estés."
                delay={0.6}
              />
              <TimelineRow 
                side="right" 
                icon={ASSETS.step3Icon}
                text="Viaja con la tranquilidad de tener fondos siempre a mano. Con GuiaPay, la inmediatez es total."
                delay={0.8}
              />
            </Stack>
          </Box>

          {/* CTA */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 8 } }}>
            <MotionButton
              variant="contained"
              size="large"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/cotizador/viajero/infoViaje')}
              endIcon={<ChevronRight />}
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '9999px',
                fontSize: { xs: '1rem', md: '1.25rem' },
                boxShadow: '0 20px 40px rgba(0, 51, 102, 0.2)',
                background: 'linear-gradient(to right, #004b8d, #002d5a)',
              }}
            >
              Cotizar
            </MotionButton>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function TimelineRow({ side, icon, text, delay }) {
  const isRight = side === 'right';
  
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, x: isRight ? 30 : -30 }} // Milder entrance for mobile
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: { 
          xs: 'row', // Horizontally on mobile (Line on left)
          sm: isRight ? 'row' : 'row-reverse' 
        },
        width: '100%',
        position: 'relative',
        gap: { xs: 3, sm: 0 }
      }}
    >
      {/* Icon Side (or Placeholder for spacing on desktop) */}
      <Box sx={{ 
        width: { xs: 'auto', sm: '45%' }, 
        display: 'flex', 
        justifyContent: { xs: 'flex-start', sm: isRight ? 'flex-end' : 'flex-start' }, 
        pr: { xs: 0, sm: isRight ? 4 : 0 }, 
        pl: { xs: 0, sm: isRight ? 0 : 4 },
        zIndex: 1
      }}>
        <Box 
          sx={{ 
            width: { xs: 60, sm: 100, md: 140 }, 
            height: { xs: 60, sm: 100, md: 140 }, 
            p: { xs: 1.5, sm: 2, md: 3 },
            bgcolor: 'white', 
            borderRadius: { xs: 2.5, md: 4 }, 
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 51, 102, 0.05)',
            flexShrink: 0,
            '& img': { width: '100%', height: '100%', objectFit: 'contain' }
          }}
        >
          <img src={icon} alt="Step icon" referrerPolicy="no-referrer" />
        </Box>
      </Box>

      {/* Center Dot */}
      <Box 
        sx={{ 
          width: { xs: 18, sm: 24 }, 
          height: { xs: 18, sm: 24 }, 
          borderRadius: '50%', 
          bgcolor: 'white', 
          border: '4px solid #004b8d',
          boxShadow: '0 0 10px rgba(77, 166, 255, 0.6)',
          zIndex: 2,
          position: 'absolute',
          left: { xs: '30px', sm: '50%' },
          transform: 'translateX(-50%)',
          display: 'block'
        }} 
      />

      {/* Text Side (or Placeholder for spacing on desktop) */}
      <Box sx={{ 
        width: { xs: '1fr', sm: '45%' }, 
        pl: { xs: 2, sm: isRight ? 4 : 0 }, 
        pr: { xs: 0, sm: isRight ? 0 : 4 },
        textAlign: 'left'
      }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.primary', 
            fontWeight: 500, 
            fontSize: { xs: '0.875rem', md: '1.1rem' },
            lineHeight: 1.5,
            bgcolor: { xs: 'rgba(255,255,255,0.85)', sm: 'rgba(255,255,255,0.7)' },
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            backdropFilter: 'blur(8px)',
            border: '1px solid transparent',
            boxShadow: { xs: '0 2px 10px rgba(0,0,0,0.05)', sm: 'none' },
            '&:hover': { borderColor: 'rgba(77, 166, 255, 0.3)' },
            transition: 'all 0.3s'
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

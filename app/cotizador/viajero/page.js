"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const DURATION = 7000; // 7 segundos por slide

  const CAROUSEL_ITEMS = [
    {
      video: '/videos/viajeros/home/video1.mp4',
      text: 'Tu póliza de viaje a un escaneo de distancia. Sin papeles, sin esperas y con tecnología OCR.',
    },
    {
      video: '/videos/viajeros/home/video2.mp4',
      text: 'Ante cualquier imprevisto, no tendrás que esperar. Garantizamos atención inmediata y la liquidación directa.',
    },
    {
      video: '/videos/viajeros/home/video3.mp4',
      text: 'Viaja con la tranquilidad de tener fondos siempre a mano. Con GuiaPay, la inmediatez es total.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % CAROUSEL_ITEMS.length);
    }, DURATION);

    let progressTimer;
    let startTime = Date.now();

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / DURATION) * 100, 100);
      setProgress(newProgress);
      if (newProgress < 100) {
        progressTimer = requestAnimationFrame(updateProgress);
      }
    };

    progressTimer = requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(progressTimer);
    };
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, pb: 4, px: { xs: 2, md: 4 }, pt: { xs: 2, md: 4 } }}>
          <Box
            component="section"
            sx={{
              position: 'relative',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              overflow: 'hidden',
              scrollMarginTop: '20px',
              borderRadius: 4,
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {/* Carousel Background Videos */}
            {CAROUSEL_ITEMS.map((item, index) => (
              <Box
                key={item.video}
                component="video"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  opacity: currentSlide === index ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out',
                }}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={item.video} type="video/mp4" />
              </Box>
            ))}
            
            {/* Dark overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgb(10 37 64 / 56%) 0%, rgb(30 73 118 / 39%) 50%, rgb(43 90 142 / 54%) 100%)',
                zIndex: 1,
              }}
            />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  p: {xs: 2, md: 4},
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(2px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  maxWidth: '800px',
                  mx: 'auto',
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Tu Asistencia de Viaje Inteligente
                </Typography>
                
                {/* Dynamic Text Container */}
                <Box sx={{ position: 'relative', height: { xs: '80px', sm: '60px', md: '50px' }, mt: 3 }}>
                  {CAROUSEL_ITEMS.map((item, index) => (
                    <Typography
                      key={`text-${index}`}
                      variant="h5"
                      component="p"
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        fontWeight: 400,
                        fontSize: { xs: '0.95rem', md: '1.2rem' },
                        textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                        opacity: currentSlide === index ? 1 : 0,
                        transform: currentSlide === index ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        color: '#e2f1ff',
                      }}
                    >
                      {item.text}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Container>

            {/* Progress Bar */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                zIndex: 3,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg, #0992b1 0%, #4ec0b1 100%)',
                  transition: progress < 5 ? 'none' : 'width 0.05s linear',
                }}
              />
            </Box>

            {/* Dot Indicators */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                display: 'flex',
                gap: 1.5,
              }}
            >
              {CAROUSEL_ITEMS.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => goToSlide(index)}
                  sx={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: currentSlide === index ? '#4ec0b1' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: currentSlide === index ? '2px solid white' : '2px solid transparent',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* CTA: Aumenté el mt (margin top) para bajarlo más */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 10, md: 8 } }}>
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
                py: { xs: 1, md: 2 },
                borderRadius: '9999px',
                fontSize: { xs: '0.9rem', md: '1.25rem' },
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
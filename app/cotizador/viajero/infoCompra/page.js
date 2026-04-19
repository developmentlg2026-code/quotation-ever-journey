'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Tema estrictamente consistente con el resto de la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#004b8d',
      dark: '#002d5a',
    },
    text: {
      primary: '#003366',
      secondary: '#4a6078'
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", sans-serif',
    h4: {
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

const ASSETS = {
  background: '/images/viajeros/home/fondo.png',
  logo: '/images/viajeros/home/logo_home.png',
  recepcion: '/images/viajeros/recepcion_viajero.png',
};

export default function infoCompra() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Redirigir al dashboard u otra vista final
    router.push('/cotizador/viajero');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Logo Header */}
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
          backgroundColor: '#f8fafc',
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
            opacity: 0.15,
            zIndex: 0,
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
          
          {/* Botón Volver (Mantenido arriba a la izquierda) */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button
              startIcon={<ChevronLeft />}
              onClick={handleBack}
              sx={{
                color: 'text.secondary',
                fontSize: '1rem',
                '&:hover': { background: 'transparent', textDecoration: 'underline', color: 'primary.main' }
              }}
            >
              Volver
            </Button>
          </Box>

          {/* Título Principal */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ mb: { xs: 4, md: 5 }, textAlign: 'center' }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                lineHeight: 1.2,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                mb: 2
              }}
            >
              Tu Póliza se Emitió con Éxito
            </Typography>
          </Box>

          {/* Contenedor Principal (Tarjeta de cristal) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                width: '100%',
                maxWidth: 600,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 16px 48px 0 rgba(0, 51, 102, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Imagen Central */}
              <Box 
                sx={{ 
                  width: '100%', 
                  mb: 4,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 51, 102, 0.12)',
                }}
              >
                <Box
                  component="img"
                  src={ASSETS.recepcion}
                  alt="Emisión de póliza exitosa"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </Box>

              {/* Texto Descriptivo */}
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: '1.05rem', 
                  lineHeight: 1.6,
                  fontWeight: 500,
                  px: { xs: 1, sm: 3 }
                }}
              >
                "¡Hola! Te informamos que tu póliza ya ha sido emitida con éxito. En breve, enviaremos toda la documentación digital a tu correo electrónico registrado. Por favor, revisa tu bandeja de entrada (y la carpeta de spam por si acaso). ¡Gracias por confiar en nosotros!"
              </Typography>
            </Paper>
          </Box>

          {/* Botón Siguiente (Centrado, redondeado y con gradiente) */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              onClick={handleContinue}
              variant="contained"
              size="large"
              endIcon={<ChevronRight />}
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: '9999px',
                fontSize: { xs: '1rem', md: '1.15rem' },
                boxShadow: '0 10px 20px rgba(0, 51, 102, 0.15)',
                background: 'linear-gradient(to right, #004b8d, #002d5a)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 25px rgba(0, 51, 102, 0.25)',
                }
              }}
            >
              Finalizar
            </Button>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
}
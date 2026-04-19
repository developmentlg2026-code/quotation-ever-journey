'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  TextField,
  InputAdornment,
  Link,
  Divider
} from '@mui/material';
import { motion } from 'motion/react';
import { User, KeyRound, Fingerprint, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Tema consistente con el resto de la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#004b8d',
      dark: '#002d5a',
    },
    info: {
      main: '#007ebc',
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
};

export default function infoGuiaPay() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    console.log('Iniciando sesión en GuíaPay...', formData);
    // Lógica de autenticación aquí
  };

  const handleNext = () => {
    // Avanzar al siguiente paso del flujo
    router.push('/cotizador/viajero/infoCompra');
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
      
      {/* Fondo general de la aplicación */}
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
          
          {/* Botón Volver Superior (Consistente con el resto del flujo) */}
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
              Registro de GuiaPay
            </Typography>
            <Divider sx={{ borderColor: 'primary.main', borderWidth: 1, width: '60%', mx: 'auto', opacity: 0.5 }} />
          </Box>

          {/* Contenedor Central (Tarjeta de Login con estilo de la app) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                width: '100%',
                maxWidth: 420,
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
              }}
            >
              {/* Logo Mockeado GuíaPay */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.dark', letterSpacing: '-1px' }}>
                  Guía
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 500, color: 'info.main', letterSpacing: '-1px' }}>
                  pay
                </Typography>
              </Box>

              {/* Formulario */}
              <Box sx={{ width: '100%', mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'primary.dark', fontWeight: 700, display: 'block', mb: 1 }}>
                  Ingrese tu E-mail
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Ingrese su email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange('email')}
                  sx={{ backgroundColor: '#ffffff', mb: 3, borderRadius: 1 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} color="#4a6078" />
                        </InputAdornment>
                      ),
                    }
                  }}
                />

                <Typography variant="caption" sx={{ color: 'primary.dark', fontWeight: 700, display: 'block', mb: 1 }}>
                  Ingresa tu contraseña
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Contraseña"
                  type="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange('password')}
                  sx={{ backgroundColor: '#ffffff', mb: 2, borderRadius: 1 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyRound size={18} color="#4a6078" />
                        </InputAdornment>
                      ),
                    }
                  }}
                />
              </Box>

              {/* Olvidaste Contraseña */}
              <Link 
                href="#" 
                underline="none" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  mb: 4,
                  alignSelf: 'flex-end',
                  '&:hover': { color: 'primary.main', textDecoration: 'underline' }
                }}
              >
                ¿OLVIDASTE LA CONTRASEÑA?
              </Link>

              {/* Botón ENTRAR (Ajustado al estilo de la app) */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  py: 1.5,
                  mb: 4,
                  fontSize: '1rem',
                  borderRadius: '9999px',
                  boxShadow: '0 8px 16px rgba(0, 126, 188, 0.2)',
                  background: 'linear-gradient(to right, #007ebc, #004b8d)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px rgba(0, 126, 188, 0.3)',
                  }
                }}
              >
                Entrar
              </Button>

              {/* Huella Dactilar */}
              <Box sx={{ mb: 3, cursor: 'pointer', color: 'primary.main', transition: 'all 0.2s', '&:hover': { color: 'primary.dark', transform: 'scale(1.05)' } }}>
                <Fingerprint size={56} strokeWidth={1.5} />
              </Box>

              {/* Crear Cuenta */}
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                ¿No tienes cuenta aún?
              </Typography>
              <Link 
                href="#" 
                underline="none" 
                sx={{ 
                  color: 'primary.main', 
                  fontSize: '1.1rem', 
                  fontWeight: 700,
                  '&:hover': { color: 'primary.dark', textDecoration: 'underline' }
                }}
              >
                Crear cuenta
              </Link>
            </Paper>
          </Box>

          {/* Botón SIGUIENTE (Ajustado al estilo "Continuar") */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              onClick={handleNext}
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
              Siguiente
            </Button>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
}
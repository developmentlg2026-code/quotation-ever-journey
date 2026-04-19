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
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronLeft, ShieldCheck, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Tema consistente con el resto de la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#004b8d',
      dark: '#002d5a',
    },
    success: {
      main: '#e67e22', // Color naranja similar al escudo de la imagen
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
  // Reemplaza estas rutas con las imágenes reales de los logos que tengas
  logosPago: [
    { name: 'Mastercard', src: '/images/logos/mastercard.png' },
    { name: 'Visa', src: '/images/logos/visa.png' },
    { name: 'Bitcoin', src: '/images/logos/bitcoin.png' },
    { name: 'Discover', src: '/images/logos/discover.png' },
    { name: 'Bank', src: '/images/logos/bank.png' },
    { name: 'PayPal', src: '/images/logos/paypal.png' },
  ]
};

export default function infoMetodosPagos() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nombreTarjeta: '',
    numeroTarjeta: '',
    vencimiento: '',
    cvv: '',
  });

  const handleChange = (field) => (event) => {
    let value = event.target.value;

    // Formateo simple para número de tarjeta (agrega espacios cada 4 dígitos)
    if (field === 'numeroTarjeta') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    }
    
    // Formateo simple para vencimiento (MM/AA)
    if (field === 'vencimiento') {
      value = value.replace(/\D/g, '');
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
    }

    // Límite para CVV
    if (field === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handlePayment = () => {
    // Lógica para procesar el pago
    console.log('Procesando pago...', formData);
    router.push('/cotizador/viajero/infoGuiaPay'); // Cambia a tu ruta de éxito
  };

  const isPayDisabled = () => {
    return (
      !formData.nombreTarjeta || 
      formData.numeroTarjeta.length < 19 || // 16 dígitos + 3 espacios
      formData.vencimiento.length < 5 ||
      formData.cvv.length < 3
    );
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
          
          {/* Botón Volver */}
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

          {/* Título */}
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
              Te Invitamos a Pagar tu Póliza
            </Typography>
          </Box>

          {/* Contenedor Principal */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                mb: 4,
                width: '100%',
                maxWidth: 600, // Limitamos el ancho para que el formulario se vea mejor proporcionado
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 16px 48px 0 rgba(0, 51, 102, 0.15)',
              }}
            >
              {/* Grid de Logos de Métodos de Pago */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 2, 
                  justifyContent: 'center', 
                  mb: 4,
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 51, 102, 0.1)'
                }}
              >
                {ASSETS.logosPago.map((logo, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      width: 80, 
                      height: 50, 
                      backgroundColor: '#fff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: 1,
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Reemplaza este div con una etiqueta <img> si tienes los logos */}
                    {/* <img src={logo.src} alt={logo.name} style={{ width: '80%', height: 'auto' }} /> */}
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      {logo.name}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Insignia de Pago Seguro */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
                <CreditCard size={28} color="#e67e22" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                  Pago seguro encriptado
                </Typography>
                <ShieldCheck size={28} color="#e67e22" />
              </Box>
              
              {/* Formulario de Tarjeta */}
              <Grid container spacing={3}>
                
                {/* Nombre en la tarjeta */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark', mb: 1, fontWeight: 700 }}>
                    Nombre en la tarjeta
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Ej. Juan Pérez"
                    value={formData.nombreTarjeta}
                    onChange={handleChange('nombreTarjeta')}
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>

                {/* Número de tarjeta */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark', mb: 1, fontWeight: 700 }}>
                    Número de tarjeta
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="0000 0000 0000 0000"
                    value={formData.numeroTarjeta}
                    onChange={handleChange('numeroTarjeta')}
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCard size={20} color="#4a6078" />
                          </InputAdornment>
                        ),
                      }
                    }}
                  />
                </Grid>

                {/* Vencimiento y CVV */}
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark', mb: 1, fontWeight: 700 }}>
                    Vencimiento
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="MM/AA"
                    value={formData.vencimiento}
                    onChange={handleChange('vencimiento')}
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>
                
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark', mb: 1, fontWeight: 700 }}>
                    CVV
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="***"
                    type="password"
                    value={formData.cvv}
                    onChange={handleChange('cvv')}
                    variant="outlined"
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>

              </Grid>

              {/* Botón Pagar Ahora */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button
                  onClick={handlePayment}
                  //disabled={isPayDisabled()}
                  variant="contained"
                  size="large"
                  sx={{
                    width: '100%',
                    maxWidth: 300,
                    py: 1.8,
                    borderRadius: 2,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 20px rgba(0, 51, 102, 0.2)',
                    background: '#002d5a', // Azul oscuro similar a la imagen
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#004b8d',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 25px rgba(0, 51, 102, 0.3)',
                    },
                    '&.Mui-disabled': {
                      background: '#a0b0c0',
                      color: '#ffffff',
                    }
                  }}
                >
                  Pagar Ahora
                </Button>
              </Box>

            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
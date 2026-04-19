'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Grid, // Asumiendo Grid2 basado en tu código anterior
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Tema consistente con el resto de la aplicación
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
};

export default function infoFirmaDigital() {
  const router = useRouter();
  const canvasRef = useRef(null);
  
  // Estados para validación
  const [aceptaDeclaracion, setAceptaDeclaracion] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const handleCheckboxChange = (event) => {
    setAceptaDeclaracion(event.target.checked);
  };

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Aquí puedes capturar la firma como imagen si la necesitas para el backend:
    // const firmaDataUrl = canvasRef.current.toDataURL('image/png');
    
    // Redirigir al siguiente paso
    router.push('/cotizador/viajero/infoMetodosPagos'); // Actualiza esta ruta
  };

  // --- Lógica del Canvas para la Firma ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#003366';
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Soporte para mouse y touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Evita el scroll en dispositivos móviles mientras se dibuja
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };
  // ---------------------------------------

  // El botón está deshabilitado si no acepta los términos o si no ha firmado
  const isContinueDisabled = () => {
    return !aceptaDeclaracion || !hasSignature;
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
            sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}
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
              Te invitamos a realizar tu firma digital
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
              Dibuja tu firma en el recuadro inferior para validar tu identidad
            </Typography>
          </Box>

          {/* Contenedor Principal */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ width: '100%' }}
          >
            {/* Sección: Firma y Términos */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                mb: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderTop: '1px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 16px 48px 0 rgba(0, 51, 102, 0.2)',
              }}
            >
              <Grid container spacing={4}>
                
                {/* Recuadro de Firma */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                      Tu firma
                    </Typography>
                    <Button 
                      startIcon={<RotateCcw size={16} />} 
                      onClick={clearSignature}
                      size="small"
                      sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', backgroundColor: 'error.light', opacity: 0.8 } }}
                    >
                      Limpiar
                    </Button>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: 200, 
                      backgroundColor: '#ffffff', 
                      borderRadius: 2, 
                      border: '2px dashed #b0c4d8',
                      overflow: 'hidden',
                      touchAction: 'none' // Evita que la pantalla haga scroll en móviles al firmar
                    }}
                  >
                    <canvas
                      ref={canvasRef}
                      width={800} // Dimensiones internas más amplias para mejor resolución
                      height={400}
                      style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </Box>
                </Grid>

                {/* Checkbox de Aceptación */}
                <Grid size={{ xs: 12 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={aceptaDeclaracion}
                          onChange={handleCheckboxChange}
                          color="primary"
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                          Por la presente, acepto y autorizo el uso de mi firma digital para la suscripción del documento [Nombre del Documento / Contrato]. Reconozco que esta firma tiene la misma validez legal y vinculante que mi firma manuscrita.
                        </Typography>
                      }
                      sx={{ alignItems: 'flex-start', mt: 2 }}
                    />
                  </FormGroup>
                </Grid>

              </Grid>
            </Paper>

            {/* Botón Continuar centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
              <Button
                onClick={handleContinue}
                disabled={isContinueDisabled()}
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
                  },
                  '&.Mui-disabled': {
                    background: 'linear-gradient(to right, #cccccc, #aaaaaa)',
                  }
                }}
              >
                Continuar
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
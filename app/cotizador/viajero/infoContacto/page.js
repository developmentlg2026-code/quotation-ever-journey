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
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControl,
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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

export default function InfoContacto() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nombreApellido: '',
    telefono: '',
    codigoArea: '54',
    quiereAsesor: 'no',
    asesorSeguros: '',
    declaracionJurada: 'no',
    aceptaDeclaracion: false,
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      aceptaDeclaracion: event.target.checked,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (formData.declaracionJurada === 'si' && !formData.aceptaDeclaracion) {
      return;
    }
    router.push('/cotizador/viajero/infoFirmaDigital');
  };

  const isContinueDisabled = () => {
    if (!formData.nombreApellido || !formData.telefono) {
      return true;
    }
    if (formData.quiereAsesor === 'si' && !formData.asesorSeguros) {
      return true;
    }
    if (formData.declaracionJurada === 'si' && !formData.aceptaDeclaracion) {
      return true;
    }
    return false;
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
              Contacto de emergencia
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
              Completa los datos de la persona de contacto para emergencias
            </Typography>
          </Box>

          {/* Contenedor del Formulario */}
          <Box
            component={motion.form}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ width: '100%' }}
          >
            {/* Sección: Contacto de Emergencia */}
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
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                Datos del contacto de emergencia
              </Typography>
              
              <Grid container spacing={3}>
                {/* Nombre y Apellido */}
                <Grid size={{ xs: 12, sm: 12 }}>
                  <TextField
                    fullWidth
                    label="Nombre y apellido"
                    placeholder="Ingresá el nombre y apellido"
                    value={formData.nombreApellido}
                    onChange={handleChange('nombreApellido')}
                    variant="outlined"
                  />
                </Grid>

                {/* Teléfono */}
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 3 }}>
                      <TextField
                        fullWidth
                        label="Código"
                        placeholder="+54"
                        value={formData.codigoArea}
                        onChange={handleChange('codigoArea')}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 9 }}>
                      <TextField
                        fullWidth
                        label="Número telefónico"
                        placeholder="Código de área y número"
                        value={formData.telefono}
                        onChange={handleChange('telefono')}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            {/* Sección: Asesor de Seguros */}
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
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                Asesor de Seguros
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                    ¿Quieres un asesor de seguros?
                  </Typography>
                  <RadioGroup
                    row
                    value={formData.quiereAsesor}
                    onChange={handleChange('quiereAsesor')}
                    sx={{ mb: 2 }}
                  >
                    <FormControlLabel 
                      value="no" 
                      control={<Radio />} 
                      label="No" 
                    />
                    <FormControlLabel 
                      value="si" 
                      control={<Radio />} 
                      label="Sí" 
                    />
                  </RadioGroup>

                  {formData.quiereAsesor === 'si' && (
                    <FormControl fullWidth>
                      <Select
                        value={formData.asesorSeguros}
                        onChange={handleChange('asesorSeguros')}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Seleccionar asesor
                        </MenuItem>
                        <MenuItem value="asesor1">Asesor Juan Pérez</MenuItem>
                        <MenuItem value="asesor2">Asesor María González</MenuItem>
                        <MenuItem value="asesor3">Asesor Carlos Rodríguez</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>
              </Grid>
            </Paper>

            {/* Sección: Declaración Jurada */}
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
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                Declaración Jurada
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                    ¿Declaras que la información es veraz?
                  </Typography>
                  <RadioGroup
                    row
                    value={formData.declaracionJurada}
                    onChange={handleChange('declaracionJurada')}
                    sx={{ mb: 2 }}
                  >
                    <FormControlLabel 
                      value="no" 
                      control={<Radio />} 
                      label="No" 
                    />
                    <FormControlLabel 
                      value="si" 
                      control={<Radio />} 
                      label="Sí" 
                    />
                  </RadioGroup>

                  {formData.declaracionJurada === 'si' && (
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={formData.aceptaDeclaracion}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Yo declaro que la información suministrada en esta compra es la información veraz de los pasajeros.
                          </Typography>
                        }
                      />
                    </FormGroup>
                  )}
                </Grid>
              </Grid>
            </Paper>

            {/* Botón Continuar centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
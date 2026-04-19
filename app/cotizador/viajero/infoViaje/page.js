"use client";

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
  MenuItem
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Reutilizamos el tema de la sección de viajeros para mantener la consistencia
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

export default function InfoPlanesPage() {
  const router = useRouter();
  
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fechaIda: '',
    fechaVuelta: '',
    cantidadPasajeros: 1,
    edades: '',
    contactoNombres: '',
    contactoApellidos: '',
    contactoTelefono: '',
    contactoCorreo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'edades') {
      // Extraemos solo los números
      let onlyNumbers = value.replace(/\D/g, '');
      
      // Limitamos a 2 dígitos por pasajero para no exceder la cantidad indicada
      const limitePasajeros = parseInt(formData.cantidadPasajeros) || 0;
      const maxDigits = limitePasajeros * 2;
      
      if (onlyNumbers.length > maxDigits) {
        onlyNumbers = onlyNumbers.slice(0, maxDigits);
      }

      // Separamos cada dos dígitos con un guion automáticamente
      const formattedValue = onlyNumbers.replace(/(\d{2})(?=\d)/g, '$1-');
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'contactoTelefono') {
      // Extraemos solo los números
      let onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length > 11) {
        onlyNumbers = onlyNumbers.slice(0, 11);
      }

      let formattedValue = '';
      if (onlyNumbers.length > 0) {
        formattedValue += '(' + onlyNumbers.substring(0, 4);
      }
      if (onlyNumbers.length > 4) {
        formattedValue += ')' + onlyNumbers.substring(4, 7);
      }
      if (onlyNumbers.length > 7) {
        formattedValue += '-' + onlyNumbers.substring(7, 9);
      }
      if (onlyNumbers.length > 9) {
        formattedValue += '-' + onlyNumbers.substring(9, 11);
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar al API o pasar a la siguiente pantalla
    console.log("Datos del viaje:", formData);
    router.push('/cotizador/viajero/infoPlanes');
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
          backgroundColor: '#f8fafc', // Fondo sutil y limpio
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
            opacity: 0.15, // Más transparente para no competir con el formulario
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
              onClick={() => router.push('/cotizador/viajero')}
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
              Información necesaria para ofrecerte los mejores planes que se adapten a ti
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
              Completa los detalles de tu viaje a continuación
            </Typography>
          </Box>

          {/* Contenedor del Formulario */}
          <Box
            component={motion.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ width: '100%' }}
          >
            {/* Sección 1: Datos del Viaje */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                mb: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)',
                // backdropFilter: 'blur(40px) saturate(200%)',
                // WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderTop: '1px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 16px 48px 0 rgba(0, 51, 102, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                Datos del Viaje
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs:12, sm:6 }} >
                  <TextField 
                    select 
                    fullWidth 
                    label="Origen" 
                    name="origen" 
                    value={formData.origen} 
                    onChange={handleChange} 
                    variant="outlined" 
                    required
                  >
                    <MenuItem value="Venezuela">Venezuela</MenuItem>
                    <MenuItem value="Panamá">Panamá</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField 
                    select
                    fullWidth 
                    label="Destino" 
                    name="destino" 
                    value={formData.destino} 
                    onChange={handleChange} 
                    variant="outlined" 
                    required
                  >
                    <MenuItem value="América del Sur">América del Sur</MenuItem>
                    <MenuItem value="Estados Unidos - Canadá">Estados Unidos - Canadá</MenuItem>
                    <MenuItem value="Europa">Europa</MenuItem>
                    <MenuItem value="México, Am. Central y/o Caribe">México, Am. Central y/o Caribe</MenuItem>
                    <MenuItem value="Resto del Mundo">Resto del Mundo</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Fecha de ida" name="fechaIda" type="date" value={formData.fechaIda} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Fecha de vuelta" name="fechaVuelta" type="date" value={formData.fechaVuelta} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                </Grid>
                
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Cantidad de pasajeros" name="cantidadPasajeros" type="number" InputProps={{ inputProps: { min: 1 } }} value={formData.cantidadPasajeros} onChange={handleChange} variant="outlined" required />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Edades de los pasajeros" name="edades" value={formData.edades} onChange={handleChange} variant="outlined" placeholder="Ej. 25-30-8" required />
                </Grid>
              </Grid>
            </Paper>

            {/* Sección 2: Persona de Contacto */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)',
                // backdropFilter: 'blur(40px) saturate(200%)',
                // WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderTop: '1px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 16px 48px 0 rgba(0, 51, 102, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                Persona de Contacto
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Nombres" name="contactoNombres" value={formData.contactoNombres} onChange={handleChange} variant="outlined" required />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Apellidos" name="contactoApellidos" value={formData.contactoApellidos} onChange={handleChange} variant="outlined" required />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Número Telefónico" name="contactoTelefono" type="tel" value={formData.contactoTelefono} onChange={handleChange} variant="outlined" placeholder="Ej. (0414)202-31-81" required />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Correo Electrónico" name="contactoCorreo" type="email" value={formData.contactoCorreo} onChange={handleChange} variant="outlined" required />
                </Grid>
              </Grid>
            </Paper>

            {/* Botón de Enviar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                type="submit"
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
                Continuar
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

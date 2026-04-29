"use client";

import React, { useState, useRef } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Upload, Eye, X, Camera, Keyboard } from 'lucide-react';
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

  const boletoInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [boletoImage, setBoletoImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleBoletoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      setBoletoImage(base64String);
      
      setIsAnalyzing(true);
      try {
        const response = await fetch('/api/analizeAirTicket.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64String })
        });
        const result = await response.json();
        
        if (result.success && result.data && result.data.esBoletoValido) {
          const { paisOrigen, paisDestino, fechaIda, fechaVuelta, cantidadPasajeros } = result.data;
          
          setFormData(prev => {
            return {
              ...prev,
              origen: paisOrigen || prev.origen,
              destino: paisDestino || prev.destino,
              fechaIda: fechaIda || prev.fechaIda,
              fechaVuelta: fechaVuelta || prev.fechaVuelta,
              cantidadPasajeros: cantidadPasajeros || prev.cantidadPasajeros
            };
          });
        } else if (result.data && !result.data.esBoletoValido) {
          alert('La imagen no parece ser un boleto válido.');
        }
      } catch (error) {
        console.error("Error analizando el boleto:", error);
        alert('Hubo un problema al procesar la imagen del boleto.');
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset para permitir subir la misma imagen
  };

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
    console.log("Datos del viaje:", { ...formData, boletoImage });
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

              {/* Sección de Subida de Boleto */}
              <Box sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 3, 
                bgcolor: 'rgba(0, 75, 141, 0.03)', 
                border: '1px dashed rgba(0, 75, 141, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: 2, fontWeight: 700 }}>
                  ¿Cómo deseas ingresar los datos de tu viaje?
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center', maxWidth: '500px' }}>
                  Toma una foto o sube la imagen de tu boleto para autocompletar la información, o ingresa los datos de forma manual.
                </Typography>
                <input type="file" accept="image/*" ref={boletoInputRef} style={{ display: 'none' }} onChange={handleBoletoUpload} />
                <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: 'none' }} onChange={handleBoletoUpload} />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    startIcon={isAnalyzing ? <CircularProgress size={18} /> : <Camera size={18} />} 
                    onClick={() => cameraInputRef.current.click()}
                    disabled={isAnalyzing}
                    title="Tomar Foto"
                    sx={{ 
                      borderRadius: '10px', 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      borderColor: 'rgba(0, 75, 141, 0.3)',
                      minWidth: { xs: '40px', sm: '64px' },
                      p: { xs: '8px 12px', sm: '6px 16px' },
                      '& .MuiButton-startIcon': { m: { xs: 0, sm: '0 8px 0 -4px' } }
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
                      {isAnalyzing ? 'Analizando...' : 'Tomar Foto'}
                    </Box>
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={isAnalyzing ? <CircularProgress size={18} /> : <Upload size={18} />} 
                    onClick={() => boletoInputRef.current.click()}
                    disabled={isAnalyzing}
                    title="Subir Imagen"
                    sx={{ 
                      borderRadius: '10px', 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      borderColor: 'rgba(0, 75, 141, 0.3)',
                      minWidth: { xs: '40px', sm: '64px' },
                      p: { xs: '8px 12px', sm: '6px 16px' },
                      '& .MuiButton-startIcon': { m: { xs: 0, sm: '0 8px 0 -4px' } }
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
                      {isAnalyzing ? 'Analizando...' : 'Subir Imagen'}
                    </Box>
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Keyboard size={18} />} 
                    onClick={() => {
                      const input = document.getElementById('origen-input');
                      if (input) {
                        input.focus();
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    disabled={isAnalyzing}
                    title="Ingresar Manual"
                    sx={{ 
                      borderRadius: '10px', 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      borderColor: 'rgba(0, 75, 141, 0.3)', 
                      color: 'text.secondary',
                      minWidth: { xs: '40px', sm: '64px' },
                      p: { xs: '8px 12px', sm: '6px 16px' },
                      '& .MuiButton-startIcon': { m: { xs: 0, sm: '0 8px 0 -4px' } }
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
                      Ingresar Manual
                    </Box>
                  </Button>
                  {boletoImage && (
                    <Button 
                      variant="outlined" 
                      startIcon={<Eye size={18} />} 
                      onClick={() => setPreviewImage(boletoImage)}
                      title="Ver Boleto"
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        minWidth: { xs: '40px', sm: '64px' },
                        p: { xs: '8px 12px', sm: '6px 16px' },
                        '& .MuiButton-startIcon': { m: { xs: 0, sm: '0 8px 0 -4px' } }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
                        Ver Boleto
                      </Box>
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs:12, sm:6 }} >
                  <TextField 
                    id="origen-input"
                    fullWidth 
                    label="Origen" 
                    name="origen" 
                    value={formData.origen} 
                    onChange={handleChange} 
                    variant="outlined" 
                  />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField 
                    fullWidth 
                    label="Destino" 
                    name="destino" 
                    value={formData.destino} 
                    onChange={handleChange} 
                    variant="outlined" 
                  />
                </Grid>
                
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Fecha de ida" name="fechaIda" type="date" value={formData.fechaIda} onChange={handleChange} InputLabelProps={{ shrink: true }}  />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Fecha de vuelta" name="fechaVuelta" type="date" value={formData.fechaVuelta} onChange={handleChange} InputLabelProps={{ shrink: true }}  />
                </Grid>
                
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Cantidad de pasajeros" name="cantidadPasajeros" type="number" InputProps={{ inputProps: { min: 1 } }} value={formData.cantidadPasajeros} onChange={handleChange} variant="outlined"  />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Edades de los pasajeros" name="edades" value={formData.edades} onChange={handleChange} variant="outlined" placeholder="Ej. 25-30-8"  />
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
                  <TextField fullWidth label="Nombres" name="contactoNombres" value={formData.contactoNombres} onChange={handleChange} variant="outlined"  />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Apellidos" name="contactoApellidos" value={formData.contactoApellidos} onChange={handleChange} variant="outlined"  />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Número Telefónico" name="contactoTelefono" type="tel" value={formData.contactoTelefono} onChange={handleChange} variant="outlined" placeholder="Ej. (0414)202-31-81"  />
                </Grid>
                <Grid size={{ xs:12, sm:6 }}>
                  <TextField fullWidth label="Correo Electrónico" name="contactoCorreo" type="email" value={formData.contactoCorreo} onChange={handleChange} variant="outlined"  />
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

          {/* Modal de Previsualización de Imagen */}
          <Dialog open={!!previewImage} onClose={() => setPreviewImage(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                Boleto Adjunto
              </Typography>
              <IconButton onClick={() => setPreviewImage(null)} size="small" sx={{ color: 'text.secondary' }}>
                <X size={20} />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, bgcolor: '#f8fafc' }}>
              {previewImage && (
                <img src={previewImage} alt="Previsualización del boleto" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', objectFit: 'contain', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              )}
            </DialogContent>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

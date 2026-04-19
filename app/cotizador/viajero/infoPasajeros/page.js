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
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Camera, Upload, Edit, Trash2, Plus, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Reutilizamos el tema global de la sección
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

export default function InfoPasajerosPage() {
  const router = useRouter();
  
  // Estado para los datos del titular
  const [formData, setFormData] = useState({
    tipoIdentificacion: 'V',
    numeroIdentificacion: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    fechaVencimiento: ''
  });

  // Estado para los acompañantes
  const [acompanantes, setAcompanantes] = useState([]);
  
  // Estados y referencias para la extracción de datos
  const [processingTarget, setProcessingTarget] = useState(null); // 'titular' o el index del acompañante
  const [activeScanTarget, setActiveScanTarget] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [titularImage, setTitularImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Contiene la base64 a previsualizar
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanionChange = (index, e) => {
    const { name, value } = e.target;
    setAcompanantes(prev => {
      const newArr = [...prev];
      newArr[index][name] = value;
      return newArr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del titular:", formData, "Acompañantes:", acompanantes);
    router.push('/cotizador/viajero/infoContacto');
  };

  // Manejador para el archivo seleccionado (cámara o galería)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImage(file, activeScanTarget);
    e.target.value = ''; // Reset para permitir subir la misma imagen si es necesario
  };

  const triggerUpload = (target) => {
    setActiveScanTarget(target);
    fileInputRef.current.click();
  };

  const triggerCamera = (target) => {
    setActiveScanTarget(target);
    cameraInputRef.current.click();
  };

  // Procesar la imagen y enviarla al API
  const processImage = async (file, target) => {
    setProcessingTarget(target);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result;
        
        // Guardamos la imagen en el estado correspondiente para previsualizarla
        if (target === 'titular') {
          setTitularImage(base64data);
        } else {
          setAcompanantes(prev => {
            const newArr = [...prev];
            newArr[target] = { ...newArr[target], image: base64data };
            return newArr;
          });
        }

        const res = await fetch('/api/extract-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64data })
        });
        
        const result = await res.json();
        
        if (result.success && result.data) {
          if (result.data.esValido === false) {
            setErrorMsg('El documento ingresado no es válido o es ilegible. Asegúrate de subir una foto clara de una Cédula o Pasaporte.');
            setProcessingTarget(null);
            return;
          }

          let rawCedula = result.data.cedula || '';
          let typeId = 'V';
          if (rawCedula.toUpperCase().includes('E')) typeId = 'E';
          const cleanCedula = rawCedula.replace(/\D/g, '');
          
          // Formatear fecha de DD/MM/YYYY a YYYY-MM-DD para el input type="date"
          let parsedDate = '';
          if (result.data.fechaNacimiento) {
            const parts = result.data.fechaNacimiento.split(/[\/\-]/);
            if (parts.length === 3) parsedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          }

          // Formatear fecha de vencimiento de DD/MM/YYYY a YYYY-MM-DD
          let parsedExpiration = '';
          if (result.data.fechaVencimiento) {
            const partsExp = result.data.fechaVencimiento.split(/[\/\-]/);
            if (partsExp.length === 3) parsedExpiration = `${partsExp[2]}-${partsExp[1].padStart(2, '0')}-${partsExp[0].padStart(2, '0')}`;
          }

          if (target === 'titular') {
            setFormData(prev => ({
              ...prev,
              tipoIdentificacion: cleanCedula ? typeId : prev.tipoIdentificacion,
              numeroIdentificacion: cleanCedula || prev.numeroIdentificacion,
              nombres: result.data.nombres || prev.nombres,
              apellidos: result.data.apellidos || prev.apellidos,
              fechaNacimiento: parsedDate || prev.fechaNacimiento,
              fechaVencimiento: parsedExpiration || prev.fechaVencimiento
            }));
            setShowForm(true); // Mostramos el formulario al terminar la extracción
          } else {
            setAcompanantes(prev => {
              const newArr = [...prev];
              newArr[target] = {
                ...newArr[target],
                tipoIdentificacion: cleanCedula ? typeId : newArr[target].tipoIdentificacion,
                numeroIdentificacion: cleanCedula || newArr[target].numeroIdentificacion,
                nombres: result.data.nombres || newArr[target].nombres,
                apellidos: result.data.apellidos || newArr[target].apellidos,
                fechaNacimiento: parsedDate || newArr[target].fechaNacimiento,
                fechaVencimiento: parsedExpiration || newArr[target].fechaVencimiento,
                showForm: true
              };
              return newArr;
            });
          }
        }
        setProcessingTarget(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error procesando imagen:", error);
      setProcessingTarget(null);
    }
  };

  const addCompanion = () => {
    setAcompanantes(prev => [
      ...prev,
      {
        id: Date.now(),
        tipoIdentificacion: 'V',
        numeroIdentificacion: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        fechaVencimiento: '',
        showForm: false,
        image: null
      }
    ]);
  };

  const removeCompanion = (index) => {
    setAcompanantes(prev => prev.filter((_, i) => i !== index));
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
              onClick={() => router.back()}
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
              Información de los Pasajeros
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
              Ingresa los datos del titular principal del plan
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
                Datos del Titular
              </Typography>

              {/* Inputs ocultos para subida de archivos y cámara */}
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
              <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />

              {/* Sección de Autocompletado con IA */}
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
                  Autocompletado Inteligente
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center', maxWidth: '400px' }}>
                  Sube una imagen o toma una foto de tu documento de identidad para llenar tus datos automáticamente.
                </Typography>
                <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, flexWrap: { xs: 'nowrap', sm: 'wrap' }, justifyContent: 'center', width: '100%' }}>
                  <Button 
                    variant="outlined" 
                    startIcon={processingTarget === 'titular' ? <CircularProgress size={18} color="inherit" /> : <Upload size={18} />} 
                    onClick={() => triggerUpload('titular')}
                    disabled={processingTarget !== null}
                    sx={{ 
                      borderRadius: '10px', 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      borderColor: 'rgba(0, 75, 141, 0.3)',
                      minWidth: { xs: '48px', sm: 'auto' },
                      height: { xs: '48px', sm: 'auto' },
                      px: { xs: 0, sm: 2 },
                      '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                      {processingTarget === 'titular' ? 'Procesando...' : 'Subir Imagen'}
                    </Box>
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={processingTarget === 'titular' ? <CircularProgress size={18} color="inherit" /> : <Camera size={18} />} 
                    onClick={() => triggerCamera('titular')}
                    disabled={processingTarget !== null}
                    sx={{ 
                      borderRadius: '10px', 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      borderColor: 'rgba(0, 75, 141, 0.3)',
                      minWidth: { xs: '48px', sm: 'auto' },
                      height: { xs: '48px', sm: 'auto' },
                      px: { xs: 0, sm: 2 },
                      '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                      {processingTarget === 'titular' ? 'Procesando...' : 'Tomar Foto'}
                    </Box>
                  </Button>
                  {/* {!showForm && ( */}
                    <Button 
                      variant="outlined" 
                      startIcon={<Edit size={18} />} 
                      onClick={() => setShowForm(true)}
                      disabled={processingTarget !== null}
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        minWidth: { xs: '48px', sm: 'auto' },
                        height: { xs: '48px', sm: 'auto' },
                        px: { xs: 0, sm: 2 },
                        '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Ingreso Manual
                      </Box>
                    </Button>
                   {/* )} */}
                  {titularImage && (
                    <Button 
                      variant="outlined" 
                      startIcon={<Eye size={18} />} 
                      onClick={() => setPreviewImage(titularImage)}
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        minWidth: { xs: '48px', sm: 'auto' },
                        height: { xs: '48px', sm: 'auto' },
                        px: { xs: 0, sm: 2 },
                        '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Ver Documento
                      </Box>
                    </Button>
                  )}
                </Box>
              </Box>

              {showForm && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField select fullWidth label="Tipo de Identificación" name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange} variant="outlined" required>
                        <MenuItem value="V">Venezolano (V)</MenuItem>
                        <MenuItem value="E">Extranjero (E)</MenuItem>
                        <MenuItem value="P">Pasaporte (P)</MenuItem>
                        <MenuItem value="J">Jurídico (J)</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Número de Identificación" name="numeroIdentificacion" value={formData.numeroIdentificacion} onChange={handleChange} variant="outlined" required />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} variant="outlined" required />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} variant="outlined" required />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Fecha de Vencimiento" name="fechaVencimiento" type="date" value={formData.fechaVencimiento} onChange={handleChange} InputLabelProps={{ shrink: true }} helperText="Vencimiento del documento" required />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>

            {/* Acompañantes Dinámicos */}
            {acompanantes.map((acompanante, index) => (
              <Paper
                key={acompanante.id}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  position: 'relative'
                }}
              >
                <Button
                  onClick={() => removeCompanion(index)}
                  color="error"
                  sx={{ position: 'absolute', top: 16, right: 16, minWidth: 'auto', p: 1 }}
                >
                  <Trash2 size={20} />
                </Button>
                
                <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 700 }}>
                  Acompañante {index + 1}
                </Typography>

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
                    Autocompletado Inteligente
                  </Typography>
                  <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, flexWrap: { xs: 'nowrap', sm: 'wrap' }, justifyContent: 'center', width: '100%' }}>
                    <Button 
                      variant="outlined" 
                      startIcon={processingTarget === index ? <CircularProgress size={18} color="inherit" /> : <Upload size={18} />} 
                      onClick={() => triggerUpload(index)}
                      disabled={processingTarget !== null}
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        minWidth: { xs: '48px', sm: 'auto' },
                        height: { xs: '48px', sm: 'auto' },
                        px: { xs: 0, sm: 2 },
                        '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        {processingTarget === index ? 'Procesando...' : 'Subir Imagen'}
                      </Box>
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={processingTarget === index ? <CircularProgress size={18} color="inherit" /> : <Camera size={18} />} 
                      onClick={() => triggerCamera(index)}
                      disabled={processingTarget !== null}
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        minWidth: { xs: '48px', sm: 'auto' },
                        height: { xs: '48px', sm: 'auto' },
                        px: { xs: 0, sm: 2 },
                        '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        {processingTarget === index ? 'Procesando...' : 'Tomar Foto'}
                      </Box>
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Edit size={18} />} 
                      onClick={() => {
                        setAcompanantes(prev => {
                          const newArr = [...prev];
                          newArr[index].showForm = true;
                          return newArr;
                        });
                      }}
                      disabled={processingTarget !== null}
                      sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        minWidth: { xs: '48px', sm: 'auto' },
                        height: { xs: '48px', sm: 'auto' },
                        px: { xs: 0, sm: 2 },
                        '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Ingreso Manual
                      </Box>
                    </Button>
                    {acompanante.image && (
                      <Button 
                        variant="outlined" 
                        startIcon={<Eye size={18} />} 
                        onClick={() => setPreviewImage(acompanante.image)}
                        sx={{ 
                          borderRadius: '10px', 
                          textTransform: 'none', 
                          fontWeight: 600, 
                          borderColor: 'rgba(0, 75, 141, 0.3)',
                          minWidth: { xs: '48px', sm: 'auto' },
                          height: { xs: '48px', sm: 'auto' },
                          px: { xs: 0, sm: 2 },
                          '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } }
                        }}
                      >
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                          Ver Documento
                        </Box>
                      </Button>
                    )}
                  </Box>
                </Box>

                {acompanante.showForm && (
                  <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField select fullWidth label="Tipo de Identificación" name="tipoIdentificacion" value={acompanante.tipoIdentificacion} onChange={(e) => handleCompanionChange(index, e)} variant="outlined" required>
                          <MenuItem value="V">Venezolano (V)</MenuItem>
                          <MenuItem value="E">Extranjero (E)</MenuItem>
                          <MenuItem value="P">Pasaporte (P)</MenuItem>
                          <MenuItem value="J">Jurídico (J)</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Número de Identificación" name="numeroIdentificacion" value={acompanante.numeroIdentificacion} onChange={(e) => handleCompanionChange(index, e)} variant="outlined" required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Nombres" name="nombres" value={acompanante.nombres} onChange={(e) => handleCompanionChange(index, e)} variant="outlined" required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Apellidos" name="apellidos" value={acompanante.apellidos} onChange={(e) => handleCompanionChange(index, e)} variant="outlined" required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={acompanante.fechaNacimiento} onChange={(e) => handleCompanionChange(index, e)} InputLabelProps={{ shrink: true }} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Fecha de Vencimiento" name="fechaVencimiento" type="date" value={acompanante.fechaVencimiento} onChange={(e) => handleCompanionChange(index, e)} InputLabelProps={{ shrink: true }} helperText="Vencimiento del documento" required />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            ))}

            {/* Botón para Agregar Acompañante */}
            {showForm && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Plus />}
                  onClick={addCompanion}
                  sx={{
                    borderRadius: '9999px',
                    px: 4,
                    py: 1,
                    color: 'primary.main',
                    borderColor: 'rgba(0, 75, 141, 0.3)',
                    fontWeight: 600,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 75, 141, 0.05)',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  Agregar Acompañante
                </Button>
              </Box>
            )}

            {/* Botón de Enviar */}
            {showForm && (
              <Box 
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
              >
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
            )}
          </Box>

          {/* Modal de Previsualización de Imagen */}
          <Dialog open={!!previewImage} onClose={() => setPreviewImage(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                Documento Adjunto
              </Typography>
              <IconButton onClick={() => setPreviewImage(null)} size="small" sx={{ color: 'text.secondary' }}>
                <X size={20} />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, bgcolor: '#f8fafc' }}>
              {previewImage && (
                <img 
                  src={previewImage} 
                  alt="Previsualización del documento" 
                  style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', objectFit: 'contain', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Snackbar para errores */}
          <Snackbar 
            open={!!errorMsg} 
            autoHideDuration={6000} 
            onClose={() => setErrorMsg('')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setErrorMsg('')} severity="error" sx={{ width: '100%', borderRadius: 3 }}>
              {errorMsg}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
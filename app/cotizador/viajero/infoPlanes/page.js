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
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { motion } from 'motion/react';
import { ChevronLeft, User, Users, Briefcase, Mountain, ShieldCheck, ChevronRight, X, CheckCircle2, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Reutilizamos el tema para mantener la consistencia
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

// Datos de los planes con sus respectivos íconos y colores de acento
const PLANES = [
  {
    id: 'singer',
    title: 'Plan Singer',
    description: 'Para aquellas personas donde el disfrute es individual.',
    coberturas: 'Destinado a personas que viajan de forma individual. Aplica para los niveles Lite, Pro y Black.',
    icon: User,
    color: '#4DA6FF' // Celeste
  },
  {
    id: 'family',
    title: 'Plan Family Network',
    description: 'La familia de vacaciones, resguardaremos la protección de todos.',
    coberturas: 'Diseñado para vacaciones familiares, resguardando a todos los miembros. Aplica para los niveles Lite, Pro y Black.',
    icon: Users,
    color: '#004b8d' // Azul primario
  },
  {
    id: 'corporate',
    title: 'Plan Corporativo & Business',
    description: 'Viajas por asuntos profesionales, tranquilo, te ofrecemos el mejor plan.',
    coberturas: 'Orientado a viajes de asuntos profesionales. Aplica para los niveles Lite, Pro y Black.',
    icon: Briefcase,
    color: '#1b1b3a' // Azul marino oscuro
  },
  {
    id: 'xtreme',
    title: 'Plan Xtreme Pro',
    description: 'Si viajas y tu estilo de vida busca experiencias extremas este es tu mejor alternativa.',
    coberturas: 'Creado para viajeros con un estilo de vida que incluye experiencias extremas. Aplica exclusivamente para los niveles Pro y Black.',
    icon: Mountain,
    color: '#d32f2f' // Rojo aventura
  },
  {
    id: 'cyber',
    title: 'Plan Cyber Defense',
    description: 'Protección contra fraude y robo de identidad digital, esencial para el profesional con movilidad recurrente.',
    coberturas: 'Brinda protección contra fraude y robo de identidad digital. Aplica exclusivamente para los niveles Pro y Black.',
    icon: ShieldCheck,
    color: '#5216f4' // Morado vibrante
  }
];

// Detalle de las coberturas incluidas
const COBERTURAS_GENERALES = [
  { title: 'Médicas', desc: 'Cobertura integral para emergencias de salud, atención y traslados médicos durante tu viaje.' },
  { title: 'Operativas de Viaje', desc: 'Asistencia ante imprevistos logísticos, pérdida de equipaje o cancelación de vuelos.' },
  { title: 'Asistencia Legal', desc: 'Orientación jurídica y acompañamiento legal en el extranjero.' },
  { title: 'Gestión Billetera Virtual', desc: 'Disponibilidad inmediata de fondos ante emergencias mediante GuiaPay.' }
];

// Variantes para la animación en cascada (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function InfoPlanesPage() {
  const router = useRouter();
  
  // Estado para el modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
          
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
            sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                lineHeight: 1.2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                mb: 2
              }}
            >
              Planes que te ofrecemos
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.15rem', maxWidth: '600px', mx: 'auto' }}>
              Selecciona la cobertura que mejor se adapte a tu estilo de viaje y necesidades.
            </Typography>
          </Box>

          {/* Grid de Planes */}
          <Grid 
            container 
            spacing={3} 
            justifyContent="center"
            alignItems="stretch"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {PLANES.map((plan) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={plan.id} component={motion.div} variants={cardVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    // backdropFilter: 'blur(40px) saturate(200%)',
                    // WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.8)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 16px 48px 0 rgba(0, 51, 102, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 24px 60px 0 rgba(0, 51, 102, 0.2)',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 100%)',
                      '& .plan-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                      '& .select-button': {
                        background: 'linear-gradient(to right, #004b8d, #002d5a)',
                        color: 'white',
                      }
                    }
                  }}
                >
                  {/* Icono del plan */}
                  <Box 
                    className="plan-icon"
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: 2.5, 
                      backgroundColor: `${plan.color}15`, // Fondo con 15% de opacidad
                      color: plan.color,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 2,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <plan.icon size={24} strokeWidth={1.5} />
                  </Box>

                  {/* Título */}
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1, fontSize: '1.25rem' }}>
                    {plan.title}
                  </Typography>

                  {/* Descripción */}
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, flexGrow: 1, fontSize: '0.9rem', lineHeight: 1.4 }}>
                    {plan.description}
                  </Typography>

                  {/* Botones de acción */}
                  <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="text"
                      onClick={(e) => { e.stopPropagation(); handleOpenModal(plan); }}
                      startIcon={<Info size={16} />}
                      disableRipple
                      sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        p: '4px 10px',
                        ml: '-4px', // Compensa visualmente el padding para alinear con el texto
                        borderRadius: '10px',
                        alignSelf: 'flex-start',
                        backgroundColor: 'transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          backgroundColor: 'rgba(0, 75, 141, 0.08)', // Fondo uniforme sutil
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      Ver coberturas
                    </Button>
                    <Button
                      className="select-button"
                      variant="outlined"
                      onClick={() => router.push('/cotizador/viajero/infoPasajeros')}
                      endIcon={<ChevronRight size={18} />}
                      sx={{
                        borderRadius: '9999px',
                        py: 1,
                        borderColor: 'rgba(0, 75, 141, 0.3)',
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Comprar
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Modal de Coberturas */}
          <Dialog 
            open={openModal} 
            onClose={handleCloseModal}
            scroll="paper"
            maxWidth="sm"
            fullWidth
            PaperProps={{ 
              sx: { 
                borderRadius: 4, 
                p: 0
              } 
            }}
          >
            <DialogTitle sx={{ fontWeight: 800, color: 'primary.main', pr: 6, fontSize: '1.4rem', p: 3 }}>
              {selectedPlan?.title}
              <IconButton
                onClick={handleCloseModal}
                sx={{ position: 'absolute', right: 16, top: 16, color: 'text.secondary' }}
              >
                <X size={24} />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 0 }}>
              {/* Descripción específica del plan */}
              <Box sx={{ p: 3, bgcolor: 'rgba(0, 75, 141, 0.03)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                  Sobre este plan:
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {selectedPlan?.coberturas}
                </Typography>
              </Box>
              
              {/* Lista general de coberturas */}
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                  Todos nuestros planes incluyen las siguientes coberturas:
                </Typography>
                <List disablePadding>
                  {COBERTURAS_GENERALES.map((cobertura, index) => (
                    <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36, mt: 0.5, color: 'primary.main' }}>
                        <CheckCircle2 size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={cobertura.title}
                        secondary={cobertura.desc}
                        primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 700, color: 'text.primary', mb: 0.5 }}
                        secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary', lineHeight: 1.5 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button 
                onClick={handleCloseModal} 
                variant="contained" 
                sx={{ 
                  borderRadius: 8, 
                  textTransform: 'none', 
                  fontWeight: 700,
                  px: 4,
                  background: 'linear-gradient(to right, #004b8d, #002d5a)'
                }}
              >
                Entendido
              </Button>
            </DialogActions>
          </Dialog>

        </Container>
      </Box>
    </ThemeProvider>
  );
}
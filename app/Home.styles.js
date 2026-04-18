// Home.styles.js
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Divider, Button } from '@mui/material'; // Añade Button aquí

// Contenedor principal - OCUPA EL 100% DE LA PANTALLA
export const MainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column'
}));

// Contenedor para centrar el contenido (70% en web, responsive)
export const ContentContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '70% !important',
  margin: '0 auto',
  padding: theme.spacing(2),
  
  [theme.breakpoints.down('md')]: {
    maxWidth: '85% !important',
  },
  
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95% !important',
    padding: theme.spacing(1),
  }
}));

// Header
// ==========================================
// HEADER Y LOGO (Fijo al hacer scroll)
// ==========================================
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: theme.spacing(1.5, 0), // Padding dinámico en lugar de altura fija
  borderBottom: '1px solid #eee',
  
  // ==========================================
  // ESTO LO MANTIENE FIJO AL HACER SCROLL
  // ==========================================
  position: 'sticky',
  top: 0,
  zIndex: 1100, // Un z-index alto asegura que pase por encima de todo
  
  // Fondo blanco con efecto de cristal esmerilado para que se vea elegante al hacer scroll
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
}));


// ==========================================

export const HeaderContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '70% !important',
  margin: '0 auto',
  padding: theme.spacing(2),
  
  [theme.breakpoints.down('md')]: {
    maxWidth: '85% !important',
  },
  
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95% !important',
    padding: theme.spacing(1),
  }
}));

// Hero Section
export const HeroSection = styled(Box)(({ theme }) => ({
  width: '90%',
  height: 220,
  margin: '0 auto',
  backgroundColor: '#00102a',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: 'url(/static/banner/banner_az_capital.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    height: 180,
  }
}));

export const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,20,50,0.6)',
  borderRadius: theme.spacing(2),
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 1
}));

export const HeroTitle = styled(Box)(({ theme }) => ({
  color: '#fff',
  fontWeight: 700,
  letterSpacing: 1,
  fontSize: '0.875rem'
}));

export const HeroSubtitle = styled(Box)(({ theme }) => ({
  color: '#88ccff',
  fontWeight: 600,
  marginTop: theme.spacing(0.5),
  fontSize: '0.875rem'
}));

export const HeroCaption = styled(Box)(({ theme }) => ({
  color: '#ccc',
  marginTop: theme.spacing(0.5),
  display: 'block',
  fontSize: '0.75rem'
}));

// Títulos y textos
export const SectionTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.5rem',
  textAlign: 'center',
  fontFamily: 'serif',
  color: '#8b7355',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  letterSpacing: 2
}));

export const VerificationTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.5rem',
  textAlign: 'center',
  fontFamily: 'serif',
  color: '#00204a',
  marginBottom: theme.spacing(1),
  fontWeight: 700
}));

// Accordions
export const AccordionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4)
}));

export const AccordionHeaderText = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  color: '#445566',
  fontSize: '0.875rem'
}));

export const AccordionDetailText = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  border: '1px solid #eef2f5',
  padding: theme.spacing(2),
  fontSize: '0.875rem',
  color: '#333'
}));

// Cards y contenedores
export const StepContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

export const Step2Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f8f9fa'
}));

// Estilos para el área de imagen
export const ImageAreaContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasImage',
})(({ theme, hasImage }) => ({
  width: '100%',
  minHeight: 220,
  border: hasImage ? '2px solid transparent' : '2px dashed #8b7355',
  borderRadius: theme.spacing(2),
  backgroundColor: hasImage ? 'transparent' : '#fdfbf9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  position: 'relative',
  transition: 'all 0.3s ease',
  boxShadow: hasImage ? 'none' : 'inset 0 0 10px rgba(139, 115, 85, 0.05)'
}));

export const UploadPlaceholder = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  color: '#8b7355'
}));

export const StyledPreviewImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '260px',
  objectFit: 'contain',
  borderRadius: theme.spacing(1),
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
}));

export const ResultPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(1),
  borderTop: '4px solid #4a4e69',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
}));

export const SuccessMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.success.main
}));

// Form fields container
export const FormFieldsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

export const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1)
  }
}));

// Button group
export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  justifyContent: 'center',
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1)
  }
}));

// Contenedor para los datos extraídos
export const ExtractedDataContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  maxWidth: '500px',
  margin: '0 auto',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    maxWidth: '100%',
  }
}));

// NUEVOS ESTILOS PARA EL PASO 3

// Contenedor para la calculadora
export const CalculatorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  maxWidth: '600px',
  margin: '0 auto',
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    maxWidth: '100%',
  }
}));

// Título de la compañía
export const CompanyTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#00204a',
  textAlign: 'center',
  marginBottom: theme.spacing(0.5)
}));

export const CompanyRif = styled(Box)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#666',
  textAlign: 'center',
  marginBottom: theme.spacing(2)
}));

// Título de sección
export const SectionTitle2 = styled(Box)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#8b7355',
  marginBottom: theme.spacing(1.5),
  textAlign: 'center'
}));

// Opciones de la calculadora
export const OptionCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  border: selected ? '2px solid #4a4e69' : '1px solid #e0e0e0',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: selected ? '#f8f9fa' : '#fff',
  '&:hover': {
    borderColor: '#4a4e69',
    backgroundColor: '#f5f5f5'
  }
}));

// Plan cards
export const PlanCard = styled(Box)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
}));

export const PlanTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#00204a',
  marginBottom: theme.spacing(1.5),
  textAlign: 'center'
}));

export const PlanSubtitle = styled(Box)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#666',
  marginBottom: theme.spacing(1)
}));

export const PlanRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(0.75),
  '&:last-child': {
    marginBottom: 0
  }
}));

export const PlanLabel = styled(Box)(({ theme }) => ({
  fontSize: '0.85rem',
  color: '#333'
}));

export const PlanValue = styled(Box)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#00204a'
}));

export const PlanDivider = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1.5, 0),
  borderTop: '1px solid #e0e0e0',
  width: '100%'
}));

export const TotalValue = styled(Box)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 700,
  color: '#4a4e69'
}));

// CORREGIDO: Button ya está importado arriba
export const BuyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8b7355',
  color: '#fff',
  width: '100%',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#6b573f'
  }
}));

// =========================================================================
// NUEVOS ESTILOS AGREGADOS PARA EL STEPPER Y LOS BANNERS DE PLANES
// =========================================================================

// Stepper
export const StepperWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
  borderBottom: '4px solid #f5f5f5',
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff'
}));

// Caja de Información Azul Claro
export const InfoBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: '#eef2f8', // Azul muy claro
  borderTop: '2px solid #cdd8e5',
  borderRadius: '4px'
}));

// Banners de colores para los planes
export const PlanBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bannerColor',
})(({ theme, bannerColor }) => ({
  backgroundColor: bannerColor || '#b08d7b',
  color: '#fff',
  padding: theme.spacing(1.5), // Reducido para hacerla más compacta
  textAlign: 'center',
  margin: theme.spacing(1.5), // Reducido
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderRadius: '2px'
}));

// Sobrescribimos estilos de PlanCard para que coincidan con el nuevo diseño
export const StyledPlanCard = styled(Box)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(1), // Bordes un poco más redondeados
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Sombra más suave
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Asegura que todas las tarjetas midan lo mismo en grid
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  }
}));

export const StyledPlanTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.3rem', // Ligeramente más pequeño
  fontWeight: 700,
  fontFamily: 'serif',
  letterSpacing: '1px'
}));

export const StyledPlanSubtitle = styled(Box)(({ theme }) => ({
  fontSize: '1rem', // Ligeramente más pequeño
  fontWeight: 700,
  color: '#555',
  textAlign: 'center',
  marginBottom: theme.spacing(1.5),
  fontFamily: 'serif'
}));

export const StyledPlanRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2), // Padding reducido para compactar
}));

export const StyledPlanLabel = styled(Box)(({ theme }) => ({
  fontSize: '0.85rem', // Letra más pequeña y elegante
  color: '#444'
}));

export const StyledPlanValue = styled(Box)(({ theme }) => ({
  fontSize: '0.85rem', // Letra más pequeña y elegante
  color: '#111'
}));

export const StyledPlanDivider = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1.5, 0), // Margen reducido
  borderTop: '1px solid #eef2f8', // Línea más sutil
  width: '100%'
}));

export const StyledTotalValue = styled(Box)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 700,
  color: '#111'
}));

export const StyledBuyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4a4e69',
  color: '#fff',
  padding: theme.spacing(1, 4),
  fontWeight: 600,
  borderRadius: '4px', // Botón un poco más redondeado
  textTransform: 'none', // Quita el uppercase forzado para verse más moderno
  letterSpacing: '0.5px',
  '&:hover': {
    backgroundColor: '#3a3e59'
  }
}));
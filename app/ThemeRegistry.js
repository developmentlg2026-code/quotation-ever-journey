'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Azul brillante (Progreso y detalles): #218be7
// Morado vibrante (Botones "Comprar"): #5216f4
// Azul medio (Pie de página): #477cc4
// Azul marino oscuro (Texto del título): #1b1b3a
// Gris oscuro (Texto descriptivo): #6f6f6f
// Blanco/Gris muy claro (Fondo de tarjetas): #f8f9fa

// Define el tema con los colores estándar y los de tu aplicación
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#218be7', // Azul oscuro/grisáceo usado en botones y títulos
    },
    secondary: {
      main: '#5216f4', // Marrón/dorado usado en botones y acentos
    },
    error: {
      main: '#d32f2f', // Rojo usado para errores o botones de eliminar
    },
    warning: {
      main: '#ffa726', // Naranja estándar para advertencias
    },
    success: {
      main: '#4caf50', // Verde para mensajes de éxito
    },
    background: {
      default: '#fff',
      paper: '#f8f9fa', // Un gris muy claro usado en fondos de sección
    },
    text: {
      primary: '#218be7',
      secondary: '#666',
    }
  },
  typography: {
    fontFamily: geistSans.style.fontFamily,
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos y aplica el color de fondo */}
      <CssBaseline />
      
      {/* Contenedor principal con márgenes responsivos */}
      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth: '1200px', // Evita que se estire demasiado en monitores grandes
          margin: '0 auto', // Centra el contenido en escritorio
          // px: Padding en el eje X. xs=móvil, sm=tablet, md/lg=escritorio
          px: { xs: 2, sm: 4, md: 6, lg: 8 }, 
          // py: Padding en el eje Y.
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
}
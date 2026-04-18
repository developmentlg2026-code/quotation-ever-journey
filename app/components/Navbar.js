'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, Box } from '@mui/material';

export default function Navbar() {
  // Estado para controlar el idioma. 
  // false = Español (por defecto), true = Portugués
  const [isPortuguese, setIsPortuguese] = useState(false);

  const handleLanguageChange = (event) => {
    setIsPortuguese(event.target.checked);
    // Aquí podrías agregar la lógica para cambiar el idioma globalmente 
    // usando algún contexto (ej. i18n, next-intl, etc.)
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 4 }}>
      <Toolbar sx={{ position: 'relative' }}>
        
        {/* Logo (Izquierda en móvil, Centrado en pantallas más grandes) */}
        <Box sx={{
          position: { xs: 'static', sm: 'absolute' },
          left: { xs: 'auto', sm: '50%' },
          top: { xs: 'auto', sm: '50%' },
          transform: { xs: 'none', sm: 'translate(-50%, -50%)' },
        }}>
          <Box 
            component="img"
            src="/static/banner/ever-journey-banner2.png"
            alt="Ever Journey"
            sx={{ height: 50, objectFit: 'contain' }} // Ajusta el alto según prefieras
          />
        </Box>

        {/* Switch de Idiomas a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 'auto' }}>
          <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>🇪🇸</Typography>
          
          <Switch
            checked={isPortuguese}
            onChange={handleLanguageChange}
            color="primary"
            inputProps={{ 'aria-label': 'Cambiar idioma' }}
          />
          
          <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>🇵🇹</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
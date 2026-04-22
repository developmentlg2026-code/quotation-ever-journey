'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Switch, Box, FormControlLabel } from '@mui/material';

export default function Navbar() {
  // Estado para controlar el idioma. 
  // false = Español (por defecto), true = Portugués
  const [isPortuguese, setIsPortuguese] = useState(false);
  const [altVideos, setAltVideos] = useState(false);

  const pathname = usePathname();

  // Sincronizar estado inicial desde localStorage
  useEffect(() => {
    setAltVideos(localStorage.getItem('altVideos') === 'true');
  }, []);

  // Disparar evento para que la página de viajeros se entere del cambio
  const handleAltVideosChange = (event) => {
    const isChecked = event.target.checked;
    setAltVideos(isChecked);
    localStorage.setItem('altVideos', isChecked);
    window.dispatchEvent(new CustomEvent('toggleAltVideos', { detail: isChecked }));
  };

  const handleLanguageChange = (event) => {
    setIsPortuguese(event.target.checked);
    // Aquí podrías agregar la lógica para cambiar el idioma globalmente 
    // usando algún contexto (ej. i18n, next-intl, etc.)
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 4 }}>
      <Toolbar sx={{ position: 'relative' }}>
        
        {/* Logo (Izquierda en móvil, Centrado en pantallas más grandes) */}
        {/* {pathname !== '/cotizador/viajero' && (
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
        )} */}

        {/* Switch de Idiomas a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 'auto' }}>
          
          {/* Switch para cambiar los videos, solo visible en la página correspondiente */}
          {pathname === '/cotizador/viajero' && (
            <FormControlLabel
              control={
                <Switch
                  checked={altVideos}
                  onChange={handleAltVideosChange}
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>Cambiar Vista</Typography>}
              sx={{ mr: 2 }}
            />
          )}

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
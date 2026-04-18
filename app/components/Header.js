// components/Header.js
"use client";

import React from 'react';
import { Box } from '@mui/material';
import * as S from '../Home.styles';

export default function Header({ onLogoClick }) {
  return (
    <S.HeaderContainer>
      {/* Contenedor clickeable centrado */}
      <Box 
        onClick={onLogoClick} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          '&:hover': { transform: 'scale(1.02)' }
        }}
      >
        {/* Imagen del logo más grande */}
        <Box 
          component="img"
          src="/static/logo/logo_az_capital.png"
          alt="Logo AZ Capital 100, C.A."
          sx={{ 
            height: { xs: '75px', sm: '90px' }, // 75px en móviles, 90px en web
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </Box>
    </S.HeaderContainer>
  );
}
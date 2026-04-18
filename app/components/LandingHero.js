// components/LandingHero.js
"use client";

import React from 'react';
import { Box } from '@mui/material';
import * as S from '../Home.styles';

const LandingHero = () => {
  return (
    <S.HeroSection>
      <S.HeroOverlay />
      <S.HeroContent>
        <S.HeroTitle>INVERSIONES FAMILIARES</S.HeroTitle>
        <S.HeroSubtitle>FUTURO EN DÓLARES</S.HeroSubtitle>
        <S.HeroCaption>ASEGURA TU MAÑANA, HOY.</S.HeroCaption>
      </S.HeroContent>
    </S.HeroSection>
  );
};

export default LandingHero;
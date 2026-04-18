// components/PlansDisplay.js
"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as S from '../Home.styles';

const PlanCard = ({ years, color, isSelected, onClick, onBuy }) => {
  const planData = {
    sumaAsegurada: '5.000,00',
    primaMensualVida: '3,69',
    primaAnualVida: '44,27',
    cuotaAhorro: '10.000,00',
    rentaMensual: '54.884,13',
    primaAcumulada: '4.739.025.67',
    aporteAnual: '120.000.00',
    igtf: '300.11',
    totalPagar: '120.000.00'
  };

  return (
    <S.StyledPlanCard 
      onClick={onClick}
      sx={{ 
        cursor: 'pointer',
        border: isSelected ? `2px solid ${color}` : '1px solid #e0e0e0',
        transform: isSelected ? 'scale(1.02)' : 'none',
        boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <S.PlanBanner bannerColor={color}>
        <S.StyledPlanTitle>INVEST {years} AÑOS</S.StyledPlanTitle>
      </S.PlanBanner>
      
      <Box sx={{ pb: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <S.StyledPlanSubtitle>Resumen de propuesta de vida</S.StyledPlanSubtitle>
          
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Suma Asegurada Vida:</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.sumaAsegurada} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Prima Mensual Vida</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.primaMensualVida} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel sx={{ fontWeight: 700 }}>Prima Anual Vida</S.StyledPlanLabel>
            <S.StyledPlanValue sx={{ fontWeight: 700 }}>{planData.primaAnualVida} $</S.StyledPlanValue>
          </S.StyledPlanRow>

          <S.StyledPlanDivider />

          <S.StyledPlanSubtitle>Prima de Ahorro</S.StyledPlanSubtitle>
          
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Cuota Ahorro Mensual</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.cuotaAhorro} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Renta Mensual</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.rentaMensual} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Prima Acumulada</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.primaAcumulada} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel sx={{ fontWeight: 700 }}>Aporte Anual Cliente</S.StyledPlanLabel>
            <S.StyledPlanValue sx={{ fontWeight: 700 }}>{planData.aporteAnual} $</S.StyledPlanValue>
          </S.StyledPlanRow>

          <S.StyledPlanDivider />

          <S.StyledPlanSubtitle>A Pagar</S.StyledPlanSubtitle>
          
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Prima Mensual Vida</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.primaMensualVida} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel>Prima Mensual Ahorro</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.cuotaAhorro} $</S.StyledPlanValue>
          </S.StyledPlanRow>
          <S.StyledPlanRow>
            <S.StyledPlanLabel>IGTF</S.StyledPlanLabel>
            <S.StyledPlanValue>{planData.igtf} $</S.StyledPlanValue>
          </S.StyledPlanRow>

          <S.StyledPlanRow sx={{ mt: 2 }}>
            <S.StyledTotalValue>Total a Pagar:</S.StyledTotalValue>
            <Box sx={{ borderTop: '1px solid #000', pt: 0.5 }}>
              <S.StyledTotalValue>{planData.totalPagar} $</S.StyledTotalValue>
            </Box>
          </S.StyledPlanRow>
        </Box>

        {isSelected && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <S.StyledBuyButton 
              onClick={(e) => {
                e.stopPropagation(); // Evita que el clic seleccione la tarjeta de nuevo
                onBuy(years);
              }}
            >
              COMPRAR
            </S.StyledBuyButton>
          </Box>
        )}
      </Box>
    </S.StyledPlanCard>
  );
};

const PlansDisplay = ({ onBuy }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <S.ContentContainer sx={{ pt: 0, maxWidth: '1000px !important' }}>
      <Typography variant="h6" align="center" sx={{ color: '#00204a', fontFamily: 'serif', fontWeight: 700, mt: 4, mb: 4 }}>
        PLANES QUE TE OFRECEMOS
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gap: 3, 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        mb: 6
      }}>
        <PlanCard 
          years={15} 
          color="#b39582" 
          isSelected={selectedPlan === 15}
          onClick={() => setSelectedPlan(15)}
          onBuy={onBuy}
        />
        <PlanCard 
          years={20} 
          color="#c4c4c4" 
          isSelected={selectedPlan === 20}
          onClick={() => setSelectedPlan(20)}
          onBuy={onBuy}
        />
        <PlanCard 
          years={25} 
          color="#d4b830" 
          isSelected={selectedPlan === 25}
          onClick={() => setSelectedPlan(25)}
          onBuy={onBuy}
        />
      </Box>
    </S.ContentContainer>
  );
};

export default PlansDisplay;
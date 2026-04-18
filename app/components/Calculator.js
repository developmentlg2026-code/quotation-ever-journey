"use client";

import React, { useState } from 'react';
import { 
  Box, Typography, Radio, RadioGroup, FormControlLabel, 
  TextField, Select, MenuItem, Stepper, Step, StepLabel, InputAdornment, Divider, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as S from '../Home.styles';

const Calculator = ({ onBack }) => {
  const [sumaAsegurada, setSumaAsegurada] = useState(5000);
  const [selectedOption, setSelectedOption] = useState('flexible');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <S.CalculatorContainer>
        {/* Stepper Superior */}
        <S.StepperWrapper>
            <Stepper activeStep={0} alternativeLabel sx={{ maxWidth: 400, margin: '0 auto' }}>
            <Step>
                <StepLabel StepIconProps={{ sx: { color: '#3b82f6 !important' } }}>Cotizar</StepLabel>
            </Step>
            <Step>
                <StepLabel>Emitir</StepLabel>
            </Step>
            <Step>
                <StepLabel>Pagar</StepLabel>
            </Step>
            </Stepper>
        </S.StepperWrapper>

        {/* Botón Volver */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={onBack} 
          sx={{ 
            color: '#4a4e69', 
            mb: 2, 
            textTransform: 'none', 
            alignSelf: 'flex-start',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
          }}
        >
          Volver
        </Button>

        <S.SectionTitle2>CALCULADORA INVEST</S.SectionTitle2>
        
        <Typography variant="body2" sx={{ color: '#888', mb: 3, fontSize: '0.9rem', textAlign: 'center', px: 2 }}>
          Ingresa los valores que mejor se adapten a tu necesidad y el simulador te mostrará 
          los mejores planes de inversión para ti y tu familia
        </Typography>

        <Divider sx={{ mb: 3, borderColor: '#e0e0e0' }} />

        {/* Suma Asegurada Vida */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontWeight: 600, color: '#445566', fontSize: '1rem', maxWidth: '50%' }}>
            Selecciona Suma Asegurada Vida:
          </Typography>
          <Select
            value={sumaAsegurada}
            onChange={(e) => setSumaAsegurada(e.target.value)}
            variant="standard"
            sx={{ 
              fontSize: '1.1rem', 
              color: '#333',
              minWidth: '120px',
              '&:before': { borderBottomColor: '#ccc' }
            }}
          >
            <MenuItem value={5000}>5.000,00 $</MenuItem>
            <MenuItem value={10000}>10.000,00 $</MenuItem>
            <MenuItem value={20000}>20.000,00 $</MenuItem>
          </Select>
        </Box>

        {/* Opciones de cálculo */}
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {/* Opción 1: Prima Flexible */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <FormControlLabel 
              value="flexible" 
              control={<Radio sx={{ color: '#d32f2f', '&.Mui-checked': { color: '#d32f2f' } }} />} 
              label={<Typography sx={{ color: '#555', fontSize: '0.95rem' }}>Prima flexible</Typography>}
            />
            <TextField
              size="small"
              defaultValue="10.000"
              disabled={selectedOption !== 'flexible'}
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                sx: { bgcolor: selectedOption === 'flexible' ? '#fff' : '#f5f5f5', width: '120px' }
              }}
            />
          </Box>

          {/* Opción 2: Renta Mensual */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <FormControlLabel 
              value="renta" 
              control={<Radio sx={{ color: '#888', '&.Mui-checked': { color: '#d32f2f' } }} />} 
              label={<Typography sx={{ color: '#555', fontSize: '0.95rem' }}>Renta Mensual</Typography>}
            />
            <TextField
              size="small"
              defaultValue="0.00"
              disabled={selectedOption !== 'renta'}
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                sx: { bgcolor: selectedOption === 'renta' ? '#fff' : '#f5f5f5', width: '120px' }
              }}
            />
          </Box>

          {/* Opción 3: Retorno único */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <FormControlLabel 
              value="retorno" 
              control={<Radio sx={{ color: '#888', '&.Mui-checked': { color: '#d32f2f' } }} />} 
              label={<Typography sx={{ color: '#555', fontSize: '0.95rem' }}>Retorno único</Typography>}
            />
            <TextField
              size="small"
              defaultValue="0.00"
              disabled={selectedOption !== 'retorno'}
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
                sx: { bgcolor: selectedOption === 'retorno' ? '#fff' : '#f5f5f5', width: '120px' }
              }}
            />
          </Box>
        </RadioGroup>

        {/* Caja de Información */}
        <S.InfoBox>
          <Typography sx={{ fontWeight: 700, color: '#445566', mb: 1, fontSize: '0.95rem' }}>
            Prima Flexible
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Define el monto fijo que deseas destinar cada mes según tu capacidad de ahorro 
            y tus metas financieras. Al cotizar, verás la proyección del valor efectivo para 
            cada uno de los plazos disponibles.
          </Typography>
        </S.InfoBox>

      </S.CalculatorContainer>
    </Box>
  );
};

export default Calculator;
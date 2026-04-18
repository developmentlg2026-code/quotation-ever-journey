// components/Step4Content.js
"use client";

import React from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, TextField, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as S from '../Home.styles';

const Step4Content = ({ onBack, selectedPlan }) => {
  return (
    <S.Step2Container>
      <S.ContentContainer sx={{ mt: 3 }}>
        
        {/* Stepper Superior - Avanzado al paso "Emitir" */}
        <S.StepperWrapper>
          <Stepper activeStep={1} alternativeLabel sx={{ maxWidth: 400, margin: '0 auto' }}>
            <Step>
              <StepLabel StepIconProps={{ sx: { color: '#4caf50 !important' } }}>Cotizar</StepLabel>
            </Step>
            <Step>
              <StepLabel StepIconProps={{ sx: { color: '#3b82f6 !important' } }}>Emitir</StepLabel>
            </Step>
            <Step>
              <StepLabel>Pagar</StepLabel>
            </Step>
          </Stepper>
        </S.StepperWrapper>

        {/* Botón Volver en la misma ubicación estándar */}
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

        <S.VerificationTitle>Emisión de Póliza</S.VerificationTitle>
        <Typography variant="body2" align="center" sx={{ color: '#666', mb: 4 }}>
          Has seleccionado el plan <strong>INVEST {selectedPlan} AÑOS</strong>. Por favor, completa los datos adicionales para la emisión.
        </Typography>

        {/* Formulario de Datos de Contacto */}
        <S.ResultPaper>
          <Typography variant="h6" sx={{ color: '#00204a', fontFamily: 'serif', fontWeight: 700, mb: 2 }}>
            Datos de Contacto y Residencia
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <S.FormFieldsContainer>
            <S.FormRow>
              <TextField label="Teléfono Celular" variant="outlined" size="small" fullWidth placeholder="+58 414 1234567" />
              <TextField label="Teléfono de Habitación" variant="outlined" size="small" fullWidth placeholder="+58 212 1234567" />
            </S.FormRow>
            <TextField label="Correo Electrónico" variant="outlined" size="small" fullWidth type="email" placeholder="ejemplo@correo.com" />
            
            <Typography variant="subtitle2" sx={{ color: '#445566', mt: 2, mb: 1, fontWeight: 600 }}>
              Dirección de Residencia
            </Typography>
            <S.FormRow>
              <TextField label="Estado" variant="outlined" size="small" fullWidth />
              <TextField label="Ciudad" variant="outlined" size="small" fullWidth />
            </S.FormRow>
            <TextField label="Dirección Exacta (Avenida, Calle, Edificio, Casa)" variant="outlined" size="small" fullWidth multiline rows={2} />
          </S.FormFieldsContainer>
        </S.ResultPaper>

        {/* Formulario de Beneficiarios */}
        <S.ResultPaper>
          <Typography variant="h6" sx={{ color: '#00204a', fontFamily: 'serif', fontWeight: 700, mb: 2 }}>
            Beneficiario Principal
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            Ingresa los datos de la persona que designarás como beneficiario.
          </Typography>

          <S.FormFieldsContainer>
            <S.FormRow>
              <TextField label="Nombres" variant="outlined" size="small" fullWidth />
              <TextField label="Apellidos" variant="outlined" size="small" fullWidth />
            </S.FormRow>
            <S.FormRow>
              <TextField label="Cédula de Identidad" variant="outlined" size="small" fullWidth />
              <TextField label="Parentesco" variant="outlined" size="small" fullWidth />
            </S.FormRow>
            <TextField label="Porcentaje asignado (%)" variant="outlined" size="small" fullWidth type="number" defaultValue={100} />
          </S.FormFieldsContainer>
        </S.ResultPaper>

        {/* Botón Final */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 6 }}>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#4a4e69', 
              color: '#fff', 
              px: 6, 
              py: 1.5, 
              fontWeight: 600, 
              fontSize: '1rem',
              '&:hover': { bgcolor: '#3a3e59' } 
            }}
            onClick={() => alert('Avanzando a la pasarela de pago...')}
          >
            CONTINUAR AL PAGO
          </Button>
        </Box>

      </S.ContentContainer>
    </S.Step2Container>
  );
};

export default Step4Content;
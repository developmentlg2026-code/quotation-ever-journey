// components/ExtractedDataDisplay.js
"use client";

import React from 'react';
import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import * as S from '../Home.styles';

const ExtractedDataDisplay = ({ extractedData, onNewPhoto, onConfirm, onBack }) => {
  return (
    <S.ExtractedDataContainer>
      {/* Header con opción de nueva foto */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleOutlineIcon sx={{ color: '#4caf50', mr: 1 }} />
          <Typography variant="subtitle2" sx={{ color: '#4caf50', fontWeight: 500 }}>
            Datos extraídos correctamente
          </Typography>
        </Box>
        
        <Button 
          size="small"
          startIcon={<ReplayIcon />}
          onClick={onNewPhoto}
          sx={{ 
            color: '#8b7355',
            textTransform: 'none',
            fontSize: '0.8rem',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
          }}
        >
          Cambiar foto
        </Button>
      </Box>

      {/* Título */}
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: '#333', fontSize: '1rem' }}>
        Necesitamos que completes la siguiente información
      </Typography>

      {/* Documento info */}
      <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
        Documento: Cédula de Identidad
      </Typography>

      {/* Formulario más compacto */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {/* Tipo de Identificación */}
        <Box>
          <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
            Tipo de Identificación *
          </Typography>
          <TextField
            fullWidth
            size="small"
            value="Venezolano"
            InputProps={{
              readOnly: true,
              sx: { 
                bgcolor: '#f5f5f5',
                fontSize: '0.875rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0'
                }
              }
            }}
          />
        </Box>

        {/* No. Identificación */}
        <Box>
          <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
            No. Identificación *
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={extractedData?.cedula || '35.532.180'}
            InputProps={{
              readOnly: true,
              sx: { 
                bgcolor: '#f5f5f5',
                fontSize: '0.875rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0'
                }
              }
            }}
          />
        </Box>

        {/* Nombres y Apellidos en fila */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
              Nombres: *
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={extractedData?.nombres || 'BAYOLETH'}
              InputProps={{
                readOnly: true,
                sx: { 
                  bgcolor: '#f5f5f5',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0'
                  }
                }
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
              Apellidos: *
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={extractedData?.apellidos || 'MALVACEA GATTUSO'}
              InputProps={{
                readOnly: true,
                sx: { 
                  bgcolor: '#f5f5f5',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0'
                  }
                }
              }}
            />
          </Box>
        </Box>

        {/* Fechas en fila */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
              Fecha de Nacimiento *
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={extractedData?.fechaNacimiento || '22/10/2020'}
              InputProps={{
                readOnly: true,
                sx: { 
                  bgcolor: '#f5f5f5',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0'
                  }
                }
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
              Fecha de Vencimiento *
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={extractedData?.fechaVencimiento || '31/01/2034'}
              InputProps={{
                readOnly: true,
                sx: { 
                  bgcolor: '#f5f5f5',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0'
                  }
                }
              }}
            />
          </Box>
        </Box>

        {/* Teléfono y Email en fila */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
              Nro de Teléfono
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="+58 XXX-XXXXXXX"
              sx={{
                fontSize: '0.875rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0'
                }
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ color: '#333', mb: 0.25, display: 'block', fontWeight: 500 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="ejemplo@correo.com"
              type="email"
              sx={{
                fontSize: '0.875rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0'
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Botones de navegación */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={onBack}
          sx={{ 
            color: '#4a4e69',
            textTransform: 'none',
            fontSize: '0.875rem',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
          }}
        >
          Regresar
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{ 
            bgcolor: '#4a4e69',
            color: '#fff',
            px: 3,
            py: 0.75,
            textTransform: 'none',
            fontSize: '0.875rem',
            '&:hover': { bgcolor: '#3a3e59' }
          }}
        >
          SIGUIENTE
        </Button>
      </Box>
    </S.ExtractedDataContainer>
  );
};

export default ExtractedDataDisplay;
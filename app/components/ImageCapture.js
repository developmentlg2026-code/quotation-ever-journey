// components/ImageCapture.js
"use client";

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import * as S from '../Home.styles';

const ImageCapture = forwardRef(({ 
  imagePreview, 
  onImageCapture, 
  onReset,
  isProcessing,
  errorMsg,
  extractedData,
  children
}, ref) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openFileSelector: () => fileInputRef.current.click(),
    openCamera: () => cameraInputRef.current.click(),
    resetInputs: () => {
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  }));

  return (
    <>
      {/* Inputs ocultos */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={onImageCapture} 
        style={{ display: 'none' }} 
      />
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={cameraInputRef} 
        onChange={onImageCapture} 
        style={{ display: 'none' }} 
      />

      {/* Área de imagen */}
      <S.ImageAreaContainer hasImage={!!imagePreview}>
        {imagePreview ? (
          <S.StyledPreviewImage src={imagePreview} alt="Documento" />
        ) : (
          <S.UploadPlaceholder>
            <BadgeIcon sx={{ fontSize: 64, mb: 1, opacity: 0.8 }} />
            <Typography variant="subtitle1" fontWeight="600" color="#445566">
              Cédula Frontal
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 1, px: 2, opacity: 0.8 }}>
              El documento debe estar bien iluminado y sin recortes en los bordes.
            </Typography>
          </S.UploadPlaceholder>
        )}
      </S.ImageAreaContainer>

      {/* Botones según el estado */}
      {!imagePreview && (
        <S.ButtonGroup>
          <Button 
            variant="outlined" 
            startIcon={<UploadFileIcon />} 
            onClick={() => fileInputRef.current.click()}
            sx={{ 
              flex: 1, 
              borderColor: '#8b7355', 
              color: '#8b7355', 
              '&:hover': { borderColor: '#6b573f', bgcolor: 'rgba(139, 115, 85, 0.04)' } 
            }}
          >
            Galería
          </Button>
          <Button 
            variant="contained" 
            startIcon={<PhotoCameraIcon />} 
            onClick={() => cameraInputRef.current.click()}
            sx={{ 
              flex: 1, 
              bgcolor: '#8b7355', 
              '&:hover': { bgcolor: '#6b573f' } 
            }}
          >
            Cámara
          </Button>
        </S.ButtonGroup>
      )}

      {imagePreview && !extractedData && !isProcessing && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <S.ButtonGroup sx={{ mb: 0 }}>
            <Button 
              variant="outlined" 
              startIcon={<ReplayIcon />}
              onClick={() => fileInputRef.current.click()} 
              sx={{ 
                flex: 1, 
                borderColor: '#8b7355', 
                color: '#8b7355', 
                '&:hover': { borderColor: '#6b573f', bgcolor: 'rgba(139, 115, 85, 0.04)' } 
              }}
            >
              Cambiar foto
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<PhotoCameraIcon />}
              onClick={() => cameraInputRef.current.click()}
              sx={{ 
                flex: 1, 
                borderColor: '#8b7355', 
                color: '#8b7355', 
                '&:hover': { borderColor: '#6b573f', bgcolor: 'rgba(139, 115, 85, 0.04)' } 
              }}
            >
              Tomar foto
            </Button>
          </S.ButtonGroup>
          
          <S.ButtonGroup>
            <Button 
              variant="outlined" 
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onReset}
              sx={{ 
                flex: 1, 
                borderColor: '#d32f2f', 
                color: '#d32f2f', 
                '&:hover': { borderColor: '#b71c1c', bgcolor: 'rgba(211, 47, 47, 0.04)' } 
              }}
            >
              Quitar
            </Button>
            
            <Button 
              variant="contained" 
              onClick={children.props.onExtract}
              sx={{ 
                flex: 2, 
                bgcolor: '#00204a', 
                '&:hover': { bgcolor: '#001533' } 
              }}
            >
              Extraer Datos
            </Button>
          </S.ButtonGroup>
          
          {errorMsg && (
            <Typography color="error" variant="body2" align="center">
              {errorMsg}
            </Typography>
          )}
        </Box>
      )}

      {isProcessing && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, my: 4 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary">
            Procesando imagen...
          </Typography>
        </Box>
      )}
    </>
  );
});

ImageCapture.displayName = 'ImageCapture';

export default ImageCapture;
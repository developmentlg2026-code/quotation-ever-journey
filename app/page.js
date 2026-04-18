"use client";

import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Stepper, 
  Step, 
  StepLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Importamos los estilos
import * as S from './Home.styles';

// Importamos componentes
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import AccordionSection from './components/AccordionSection';
import ImageCapture from './components/ImageCapture';
import ExtractedDataDisplay from './components/ExtractedDataDisplay';
import Step3Content from './components/Step3Content';
import Step4Content from './components/Step4Content'; // NUEVO COMPONENTE

export default function Home() {
  const [step, setStep] = useState(1);
  const [expanded, setExpanded] = useState('panel1');

  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  
  // NUEVO ESTADO: Guarda el plan que el usuario decidió comprar
  const [selectedPlan, setSelectedPlan] = useState(null);

  const imageCaptureRef = useRef(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setExtractedData(null);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!imagePreview) return;
    
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/extract-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: imagePreview })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setExtractedData(result.data);
         setIsProcessing(false);
      } else {
        setErrorMsg(result.error || 'No se pudieron extraer los datos.');
      }
      
    } catch (error) {
      setErrorMsg('Error de conexión con el servidor.');
      setIsProcessing(false);
    }
  };

  const resetImageSelection = () => {
    setImagePreview(null);
    setExtractedData(null);
    setErrorMsg('');
    setSelectedFileName('');
    
    if (imageCaptureRef.current) {
      imageCaptureRef.current.resetInputs();
    }
  };

  const handleLogoClick = () => {
    setStep(1);
    resetImageSelection();
  };

  const handleBack = () => {
    setStep(1);
    resetImageSelection();
  };

  const handleConfirmData = () => {
    setStep(3);
  };

  // NUEVA FUNCIÓN: Maneja el clic en "COMPRAR"
  const handleBuyPlan = (planYears) => {
    setSelectedPlan(planYears);
    setStep(4);
  };

  return (
    <S.MainContainer>
      <Header onLogoClick={handleLogoClick} />

      {/* PASO 1: Landing Page */}
      {step === 1 && (
        <>
          <LandingHero />
          
          <S.ContentContainer>
            <S.SectionTitle>TU POLIZA INVEST</S.SectionTitle>

            <Typography variant="body2" sx={{ mb: 2, color: '#333', lineHeight: 1.6 }}>
              Tu familia es tu prioridad hoy, pero asegurar su bienestar mañana requiere una estrategia inteligente. 
              El ahorro tradicional pierde valor con el tiempo, <strong>pero una póliza de inversión en divisas crece contigo.</strong>
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 4, color: '#333', lineHeight: 1.6 }}>
              Le presentamos nuestra Estrategia de Inversión Familiar en Divisas, diseñada para personas que buscan:
            </Typography>

            <AccordionSection 
              expanded={expanded} 
              onChange={handleAccordionChange} 
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 4 }}>
              <Button 
                onClick={() => setStep(2)} 
                variant="contained" 
                sx={{ 
                  bgcolor: '#4a4e69', 
                  color: '#fff', 
                  px: { xs: 3, sm: 4 }, 
                  py: 1.5, 
                  borderRadius: 0, 
                  fontWeight: 600, 
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': { bgcolor: '#3a3e59' } 
                }}
              >
                SIGUIENTE
              </Button>
            </Box>
          </S.ContentContainer>
        </>
      )}

      {/* PASO 2: Captura y Extracción de Cédula */}
      {step === 2 && (
        <S.Step2Container>
          <S.ContentContainer sx={{ mt: 3 }}>
            <S.StepperWrapper>
              <Stepper activeStep={0} alternativeLabel sx={{ maxWidth: 400, margin: '0 auto' }}>
                <Step><StepLabel StepIconProps={{ sx: { color: '#3b82f6 !important' } }}>Cotizar</StepLabel></Step>
                <Step><StepLabel>Emitir</StepLabel></Step>
                <Step><StepLabel>Pagar</StepLabel></Step>
              </Stepper>
            </S.StepperWrapper>
            
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={handleBack} 
              sx={{ color: '#4a4e69', mb: 2, textTransform: 'none', alignSelf: 'flex-start', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
            >
              Volver
            </Button>

            <S.VerificationTitle>Verificación de Identidad</S.VerificationTitle>
            <Typography variant="body2" align="center" sx={{ color: '#666', mb: 3 }}>
              Asegúrate de que la imagen sea nítida y legible para una extracción exitosa.
            </Typography>

            <ImageCapture
              ref={imageCaptureRef}
              imagePreview={imagePreview}
              onImageCapture={handleImageCapture}
              onReset={resetImageSelection}
              isProcessing={isProcessing}
              errorMsg={errorMsg}
              extractedData={extractedData}
            >
              {React.Children.only(<Box sx={{ display: 'none' }} onExtract={processImage} />)}
            </ImageCapture>

            {selectedFileName && !extractedData && !isProcessing && (
              <Typography variant="caption" sx={{ textAlign: 'center', color: '#666', mb: 1, display: 'block' }}>
                Archivo: {selectedFileName}
              </Typography>
            )}

            {extractedData && (
              <ExtractedDataDisplay 
                extractedData={extractedData}
                onNewPhoto={resetImageSelection}
                onBack={handleBack}
                onConfirm={handleConfirmData}
              />
            )}
          </S.ContentContainer>
        </S.Step2Container>
      )}

      {/* PASO 3: Calculadora y Planes */}
      {step === 3 && (
        <Step3Content onBuy={handleBuyPlan} onBack={() => setStep(2)} />
      )}

      {/* PASO 4: Emisión / Formulario Final */}
      {step === 4 && (
        <Step4Content 
          selectedPlan={selectedPlan} 
          onBack={() => setStep(3)} 
        />
      )}
    </S.MainContainer>
  );
}
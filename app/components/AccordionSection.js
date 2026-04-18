// components/AccordionSection.js
"use client";

import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as S from '../Home.styles';

const AccordionSection = ({ expanded, onChange }) => {
  const accordionItems = [
    {
      id: 'panel1',
      header: 'Protección en moneda Sólida',
      detail: 'El ahorro tradicional pierde valor con el tiempo por tal motivo blindas tu patrimonio frente a la inflación.'
    },
    {
      id: 'panel2',
      header: 'Rendimientos garantizados',
      detail: 'Obtén rendimientos fijos y seguros para el crecimiento de tu capital a largo plazo.'
    },
    {
      id: 'panel3',
      header: 'Legado seguro',
      detail: 'Garantiza el futuro financiero de tus seres queridos con una estructura de sucesión clara.'
    },
    {
      id: 'panel4',
      header: 'Flexibilidad de rescate',
      detail: 'Accede a tus fondos cuando más lo necesites bajo condiciones flexibles y transparentes.'
    }
  ];

  return (
    <S.AccordionContainer>
      {accordionItems.map((item) => (
        <Accordion 
          key={item.id}
          expanded={expanded === item.id} 
          onChange={onChange(item.id)} 
          disableGutters 
          elevation={0} 
          sx={{ bgcolor: '#eef2f5', mb: 1, '&:before': { display: 'none' } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 48, '& .MuiAccordionSummary-content': { my: 1 } }}>
            <S.AccordionHeaderText>{item.header}</S.AccordionHeaderText>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#f8f9fa', border: '1px solid #eef2f5', p: 2 }}>
            <S.AccordionDetailText>
              {item.detail}
            </S.AccordionDetailText>
          </AccordionDetails>
        </Accordion>
      ))}
    </S.AccordionContainer>
  );
};

export default AccordionSection;
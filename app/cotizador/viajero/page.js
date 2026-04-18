import { Typography } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{color: 'primary.main'}}>
        Cotizador Viajero
      </Typography>
      <Typography variant="body1">
        Aquí puedes cotizar tu viaje de manera rápida y sencilla. Ingresa los detalles de tu destino, fechas y preferencias para obtener las mejores opciones de viaje.
      </Typography>
    </div>
  )
}

export default page
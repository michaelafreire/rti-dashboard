import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { ElementType } from 'react'
import { useState } from 'react'

type IconTextProps = {
  icon: ElementType
  number?: number
  title?: string
  description?: string
}

export default function IconText(props: IconTextProps) {
  const Icon = props.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'transparent',
        boxShadow: 'none',
        transition: 'transform 0.2s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <CardContent sx={{ padding: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            bgcolor: 'rgba(218, 32, 104, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            transition: 'bgcolor 0.2s ease',
          }}
        >
          <Icon sx={{ fontSize: 28, color: 'text.secondary' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.secondary', lineHeight: 1, mb: 0.5 }}>
            {props.number}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {props.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { ElementType } from 'react'

type IconTextProps = {
  icon: ElementType
  number?: number
  title?: string
  description1?: string
  description2?: string
}

export default function IconText(props: IconTextProps) {
  const Icon = props.icon

  return (
    <Card sx={{ width: '100%', height: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
      <CardContent>
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: 'primary.light',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 3,
            marginBottom: 2,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Icon sx={{ fontSize: 40, color: 'white' }} />
        </Box>
        <Typography variant="h5" component="div">
          {props.number}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{props.title}</Typography>
        <Typography variant="body2">
          {props.description1}
          <br />
          {props.description2}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

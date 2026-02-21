import Box from "@mui/material/Box"

function MetricComponent() {
  return (
    <Box sx={{
        bgcolor: 'primary.main',
        color: 'text.primary',
        borderRadius: 3,
        p: 2,
        minHeight: 'calc(100vh - 20px)',
        width: '200px',
        boxShadow: 3,
    }}>
    </Box>
  )
}

export default MetricComponent

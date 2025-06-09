import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Button,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  CANVAS_W,
  CANVAS_H,
  LOGO_OFFSET_Y,
  CUSTOM_BG_MAIN,
} from './previewConfig'
import { drawOnePiece } from './OnePiecePreview.jsx'

const VARIANTS = {
  onepiece: [
    { label: 'Char1', value: 'char1' },
    { label: 'Char2', value: 'char2' },
    { label: 'Char3', value: 'char3' },
    { label: 'Char4', value: 'char4' },
    { label: 'Char5', value: 'char5' },
    { label: 'Char6', value: 'char6' },
    { label: 'Char7', value: 'char7' },
    { label: 'Char8', value: 'char8' },
    { label: 'Char9', value: 'char9' },
    { label: 'Char10', value: 'char10' },
    { label: 'Char11', value: 'char11' },
    { label: 'Char12', value: 'char12' },
    { label: 'Char13', value: 'char13' },
    { label: 'Char14', value: 'char14' },
    { label: 'Char15', value: 'char15' },
    { label: 'Char16', value: 'char16' },
    { label: 'Char17', value: 'char17' },
    { label: 'Char18', value: 'char18' },
  ],
}

const PRODUCT_PAGE_URL = 'https://www.weletyoucook.com/product-page/anime-custom-desksign'

export default function App() {
  const [text, setText] = useState('preview')
  const [variant, setVariant] = useState('char1')
  const [darkMode, setDarkMode] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [useCustomBackground, setUseCustomBackground] = useState(false)
  const canvasRef = useRef(null)

  const muiTheme = React.useMemo(() => createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  }), [darkMode])

  // send height updates to parent iframe for responsive embedding
  useEffect(() => {
    const sendHeight = () => {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'logo-previewer-height',
          height: document.body.scrollHeight,
        }, '*')
      }
    }
    sendHeight()
    window.addEventListener('resize', sendHeight)
    return () => window.removeEventListener('resize', sendHeight)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    drawOnePiece(ctx, text, variant, useCustomBackground)
  }, [text, variant, useCustomBackground])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          py: 6,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            p: { xs: 2, sm: 5 },
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            backdropFilter: 'blur(12px)',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30,30,30,0.85)'
                : 'rgba(255,255,255,0.95)',
            boxShadow: '0 10px 30px 4px #bbb5',
          }}
        >
          <Box sx={{ alignSelf: 'flex-end' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(prev => !prev)}
                />
              }
              label="Dark Mode"
            />
          </Box>
          <Typography
            variant="h2"
            align="center"
            fontWeight={900}
            gutterBottom
            sx={{
              fontSize: { xs: '2.3rem', sm: '3.2rem' },
              letterSpacing: '0.04em',
              background: 'linear-gradient(120deg,#ff4ecd 40%,#4361ee 70%,#fff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            One Piece Logo Previewer
          </Typography>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="variant-label">Variant</InputLabel>
            <Select
              labelId="variant-label"
              id="variant-select"
              value={variant}
              label="Variant"
              onChange={(e) => setVariant(e.target.value)}
            >
              {VARIANTS.onepiece.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="outlined"
            label="Your Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => { if (text === 'preview') setText('') }}
            inputProps={{ maxLength: 32 }}
          />

          {/* Advanced Options Accordion */}
          <Box sx={{ width: '100%', mt: 2 }}>
            <Accordion expanded={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} sx={{background: 'rgba(255,255,255,0.8)', boxShadow: 'none', border: '1px solid rgba(0,0,0,0.1)'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="advanced-options-content"
                id="advanced-options-header"
              >
                <Typography>Advanced Options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useCustomBackground}
                      onChange={(e) => setUseCustomBackground(e.target.checked)}
                    />
                  }
                  label="Use Custom Background"
                />
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
            }}
          >
            <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, py: 1.5, px: 5, fontSize: '1.1rem', borderRadius: 3, fontWeight: 'bold' }}
            onClick={() => {
              window.open(PRODUCT_PAGE_URL, '_blank')
            }}
          >
            Buy Now
          </Button>
        </Paper>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, opacity: 0.7 }}
        >
          &copy; {new Date().getFullYear()} Logo Previewer — UI by Material UI.
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

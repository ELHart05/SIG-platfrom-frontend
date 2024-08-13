import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { StyledEngineProvider } from '@mui/material'
import { registerPlugin } from 'react-filepond'
import { ToastContainer } from 'react-toastify'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import App from './App.jsx'
import theme from './theme/'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'filepond/dist/filepond.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>    
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
    <ToastContainer />
  </BrowserRouter>,
)

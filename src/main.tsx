import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.tsx'

import { LanguageProvider } from './contexts/LanguageContext'
import { RequestsProvider } from './contexts/RequestsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <RequestsProvider>
          <App />
        </RequestsProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)

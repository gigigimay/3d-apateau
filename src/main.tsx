import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'
import { DescContextProvider } from 'DescContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DescContextProvider>
      <App />
    </DescContextProvider>
  </StrictMode>
)

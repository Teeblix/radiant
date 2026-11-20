import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

const PAGES = {
  '/about': <ComingSoon title="About" />,
}

const page = PAGES[window.location.pathname]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {page ?? <App />}
  </StrictMode>,
)

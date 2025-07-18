import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './CodeVisualiser.jsx'
import CodeVisualiser from "./CodeVisualiser.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CodeVisualiser />
  </StrictMode>,
)

import { StrictMode } from 'react' // Help find potential problems in app
import { createRoot } from 'react-dom/client' // Attatches my react app to DOM. Creates a root container
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

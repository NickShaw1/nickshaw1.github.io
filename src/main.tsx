import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// vite-plugin-ssg entry — exports a factory function for SSG builds.
// For regular dev/preview, we render normally via the root element.
import { createRoot } from 'react-dom/client'

function renderApp() {
  const root = document.getElementById('root')
  if (!root) throw new Error('Root element not found')
  createRoot(root).render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  )
}

renderApp()

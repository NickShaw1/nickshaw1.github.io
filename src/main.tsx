import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// vite-plugin-ssg entry — exports a factory function for SSG builds.
// For regular dev/preview, we render normally via the root element.
import { createRoot } from 'react-dom/client'

// Prevent browser from restoring scroll position on SPA navigation
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

// GitHub Pages SPA redirect — 404.html sends /?p=/path, restore it here
const ghPagesRedirect = new URLSearchParams(window.location.search).get('p')
if (ghPagesRedirect) {
  history.replaceState(null, '', ghPagesRedirect)
}

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

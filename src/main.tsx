import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// vite-plugin-ssg entry — exports a factory function for SSG builds.
// For regular dev/preview, we render normally via the root element.
import { createRoot } from 'react-dom/client'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '100vh', gap: '1.25rem',
          background: '#0a0a0a', fontFamily: 'monospace',
        }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0AFF9D', margin: 0 }}>
            Something went wrong
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent', border: '1px solid rgba(10,255,157,0.3)',
              color: '#0AFF9D', fontFamily: 'monospace', fontSize: '0.7rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.5rem 1.25rem', borderRadius: '4px', cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

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
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

renderApp()

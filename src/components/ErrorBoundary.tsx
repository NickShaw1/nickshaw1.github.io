import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { crashed: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { crashed: false }

  static getDerivedStateFromError(): State {
    return { crashed: true }
  }

  componentDidCatch(error: Error) {
    // Chunk load failures (stale deploy) — auto-reload once
    const isChunkError =
      error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Importing a module script failed') ||
      error.name === 'ChunkLoadError'

    if (isChunkError && !sessionStorage.getItem('chunkReload')) {
      sessionStorage.setItem('chunkReload', '1')
      window.location.reload()
    }
  }

  render() {
    if (!this.state.crashed) return this.props.children
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 px-6 text-center">
        <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted">
          Something went wrong
        </p>
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 rounded-pill border border-accent text-accent hover:bg-accent/10 transition-colors duration-150"
        >
          Reload page
        </button>
      </div>
    )
  }
}
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
    return this.state.crashed ? null : this.props.children
  }
}
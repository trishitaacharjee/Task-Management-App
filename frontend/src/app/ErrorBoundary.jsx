import { Component } from 'react';

// Without this, any uncaught render error anywhere in the tree (a bad
// API response, a null a component didn't expect, etc.) unmounts the
// *entire* app to a blank page with zero indication of what happened —
// this is exactly what was happening on the Diary page. Now it's
// contained to a friendly, recoverable screen instead.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="app-crash">
          <div className="app-crash__card">
            <h1>Something went wrong.</h1>
            <p>This page hit an unexpected error. Your other tasks and data are safe.</p>
            <button type="button" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

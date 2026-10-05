import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Wonderkind Toys App Crash:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('wonderkind_cart');
      localStorage.removeItem('wonderkind_wishlist');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDFBF7', padding: '24px', fontFamily: 'sans-serif' }}>
          <div style={{ maxWidth: '480px', width: '100%', backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5DACB', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2D2723', marginBottom: '8px' }}>Wonderkind Toys</h1>
            <p style={{ fontSize: '14px', color: '#685B4E', marginBottom: '20px' }}>
              We encountered an unexpected issue while loading the playroom.
            </p>
            {this.state.error && (
              <pre style={{ fontSize: '11px', textAlign: 'left', backgroundColor: '#FAF6F0', padding: '12px', borderRadius: '8px', overflowX: 'auto', marginBottom: '20px', color: '#8A4234' }}>
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              style={{ padding: '10px 20px', backgroundColor: '#2D2723', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Reset Session & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);


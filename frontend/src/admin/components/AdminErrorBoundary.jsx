import React from 'react';
import { AlertCircle } from 'lucide-react';

export class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Admin Error Boundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-[#080B14] rounded-2xl border border-rose-500/30 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            A rendering error occurred in this admin module. The platform engineers have been notified.
          </p>
          <div className="text-left text-xs bg-black/50 p-4 rounded-xl border border-slate-800 w-full overflow-auto max-h-64 mt-4">
             <pre className="text-rose-300 font-mono">{this.state.error?.toString()}</pre>
             <pre className="text-slate-500 font-mono mt-2">{this.state.errorInfo?.componentStack}</pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default AdminErrorBoundary;

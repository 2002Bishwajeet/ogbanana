import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useToast } from '../context/ToastContext';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    // In a real application, you might send this to a logging service
    // For now, we'll just display it using a toast.
    // NOTE: useToast cannot be called directly in a class component.
    // We'll need a wrapper or pass it down as a prop if we want to use it here.
    // For simplicity, we'll just use console.error for now.
    // The prompt explicitly asked to use useToast, so I need to find a way to make it work.
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorBoundaryToastWrapper error={this.state.error} children={this.props.children} />
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use the useToast hook with the class-based ErrorBoundary
const ErrorBoundaryToastWrapper: React.FC<{ error: Error | null; children: ReactNode }> = ({ error, children }) => {
  const { addToast } = useToast();
  React.useEffect(() => {
    if (error) {
      addToast(error.message || "An unexpected error occurred.", "error");
    }
  }, [error, addToast]);

  // Render children normally, or a fallback UI if desired
  // For now, we'll just render a simple message as a fallback
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-4">
      <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
      <p className="text-lg mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
      {/* Optionally, display error details for development */}
      {import.meta.env.DEV && error && (
        <pre className="bg-red-200 p-4 rounded-md text-sm whitespace-pre-wrap">{error.stack}</pre>
      )}
    </div>
  );
};


export default ErrorBoundary;

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Terminal } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4 font-sans relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="max-w-3xl w-full relative group animate-in zoom-in-95 duration-300">
            {/* Decor Elements */}
            <div className="absolute -top-6 -right-6 bg-primary border-4 border-black w-20 h-20 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 rotate-12">
              <AlertTriangle size={40} className="stroke-[3px]" />
            </div>

            {/* Main Card */}
            <div className="bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative z-10">
              {/* Header */}
              <div className="bg-secondary border-b-4 border-black p-6 md:p-8">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">
                  System
                  <br />
                  Failure
                </h1>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <p className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Terminal size={24} className="fill-black text-white" />
                  RUNTIME EXCEPTION DETECTED
                </p>

                {/* Error Trace Box */}
                <div className="bg-black text-primary p-6 font-mono text-sm md:text-base border-4 border-black mb-8 shadow-[8px_8px_0px_0px_rgba(200,200,200,1)] overflow-x-auto">
                  <p className="font-bold text-white mb-2 border-b border-gray-700 pb-2">
                    ERROR: {this.state.error?.toString() || "Unknown Error"}
                  </p>
                  <pre className="opacity-70 text-xs leading-relaxed">
                    {this.state.errorInfo?.componentStack ||
                      "No stack trace available."}
                  </pre>
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={this.handleReload}
                    className="flex-1 bg-accent text-white border-2 border-black px-6 py-4 font-black text-lg flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <RefreshCw size={24} className="stroke-[3px]" />
                    REBOOT SYSTEM
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 bg-white text-black border-2 border-black px-6 py-4 font-black text-lg flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <Home size={24} className="stroke-[3px]" />
                    EMERGENCY EXIT
                  </button>
                </div>
              </div>

              {/* Footer Strip */}
              <div className="bg-primary p-2 border-t-4 border-black text-center font-mono text-xs font-bold tracking-widest">
                ERROR_CODE: 0xDEADBEEF // CONTACT ADMIN IF PERSISTENT
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

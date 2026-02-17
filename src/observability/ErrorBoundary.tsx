import { Component } from "react";
import type { ReactNode } from "react";
import { incrementMetric } from "./metrics";
import { logEvent } from "./logger";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    incrementMetric("ui_error");
    logEvent(
      "ui_error",
      {
        error: error instanceof Error ? error.message : String(error),
      },
      "error",
    );
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="bg-preset-rose-50 min-h-screen p-6 md:p-10">
        <h1 className="text-preset-rose-900 text-xl font-bold">Something went wrong</h1>
        <p className="text-preset-rose-500 mt-2">Please refresh the page.</p>
      </div>
    );
  }
}

import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

type ErrorBoundaryPrps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryPrps> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error: true });
  }

  render(): ReactNode {
    return this.state.error ? <ErrorMessage /> : this.props.children;
  }
}

export default ErrorBoundary;

import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
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

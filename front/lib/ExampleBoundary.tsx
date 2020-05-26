import React from "react";
import * as Sentry from "@sentry/browser";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      // Sentry.captureException(error);
    });
  }

  render() {
    return this.props.children;
  }
}

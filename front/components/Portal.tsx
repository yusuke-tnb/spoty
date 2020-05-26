import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps {
  selector: string;
}

interface IState {
  element: Element | null;
}

export default class Portal extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = { element: null };
  }

  componentDidMount() {
    this.setState({
      element: document.querySelector(this.props.selector)
    });
  }

  render() {
    if (!this.state.element) return null;

    return ReactDOM.createPortal(this.props.children, this.state.element);
  }
}

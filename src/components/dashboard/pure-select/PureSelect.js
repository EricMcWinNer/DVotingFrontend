import React, { Component } from "react";
import _ from "lodash";

class PureSelect extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(this.props.children, nextProps.children);
  }

  render() {
    const { children, firstOption, ...props } = this.props;
    return (
      <select {...props}>
        {firstOption}
        {children}
      </select>
    );
  }
}

export default PureSelect;

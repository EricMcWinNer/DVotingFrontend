import React, { Component } from "react";
import { BarChart } from "recharts";
import _ from "lodash";

class PureBarChart extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(this.props.data, nextProps.data);
  }

  render() {
    const { children, ...props } = this.props;
    return <BarChart {...props}>{children}</BarChart>;
  }
}

export default PureBarChart;

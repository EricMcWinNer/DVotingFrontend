import React, { Component } from "react";
import _ from "lodash";
import { VictoryPie } from "victory";

class PurePieChart extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(this.props.data, nextProps.data);
  }

  return() {
    return <VictoryPie {...this.props} />;
  }
}

export default PurePieChart;

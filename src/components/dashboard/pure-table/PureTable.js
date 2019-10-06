import React, { Component } from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";

class PureTable extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !_.isEqual(this.props.data, nextProps.data);
  }

  render() {
    return <DataTable {...this.props} />;
  }
}

export default PureTable;

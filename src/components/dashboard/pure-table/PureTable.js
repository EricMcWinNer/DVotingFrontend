import React, { Component } from "react";
import DataTable from "react-data-table-component";
import Immutable from "immutable";

class PureTable extends Component {
  constructor(props) {
    super(props);
    this._data = Immutable.List([...this.props.data]);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this._data.equals(Immutable.List(nextProps.data));
  }
  
  render() {
    return <DataTable {...this.props} />;
  }
}

export default PureTable;

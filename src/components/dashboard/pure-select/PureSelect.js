import React, { Component } from "./React";
import Immutable from "./immutable";

class PureSelect extends Component {
  constructor(props) {
    super(props);
    this._data = Immutable.List([...this.props.data]);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this._data.equals(Immutable.List(nextProps.data));
  }
}

export default PureSelect;

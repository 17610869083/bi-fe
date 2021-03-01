import React from "react";
import "@/style/cityinfo.less";
import { Checkbox } from "antd";
import _ from "lodash";

const CheckboxGroup = Checkbox.Group;
export default class wtf extends React.Component {
  constructor(props) {
    super(props);
    const defaultCheck = _.intersection(
      this.props.defaultCheck,
      this.props.datasource.children.map(res => res.id)
    );
    if (defaultCheck.length > 0) {
      this.props.handleItemChange && this.props.handleItemChange(defaultCheck);
    }
    this.state = {
      checkeds: defaultCheck,
      indeterminate: true,
      checkAll: false
    };
  }
  checked = current => {
    const { checkeds } = this.state;
    this.setState({
      checkeds: current,
      indeterminate:
        !!checkeds.length &&
        checkeds.length < this.props.datasource.children.length,
      checkAll: checkeds.length === this.props.datasource.children
    });
  };
  allChecked = e => {
    this.setState({
      checkeds: e.target.checked
        ? this.props.datasource.children.map(res => res.id)
        : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
  shouldComponentUpdate = (nextProps, nextState) => {
    return !_.isEqual(this.state, nextState);
  };
  componentDidUpdate = () => {
    this.props.handleItemChange &&
      this.props.handleItemChange(this.state.checkeds);
  };
  render() {
    console.log();
    const { name, children } = this.props.datasource;
    const { checkeds, checkAll, indeterminate } = this.state;
    const citys = children.map(res => ({ label: res.name, value: res.id }));
    return (
      <div>
        <div style={{ borderBottom: "1px solid #E9E9E9" }}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.allChecked}
            checked={checkAll}
          >
            {name}
          </Checkbox>
        </div>
        <CheckboxGroup
          options={citys}
          value={checkeds}
          onChange={this.checked}
        />
      </div>
    );
  }
}

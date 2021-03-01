import React, { Component } from "react";
import { Select } from "antd";
import { connect } from "react-redux";

const Option = Select.Option;

class CSerRemoteSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state = {
      currValue: undefined,
      firstBlood: false
    };
  }

  handleChange = value => {
    console.log("change", value);
    const { updateCSerChange } = this.props;
    updateCSerChange(value);
    this.setState({
      currValue: value
    });
  };

  render() {
    const { firstBlood, currValue } = this.state;
    const { initItem = null, CSers = [] } = this.props;
    console.log("csers", CSers);

    return (
      <Select
        showSearch
        value={currValue}
        placeholder="请输入客服姓名"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={this.handleChange}
        style={{ width: 200 }}
        {...this.props}
      >
        {initItem && !firstBlood ? (
          <Option key={initItem.key} value={initItem.key}>
            {initItem.text}
          </Option>
        ) : null}
        {CSers.map(cs => (
          <Option key={cs.id} value={cs.id}>
            {cs.realName}
          </Option>
        ))}
      </Select>
    );
  }
}
export default connect(state => {
  return { CSers: state.common.CSers };
})(CSerRemoteSelect);

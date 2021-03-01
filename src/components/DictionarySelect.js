import React, { Component } from "react";
import { Select } from "antd";
const { Option } = Select;
export default class DictSelect extends Component {
  render() {
    const { data } = this.props;
    console.log(data, "1234567");
    return (
      <Select
        style={{ minWidth: "100px" }}
        placeholder="请选择"
        allowClear
        {...this.props}
      >
        {data.map(item => (
          <Option key={item.detailName} value={item.detailName}>
            {item.detailContent}
          </Option>
        ))}
      </Select>
    );
  }
}

import React from "react";
import { Select } from "antd";
import { request } from "@/axios/tools";

const { Option } = Select;

class BlocSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }
  componentDidMount() {
    request({
      type: "get",
      url: "blocinfos/list",
      end: (status, response) => {
        this.setState({
          options: response
        });
      }
    });
  }
  render() {
    const options = this.state.options.map(res => {
      return (
        <Option key={res.id} value={Number(res.id)}>
          {res.name}
        </Option>
      );
    });
    return (
      <Select
        {...this.props}
        // showSearch
        allowClear
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options}
      </Select>
    );
  }
}

export default BlocSelect;

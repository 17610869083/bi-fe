import React from "react";
import { Select } from "antd";
import axios from "axios";
import { qsEncode } from "@/utils";
import { adminUrl } from "@/config";
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = qsEncode({
      tagName: value
    });
    axios.get(`${adminUrl}/common/tags?${str}`).then(res => {
      if (currentValue === value) {
        const result = res.data.data;
        const data = [];
        result.forEach(r => {
          data.push(r.tagName);
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

class SearchInput extends React.Component {
  state = {
    data: [],
    value: ""
  };
  UNSAFE_componentWillMount = () => {
    this.handleChange();
  };
  handleChange = value => {
    this.setState({ value });
    fetch(value, data => this.setState({ data }));
  };
  onBlur = () => {
    const { value, data } = this.state;
    if (data.indexOf(value) === -1) {
      this.setState({
        value: ""
      });
    }
  };
  onSelect = value => {
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
    return false;
  };
  render() {
    const options = this.state.data.map(d => <Option key={d}>{d}</Option>);
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        notFoundContent=""
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.onSelect}
      >
        {options}
      </Select>
    );
  }
}
export default SearchInput;

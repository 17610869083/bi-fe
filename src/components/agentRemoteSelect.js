import React, { Component } from "react";
import { Select, Spin, message } from "antd";
import debounce from "lodash/debounce";
import { getAgentsByName } from "@/actions/common";

const Option = Select.Option;

export default class AgentRemoteSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchAgents = debounce(this.fetchAgents, 600);
    this.state = {
      data: [],
      currValue: undefined,
      fetching: false,
      firstBlood: false
    };
  }

  fetchAgents = value => {
    // 清掉默认项
    this.setState({
      firstBlood: true
    });
    console.log("fetching agents", value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    getAgentsByName(value, resp => {
      if (fetchId !== this.lastFetchId) {
        // for fetch callback order
        return;
      }
      const {
        success,
        data: { list: agents }
      } = resp;
      if (success) {
        const data = agents.map(s => ({
          text: s.realName,
          value: s.id
        }));
        this.setState({ data, fetching: false });
      } else {
        message.error("数据拉取出错啦~");
      }
    });
  };

  handleChange = value => {
    console.log("change", value);
    const { updateAgentChange } = this.props;
    updateAgentChange(value);
    this.setState({
      currValue: Number(value),
      data: [],
      fetching: false
    });
  };

  render() {
    const { fetching, data, firstBlood, currValue } = this.state;
    const { initItem } = this.props;
    return (
      <Select
        showSearch
        value={currValue}
        placeholder="请输入代理商姓名"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchAgents}
        onChange={this.handleChange}
        {...this.props}
      >
        {initItem && !firstBlood ? (
          <Option key={initItem.key} value={initItem.key}>
            {initItem.text}
          </Option>
        ) : null}
        {data.map(d => (
          <Option key={d.value} value={Number(d.value)}>
            {d.text}
          </Option>
        ))}
      </Select>
    );
  }
}

import React, { Component } from "react";
import { Select } from "antd";
const { Option } = Select;
import { getAllAgent } from "@/actions/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class AgentSelect extends Component {
  componentDidMount() {
    this.props.getAllAgent();
  }
  render() {
    const { agents } = this.props;
    return (
      <Select
        placeholder="选择代理商"
        showSearch
        allowClear
        optionFilterProp="children"
        {...this.props}
      >
        <Option key={0} value={0}>
          暂无代理
        </Option>
        {agents.map(item => (
          <Option key={item.id} value={Number(item.id)}>
            {`${item.realName}|${item.type == 8 ? `县` : `市`}`}
          </Option>
        ))}
      </Select>
    );
  }
}
const mapStateToPorps = store => {
  return { ...store.common };
};
const mapDispatchToProps = dispatch => ({
  getAllAgent: bindActionCreators(getAllAgent, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(AgentSelect);

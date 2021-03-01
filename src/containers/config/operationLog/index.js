import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getOperationLog
} from "@/actions/config/operationLog";
import { Divider } from "antd";
import OperationLogList from "./table";
import Retrivel from "./search";

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retriveValues: {}
    };
  }
  componentDidMount = () => {
    this.props.getOperationLog();
  };
    // 更新检索条件 state
    updateRetriveValues = values => {
      const { retriveValues } = this.state;
      this.setState({
        retriveValues: {
          ...retriveValues,
          ...values
        }
      });
    };
    // 重置检索条件 state
    resetRetriveValues = () => {
      this.setState({
        retriveValues: {}
      });
    };
  render() {
    const { getOperationLog, operationList, pageNum, total, loading, operation_module } = this.props;
    console.log(this.props, "this.props");
    return (
      <React.Fragment>
        <Retrivel
          getOperationLog={getOperationLog}
          operationModule={operation_module}
          updateRetriveValues={this.updateRetriveValues}
          resetRetriveValues={this.resetRetriveValues}
          retriveValues={this.state.retriveValues}
        />
        <Divider />
        <OperationLogList
          getOperationLog={getOperationLog}
          operationList={operationList}
          pageNum={pageNum}
          total={total}
          loading={loading}
          operationModule={operation_module}
          retriveValues={this.state.retriveValues}          
        />
      </React.Fragment>
    );
  }
}
export default connect(
  store => ({
    ...store.operationLog,
    ...store.common.dicts
  }),
  dispatch =>
    bindActionCreators(
      {
        getOperationLog,
      },
      dispatch
    )
)(Operation);

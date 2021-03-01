import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Divider, Row } from "antd";
import SchoolList from "./table";
import Retrivel from "./retrivel";
import { getStatSchoolList } from "../../../actions/statistics/school";

export class StatSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retriveValues: {}
    };
  }
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
  // 更新当前页的数据
  updateCurrPageData = () => {
    const { retriveValues } = this.state;
    this.props.getStatSchoolList(retriveValues);
  };
  componentDidMount() {
    const { schoolId } = this.props.match.params;
    console.log("props", this.props.match);
    if (typeof schoolId === "undefined") {
      this.props.getStatSchoolList();
    } else {
      this.props.getStatSchoolList({ schoolId });
      this.setState({
        retriveValues: { schoolId }
      });
    }
  }
  render() {
    const {
      getStatSchoolList,
      loading,
      pageNum,
      statSchoolList,
      total
    } = this.props;
    const { retriveValues } = this.state;
    return (
      <React.Fragment>
        <Row type="flex" align="middle">
          {/* 检索项组件 */}
          <Retrivel
            handleSubmit={getStatSchoolList}
            updateRetriveValues={this.updateRetriveValues}
            resetRetriveValues={this.resetRetriveValues}
            retriveValues={retriveValues}
          />
        </Row>
        <Divider />
        {/* 园所列表 */}
        <SchoolList
          data={statSchoolList}
          loading={loading}
          pagination={{ pageNum, total }}
          handlePageChange={getStatSchoolList}
          updateRetriveValues={this.updateRetriveValues}
          updateCurrPageData={this.updateCurrPageData}
          retriveValues={retriveValues}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.statSchool });

const mapDispatchToProps = dispatch => ({
  getStatSchoolList: bindActionCreators(getStatSchoolList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatSchool);

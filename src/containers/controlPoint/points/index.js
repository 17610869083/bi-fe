import React, { Component } from "react";
import { Button, Row, Divider } from "antd";
import PointList from "./table";
import Retrivel from "./retrivel";
import PointForm from "./formModal";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPointList } from "@/actions/controlPoint/points";

class Points extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retriveValues: {},
      pointFormVisible: false,
      currPointId: 0
    };
  }
  componentDidMount = () => {
    this.props.getPointList();
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
  // 更新当前页的数据
  updateCurrPageData = () => {
    const { retriveValues } = this.state;
    this.props.getPointList(retriveValues);
  };
  // 控制编辑弹窗的显示和隐藏
  handlePointFormVisible = (visible, pointId = null) => {
    this.setState({
      pointFormVisible: visible,
      currPointId: pointId
    });
  };
  render() {
    const {
      pointList = [],
      loading,
      pageNum,
      total,
      getPointList,
      control_font_color = []
    } = this.props;
    console.log("point list", this.props);

    const { pointFormVisible, retriveValues, currPointId } = this.state;
    return (
      <React.Fragment>
        <Row type="flex" align="middle" justify="space-between">
          <Retrivel
            handleSubmit={getPointList}
            updateRetriveValues={this.updateRetriveValues}
            resetRetriveValues={this.resetRetriveValues}
          />
          <Button
            type="primary"
            icon="plus"
            onClick={() => {
              this.handlePointFormVisible(true);
            }}
          >
            新建管控点
          </Button>
        </Row>
        <Divider />

        <PointList
          data={pointList}
          loading={loading}
          pagination={{ pageNum, total }}
          handlePageChange={getPointList}
          handleModalVisible={this.handlePointFormVisible}
          updateRetriveValues={this.updateRetriveValues}
          retriveValues={retriveValues}
        />
        {pointFormVisible ? (
          <PointForm
            fontColors={control_font_color}
            refreshPointList={() => {
              getPointList(retriveValues);
            }}
            handleModalVisible={this.handlePointFormVisible}
            pointId={currPointId}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.points, ...state.common.dicts });

const mapDispatchToProps = dispatch => ({
  getPointList: bindActionCreators(getPointList, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Points);

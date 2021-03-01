import React, { Component } from "react";
import { Layout, Card } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { initCommonData } from "@/actions/common";
import { localUserKey } from "@/config";

import PageFooter from "./components/Footer";
import HeaderCustom from "./components/HeaderCustom";
import BreadcrumbCustom from "./components/BreadcrumbCustom";
import RouteHub from "./routes";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null
    };
  }
  componentDidMount() {
    const { initCommonData } = this.props;
    const info = JSON.parse(localStorage.getItem(localUserKey));
    if (info) {
      this.setState({
        menu: info.menu
      });
      // 初始化通用数据
      initCommonData();

      console.log("menu list", info);
    }
  }
  render() {
    console.log("app props", this.props);
    const { menu } = this.state;
    return (
      <Layout>
        {menu ? <HeaderCustom menu={menu} /> : null}
        <Content style={{ padding: "65px 10px" }}>
          <Card
            style={{
              minHeight: "100vh",
              position: "relative",
              marginTop: "10px"
            }}
          >
            {menu ? <BreadcrumbCustom menu={menu} /> : null}
            {/* 页面路由集散地 */}
            <RouteHub />
          </Card>
        </Content>
        <PageFooter />
      </Layout>
    );
  }
}
const mapStateToPorps = state => state;
const mapDispatchToProps = dispatch => ({
  initCommonData: bindActionCreators(initCommonData, dispatch)
});
export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(App);

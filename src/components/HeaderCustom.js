import React, { Component } from "react";
import { Menu, Icon, Layout, Divider, Dropdown } from "antd";
import { logout } from "@/utils";
import { Link } from "react-router-dom";
import img_long from "@/style/imgs/growth_logo_long.png";
import { localUserKey } from "@/config";
import ResetPassWord from "./forms/resetPassWord";

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class HeaderCustom extends Component {
  state = {
    username: "",
    resetPasswordVisible: false
  };
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem(localUserKey));
    console.log("user", user);
    this.setState({
      username: user.username
    });
  }
  handleUpdatePassword() {
    this.setState({
      resetPasswordVisible: true
    });
  }
  render() {
    const { menu = [] } = this.props;
    console.log("header menu:", menu);

    return (
      <Header
        style={{
          background: "#fff",
          padding: 0,
          paddingRight: "16px",
          height: 50,
          zIndex: 1000,
          position: "fixed",
          width: "100%",
          boxShadow: "0px 3px 3px #999",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Link to={`/`}>
          <img
            alt="壹点壹滴"
            src={img_long}
            style={{
              height: "40px",
              position: "relative",
              display: "inline",
              float: "left",
              margin: "5px 10px 5px 6px"
            }}
          />
        </Link>
        <Menu mode="horizontal" style={{ flex: 1, justifySelf: "flex-start" }}>
          {menu.map(res => {
            if (!res.leaf) {
              return (
                <SubMenu key={res.menuHref} title={<span>{res.menuName}</span>}>
                  {res.children.map(res => {
                    return (
                      <Menu.Item key={res.menuHref}>
                        <Link to={res.menuHref}>{res.menuName}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={res.menuHref}>
                  <Link to={res.menuHref}>{res.menuName}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <div>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <a onClick={() => this.handleUpdatePassword()}>修改密码</a>
                </Menu.Item>
              </Menu>
            }
            style={{ float: "right" }}
          >
            <span>
              <span>{this.state.username}</span>
              <Divider type="vertical" />
              <Icon
                style={{
                  fontSize: "18px",
                  color: "#fa9848",
                  cursor: "pointer"
                }}
                type="logout"
                onClick={() => {
                  logout();
                }}
              />
            </span>
          </Dropdown>
        </div>
        <ResetPassWord
          visiable={this.state.resetPasswordVisible}
          onCancel={() => {
            this.setState({ resetPasswordVisible: false });
          }}
        />
      </Header>
    );
  }
}

export default HeaderCustom;

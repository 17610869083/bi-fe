import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData } from "@/actions/login";
import { localUserKey } from "@/config";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import OutdateBrowserTip from "@/components/outdateBrowserTip";
import MobilePortraitTip from "@/components/mobilePortraitTip";
import img_small from "@/style/imgs/1d1d.png";
import owl_login from "@/style/imgs/owl/owl-login.png";
import owl_arm from "@/style/imgs/owl/owl-login-arm.png";
import LoginBg from "@/style/imgs/login.bg.jpg";
import PageFooter from "@/components/Footer";

const FormItem = Form.Item;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  #loginBg {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -100;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
  }

  .loginWrapper {
    margin-bottom: 6rem;

    .owl {
      margin: auto;
      width: 211px;
      height: 108px;
      background-image: url(${owl_login});
      position: relative;
      margin-bottom: -9px;
      z-index: 999;
      .hand {
        width: 34px;
        height: 34px;
        border-radius: 40px;
        background-color: #472d20;
        transform: scaleY(0.6);
        position: absolute;
        left: 14px;
        bottom: -8px;
        transition: 0.3s ease-out;
        &.password {
          transform: translateX(42px) translateY(-15px) scale(0.7);
        }
        &.hand-r {
          left: 170px;
          &.password {
            transform: translateX(-42px) translateY(-15px) scale(0.7);
          }
        }
      }
      .arms {
        position: absolute;
        top: 58px;
        height: 41px;
        width: 100%;
        overflow: hidden;
        .arm {
          width: 40px;
          height: 65px;
          background-image: url(${owl_arm});
          position: absolute;
          left: 20px;
          top: 40px;
          transition: 0.3s ease-out;
          &.password {
            transform: translateX(40px) translateY(-40px);
          }
          &.arm-r {
            left: 158px;
            transform: scaleX(-1);
            &.password {
              transform: translateX(-40px) translateY(-40px) scaleX(-1);
            }
          }
        }
      }
    }
    .loginForm {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 320px;
      height: 305px;
      padding: 36px;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
      background: rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      .logo {
        width: 200px;
        margin-bottom: 10px;
      }
    }
  }
`;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.owlEle = React.createRef();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { fetchData } = this.props;
        const { mobile, password } = values;
        this.setState({ loading: true });
        fetchData({ mobile: mobile, password }, (status, response) => {
          if (status === "success") {
            console.log("did it!");

            Cookie.set(
              "Authorization",
              `${response.token_type} ${response.access_token}`,
              { expires: 7 }
            );
            localStorage.setItem(
              localUserKey,
              JSON.stringify({
                username: response.info.name,
                mobile: response.info.mobile,
                menu: response.menus
              })
            );
            message.success("登录成功，即将跳转...");
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          } else {
            this.setState({ loading: false });
            console.log("not it!", response);
            message.warning(response.msg);
          }
        });
      }
    });
  };
  handlePasswordFocus = () => {
    const owlNode = this.owlEle.current;
    let nodes = owlNode.querySelectorAll(".animate");
    nodes.forEach(node => {
      node.classList.add("password");
    });
  };
  handlePasswordBlur = () => {
    const owlNode = this.owlEle.current;
    let nodes = owlNode.querySelectorAll(".animate");
    nodes.forEach(node => {
      node.classList.remove("password");
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("login item");

    return Cookie.get("Authorization") ? (
      <Redirect to="/" />
    ) : (
      <Wrapper>
        {/* 手机竖屏给出提示 */}
        <MobilePortraitTip />
        {/* 版本过低浏览器给出提示 */}
        <OutdateBrowserTip />
        {/* <Bideo /> */}
        <img src={LoginBg} id="loginBg" />
         

        <div className="loginWrapper">
          <div className="owl" ref={this.owlEle}>
            <div className="hand animate" />
            <div className="hand hand-r animate" />
            <div className="arms">
              <div className="arm animate" />
              <div className="arm arm-r animate" />
            </div>
          </div>
          <div className="loginForm">
            <img className="logo" alt="壹点壹滴" src={img_small} />
            <Form
              onSubmit={this.handleSubmit}
              layout={"horizontal"}
              autoComplete="disabled"
            >
              <FormItem>
                {getFieldDecorator("mobile", {
                  rules: [
                    { required: true, message: "请输入用户名/手机号/邮箱" }
                  ]
                })(
                  <Input
                    autoComplete="tel"
                    prefix={<Icon type="mobile" />}
                    placeholder="手机号"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }]
                })(
                  <Input
                    onFocus={this.handlePasswordFocus}
                    onBlur={this.handlePasswordBlur}
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={this.state.loading}
                >
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <PageFooter />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));

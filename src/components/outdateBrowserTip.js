import React, { Component } from "react";
import { Modal, Button, Alert } from "antd";
import browser from "bowser";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .alert {
    margin-bottom: 20px;
  }
`;
export default class OutdateBrowserTip extends Component {
  state = {
    modalVisible: false
  };
  componentDidMount() {
    const b = browser.getParser(window.navigator.userAgent);
    const isValidBrowser = b.satisfies({
      // declare browsers per OS
      windows: {
        "internet explorer": ">10"
      },
      macos: {
        safari: ">11"
      },

      // per platform (mobile, desktop or tablet)
      mobile: {
        safari: ">9",
        "android browser": ">3.10"
      },

      // or in general
      chrome: ">60",
      firefox: ">60",
      opera: ">50",
      safari: ">11",
      edge: ">12"
    });
    !isValidBrowser &&
      this.setState({
        modalVisible: true
      });
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <Modal
        title={
          <div style={{ width: "100%", textAlign: "center" }}>升级提示</div>
        }
        footer={null}
        closable={false}
        visible={modalVisible}
        centered
      >
        <Wrapper>
          <Alert
            description="您的浏览器版本过低，为了正常使用后台功能，推荐使用最新版谷歌/火狐/Edge等现代浏览器！"
            type="warning"
            showIcon
            className="alert"
          />

          <Button
            type="primary"
            href="http://outdatedbrowser.com/zh-cn"
            className="btn"
          >
            立即升级
          </Button>
        </Wrapper>
      </Modal>
    );
  }
}

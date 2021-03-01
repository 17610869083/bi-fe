import React, { Component } from "react";
import { Modal, Alert } from "antd";

export default class MobilePortraitTip extends Component {
  state = {
    showTip: false
  };
  componentDidMount() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      if (window.orientation == 0 || window.orientation == 180) {
        this.setState({
          showTip: true
        });
      }
      window.addEventListener("orientationchange", () => {
        if (window.orientation == 0 || window.orientation == 180) {
          this.setState({
            showTip: true
          });
        } else {
          this.setState({
            showTip: false
          });
        }
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("orientationchange");
  }
  render() {
    const { showTip } = this.state;
    return showTip ? (
      <Modal
        title={
          <div style={{ width: "100%", textAlign: "center" }}>温馨提示</div>
        }
        onCancel={() => {
          this.setState({
            showTip: false
          });
        }}
        footer={null}
        closable={true}
        visible={true}
        maskClosable={true}
        centered
      >
        <Alert
          description="检测到您正在使用移动设备访问，建议到PC端访问或者使用横屏访问！"
          type="warning"
          showIcon
          className="alert"
        />
      </Modal>
    ) : null;
  }
}

import React from "react";
import { Icon, Modal } from "antd";
import "@/style/logo.less";
class Logo extends React.Component {
  state = {
    isLoad: 0,
    visible: false
  };
  UNSAFE_componentWillMount() {
    if (!this.state.isLoad) {
      this.renderImg.call(this);
    }
  }
  componentWillUnmount() {
    this.img.onload = null;
    this.img.onerror = null;
  }
  renderImg = () => {
    this.img = new Image();
    this.img.src = this.props.src;
    this.img.onload = () => {
      this.setState({ isLoad: 1 });
    };
    this.img.onerror = () => {
      this.setState({ isLoad: -1 });
    };
  };
  seeImg = () => {
    this.setState({
      visible: true
    });
  };
  closeImg = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    let node;
    switch (this.state.isLoad) {
      case -1:
        node = this.props.icon ? this.props.icon : <Icon type="picture" />;
        break;
      case 1:
        node = (
          <img
            style={{ width: "100%" }}
            src={this.img.src}
            alt="logo"
            onClick={this.seeImg}
          />
        );
        break;
      default:
        node = <Icon type="loading" />;
        break;
    }
    return (
      <div className="imgLoad" style={{ fontSize: 36 }}>
        <Modal
          visible={this.state.visible}
          onCancel={this.closeImg}
          footer={null}
        >
          {node}
        </Modal>
        {node}
      </div>
    );
  }
}
export default Logo;

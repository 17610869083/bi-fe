import React from "react";
import { Upload, Icon, Modal } from "antd";
import { adminUrl, imgUrl } from "@/config";
import Cookie from "js-cookie";

class ImgUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: this.props.value
      ? this.props.value.map((res, index) => ({
          uid: -1 * (index + 1),
          name: res,
          status: "done",
          url: res
        }))
      : []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList }, () => {
      const dones = this.state.fileList.filter(res => {
        return res.status === "done";
      });
      if (this.state.fileList.length === dones.length) {
        this.props.onChange &&
          this.props.onChange(
            dones.map(res => {
              if (res.url) {
                return res.url;
              } else {
                return `${imgUrl}/${res.response.data}`;
              }
            })
          );
      }
    });
  };
  UNSAFE_componentWillReceiveProps(newProps) {
    const { value: newImages = [] } = newProps;
    const { value: oldImages = [] } = this.props;
    if (newImages.join(",") !== oldImages.join(",")) {
      this.setState({
        fileList: newImages.map((res, index) => ({
          uid: -1 * (index + 1),
          name: res,
          status: "done",
          url: res
        }))
      });
    }
  }
  render() {
    console.log("img upload props", this.props);
    const { tipTxt = "上传" } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const num = this.props.upNum ? this.props.upNum : 1;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{tipTxt}</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${adminUrl}/file/uploadpic`}
          listType="picture-card"
          name="file"
          headers={{
            Authorization: `${Cookie.get("Authorization")}`
          }}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= num ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default ImgUpload;

import React from "react";
import { Upload, Icon, Modal } from "antd";
import { adminUrl, imgUrl } from "@/config";
import Cookie from "js-cookie";

class VideoUpload extends React.Component {
  state = {
    previewVisible: false,
    previewVideo: "",
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
      previewVideo: file.url || file.thumbUrl,
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
    console.log("props", newProps, this.props);

    const {
      value: { fileList: newVideos = [] }
    } = newProps;
    const {
      value: { fileList: oldVideos = [] }
    } = this.props;
    if (newVideos.join(",") !== oldVideos.join(",")) {
      this.setState({
        fileList: newVideos.map((res, index) => ({
          uid: -1 * (index + 1),
          name: res,
          status: "done",
          url: res
        }))
      });
    }
  }
  render() {
    console.log("video upload props", this.props);
    const { tipTxt = "上传" } = this.props;
    const { previewVisible, previewVideo, fileList } = this.state;
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
          accept="video/*"
          // {...this.props}
        >
          {fileList.length >= num ? null : uploadButton}
        </Upload>
        {previewVisible ? (
          <Modal visible={true} footer={null} onCancel={this.handleCancel}>
            <video
              autoPlay
              controls
              alt="example"
              style={{ width: "100%" }}
              src={previewVideo}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default VideoUpload;

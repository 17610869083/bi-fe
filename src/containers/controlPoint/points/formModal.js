import React, { Component } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  message,
} from "antd";
import ImgUpload from "@/components/imgUpload";
import DictSelect from "@/components/DictionarySelect";
import PointItem from "./pointItem";
import { extractValues, composeControlItems } from "./extractValues";
import { getPoint, editPoint } from "@/actions/controlPoint/points";
import IdentityCascader from "@/components/identityCascader";

const { Item } = Form;

const ColLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};
const ThinColLayout = {
  labelCol: {
    span: 12
  },
  wrapperCol: {
    span: 12
  }
};
const PointColLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};
class PointForm extends Component {
  state = {
    loading: true,
    submiting: false,
    point: {},
    controlItems: []
  };
  handleAddControlItem = () => {
    const { controlItems } = this.state;
    let newItem = { id: controlItems.length ? controlItems.length + 1 : 1 };
    this.setState({
      controlItems: controlItems.concat(newItem)
    });
  };
  handleRemoveItem = currId => {
    console.log("handle");
    const { controlItems } = this.state;
    let newItems = controlItems.filter(item => item.id != currId);
    this.setState({
      controlItems: newItems
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { form, refreshPointList, handleModalVisible } = this.props;
    const { point } = this.state;
    const isEdit = point.id ? true : false;
    form.validateFields((err, values) => {
      if (!err) {
        values = extractValues(values);
        const { checkIcon, executeIcon, videoCoverUrl } = values;
        const data = {
          ...values,
          checkIcon: checkIcon.join(""),
          executeIcon: executeIcon.join(""),
          videoCoverUrl: videoCoverUrl.join("")
        };
        // 编辑管控点的话，加上ID
        isEdit && (data.id = point.id);
        console.log("updata:", data);
        this.setState({
          submiting: true
        });
        editPoint(data, resp => {
          if (resp.success) {
            message.success("操作成功！");
            refreshPointList();
          } else {
            message.error("操作失败！");
          }
          this.setState({
            submiting: false
          });
          handleModalVisible(false);
        });
      }
    });
  };
  componentDidMount() {
    const { pointId = null } = this.props;
    if (pointId) {
      getPoint(pointId, resp => {
        if (resp.success) {
          const { point } = resp;
          let controlItems = composeControlItems(
            point.controlItem,
            point.controlCheckNorm,
            point.controlExecuteNorm
          );
          this.setState({
            point,
            controlItems
          });
        }
        this.setState({
          loading: false
        });
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { form, handleModalVisible, fontColors } = this.props;
    const { point, loading, submiting, controlItems } = this.state;

    const {
      name = "",
      videoCoverUrl = "",
      videoUrl = "",
      checkPosition = 0,
      checkSubPosition = 0,
      executePosition = 0,
      executeSubPosition = 0,
      checkColour = 0,
      executeColour = 0,

      checkIcon = "",
      executeIcon = ""
    } = point;
    const { getFieldDecorator } = form;
    const isEdit = point.id ? true : false;
    console.log("items", controlItems);

    return (
      <Modal
        loading={loading}
        visible={true}
        width={900}
        footer={null}
        onCancel={() => {
          handleModalVisible(false);
        }}
      >
        <Form onSubmit={this.handleSubmit} autoComplete="disabled">
          <Row>
            <Divider orientation="left">管控点基本信息</Divider>
            <Col span={12}>
              <Item label="管控点" {...ColLayout}>
                {getFieldDecorator("name", {
                  initialValue: name,
                  rules: [
                    {
                      required: true,
                      message: "管控点名称不能为空！"
                    }
                  ]
                })(<Input placeholder="填写管控点名称" />)}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="视频地址" {...ColLayout}>
                {getFieldDecorator("videoUrl", {
                  initialValue: videoUrl
                })(<Input placeholder="视频地址" />)}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="视频封面" {...PointColLayout}>
                {getFieldDecorator("videoCoverUrl", {
                  initialValue: videoCoverUrl ? [videoCoverUrl] : [],
                  rules: [
                    {
                      required: true,
                      message: "请上传视频封面"
                    }
                  ]
                })(<ImgUpload tipTxt={"上传视频封面"} />)}
              </Item>
            </Col>
          </Row>
          <Divider orientation="left">检视/执行人信息</Divider>
          <Row>
            <Col span={6}>
              <Item label="检视人" {...ThinColLayout}>
                {getFieldDecorator("checkIcon", {
                  initialValue: checkIcon ? [checkIcon] : []
                })(<ImgUpload tipTxt={"检视人图标"} />)}
              </Item>
            </Col>
            <Col span={6}>
              <Row>
                <Col span={20} offset={4}>
                  <Item>
                    {getFieldDecorator("checkPosition", {
                      initialValue: checkPosition
                        ? [String(checkPosition), String(checkSubPosition)]
                        : undefined,
                      rules: [
                        {
                          required: true,
                          message: "请选择检视人身份！"
                        }
                      ]
                    })(<IdentityCascader placeholder="请选择检视人身份" />)}
                  </Item>
                </Col>
                <Col span={20} offset={4}>
                  <Item>
                    {getFieldDecorator("checkColour", {
                      initialValue: checkColour ? checkColour : undefined,
                      rules: [
                        {
                          required: true,
                          message: "请选择字体颜色！"
                        }
                      ]
                    })(
                      <DictSelect
                        data={fontColors}
                        placeholder="检视人字体颜色"
                      />
                    )}
                  </Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Item label="执行人" {...ThinColLayout}>
                {getFieldDecorator("executeIcon", {
                  initialValue: executeIcon ? [executeIcon] : []
                })(<ImgUpload tipTxt={"执行人图标"} />)}
              </Item>
            </Col>
            <Col span={6}>
              <Row>
                <Col span={20} offset={4}>
                  <Item>
                    {getFieldDecorator("executePosition", {
                      initialValue: executePosition
                        ? [String(executePosition), String(executeSubPosition)]
                        : undefined,
                      rules: [
                        {
                          required: true,
                          message: "请选择执行人身份"
                        }
                      ]
                    })(<IdentityCascader placeholder="请选择执行人身份" />)}
                  </Item>
                </Col>
                <Col span={20} offset={4}>
                  <Item>
                    {getFieldDecorator("executeColour", {
                      initialValue: executeColour ? executeColour : undefined,
                      rules: [
                        {
                          required: true,
                          message: "请选择字体颜色"
                        }
                      ]
                    })(
                      <DictSelect
                        data={fontColors}
                        placeholder="执行人字体颜色"
                      />
                    )}
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider orientation="left">管控项</Divider>
          {controlItems.map(item => (
            <PointItem
              key={item.id}
              getFieldDecorator={getFieldDecorator}
              data={item}
              removeItem={this.handleRemoveItem}
            />
          ))}
          <Row type="flex" justify="center">
            <Button
              type="ghost"
              icon="plus"
              onClick={() => {
                this.handleAddControlItem();
              }}
            >
              新增管控项
            </Button>
          </Row>
          <Divider />
          <Row type="flex" justify="end" align="middle">
            <Button loading={submiting} type="primary" htmlType="submit">
              {isEdit ? `更新` : `新建`}
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                handleModalVisible(false);
              }}
            >
              取消
            </Button>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(PointForm);

/**
 * 组件：用户分群创建页
 */
import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  notification,
  Select,
  Switch,
  InputNumber
} from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const openNotificationSuccess = type => {
  notification[type]({
    message: "真棒！",
    description: "添加菜单成功！",
    placement: "bottomRight"
  });
};
const openNotificationFail = (type, errInfo) => {
  notification[type]({
    message: "抱歉，添加菜单失败",
    description: errInfo,
    placement: "bottomRight"
  });
};
const CollectionCreateForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form, parentMenuList } = props;
  const { getFieldDecorator } = form;
  //console.log("父组件"+props.resetField);

  return (
    <Modal
      visible={visible}
      title="新建菜单"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
      width={700}
      style={{ top: 100, height: 400 }}
    >
      <Form onSubmit={onCreate}>
        <FormItem {...formItemLayout} label="菜单名称">
          {getFieldDecorator("menuName", {
            rules: [
              {
                required: true,
                message: "请输入菜单名称!"
              }
            ]
          })(<Input placeholder="请输入菜单名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="菜单序号">
          {getFieldDecorator("menuSort", {
            rules: [
              {
                required: true,
                message: "请输入菜单序号!"
              }
            ],
            normalize: (value) => {
              if (Number(value)) {
                return Number(value).toFixed();
              } else {
                return "";
              }
            }
          })(
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              step={1}
              placeholder="请输入菜单序号"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="菜单路由">
          {getFieldDecorator("menuHref", {
            rules: [
              {
                required: true,
                message: "请输入菜单路由!"
              }
            ]
          })(<Input placeholder="请输入菜单路由" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="权限标识">
          {getFieldDecorator("permission", {
            rules: [
              {
                required: true,
                message: "请输入权限标识!"
              }
            ]
          })(<Input placeholder="请输入权限标识" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="父菜单">
          {getFieldDecorator("parentId", {
            rules: [
              {
                required: true,
                message: "请选择父菜单!"
              }
            ]
          })(
            <Select showSearch placeholder="请选择父菜单" size="large">
              {parentMenuList}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator("remarks", {
            rules: [{ required: true, message: "请输入备注!" }]
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入备注"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator("show", { valuePropName: "checked" })(
            <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});

class ManageMenuCreateForm extends Component {
  state = {
    visible: false,
    menuData: [],
    parentMenuSelect: [],
    isShow: true
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const form = this.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createMenu(values, (status) => {
          if (status === "success") {
            form.resetFields();
            openNotificationSuccess("success");
            this.setState(
              {
                visible: false
              },
              () => {
                this.props.getMenuTree();
              }
            );
          } else {
            openNotificationFail("error", "创建失败!");
          }
        });
      }
    });
  };
  saveFormRef = form => {
    this.form = form;
  };
  render() {
    return (
      <div>
        <Button
          type="primary"
          icon="plus"
          size="large"
          onClick={this.showModal}
        >
          新建菜单
        </Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          parentMenuList={this.props.select}
        />
      </div>
    );
  }
}

export default ManageMenuCreateForm;

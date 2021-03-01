/**
 * 组件：用户分群创建页
 */
import React, { Component } from "react";
import { Modal, Form, Input, notification, Button, Tree } from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;

const openNotificationSuccess = type => {
  notification[type]({
    message: "真棒！",
    description: "保存角色成功！",
    placement: "bottomRight"
  });
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 }
  }
};
const CollectionCreateForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form, menu } = props;
  const { getFieldDecorator, setFieldsValue } = form;
  return (
    <Modal
      visible={visible}
      title="编辑角色信息"
      okText="保存"
      onCancel={onCancel}
      onOk={onCreate}
      width={700}
      style={{ top: 100, height: 400 }}
    >
      <Form onSubmit={onCreate}>
        <FormItem
          {...formItemLayout}
          style={{
            display: "none"
          }}
          label="角色ID"
        >
          {getFieldDecorator("id")(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="英文角色名称">
          {getFieldDecorator("roleName", {
            rules: [
              {
                required: true,
                message: "请输入角色名称!"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="中文角色名称">
          {getFieldDecorator("remarks", {
            rules: [{ required: true, message: "请输入中文角色名称!" }]
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入中文角色名称"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="分配菜单">
          {getFieldDecorator("menus", {
            valuePropName: "checkedKeys"
          })(
            <Tree
              checkable
              showLine
              onCheck={checkedKeys => {
                setFieldsValue({ menus: checkedKeys });
              }}
            >
              {menu}
            </Tree>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});

class EditRoleModal extends Component {
  state = {
    visible: false
  };
  showModal = () => {
    //根据用户id获取用户信息，填充到编辑界面的表单中
    this.setState({ visible: true }, () => {
      this.props.getRoleInfo(this.props.id, (status, response) => {
        if (status === "success") {
          const { id, roleName, remarks, menus } = response;
          console.log((menus || []).map(res => JSON.stringify(res)));
          this.form.setFieldsValue({
            id,
            roleName,
            remarks,
            menus: (menus || []).map(res => JSON.stringify(res))
          });
        }
      });
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const form = this.form;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      const menus = [];
      values.menus.forEach(res => {
        const item = JSON.parse(res);
        menus.push(item.id);
        if (item.parentId) {
          menus.push(item.parentId);
        }
      });
      this.props.editRole(
        {
          ...values,
          menus: Array.from(new Set(menus)).map(res => ({ id: res }))
        },
        status => {
          if (status === "success") {
            openNotificationSuccess("success");
            this.props.getRoles({ pageNum: this.props.pageNum });
            form.resetFields();
            this.setState({ visible: false });
          }
        }
      );
    });
  };
  BuildMenuTree = origionMenuData => {
    return origionMenuData.map(item => {
      if (item.children.length > 0) {
        return (
          <TreeNode
            title={item.menuName}
            key={JSON.stringify(item)}
            dataRef={item}
          >
            {this.BuildMenuTree(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={item.menuName}
          key={JSON.stringify(item)}
          dataRef={item}
        />
      );
    });
  };
  render() {
    const menu = this.BuildMenuTree(this.props.menu || []);
    return (
      <div style={{ display: "inline-block" }}>
        <Button
          onClick={this.showModal}
          type="primary"
          size="small"
          icon="edit"
        >
          编辑
        </Button>
        <CollectionCreateForm
          key={this.props.key}
          ref={ref => (this.form = ref)}
          {...this.props}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          menu={menu}
        />
      </div>
    );
  }
}
export default EditRoleModal;

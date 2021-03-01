/**
 * 组件：用户分群创建页
 */
import React, { Component } from "react";
import { Button, Modal, Form, Input, notification, Tree } from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;
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

const openNotificationSuccess = type => {
  notification[type]({
    message: "真棒！",
    description: "添加角色成功！",
    placement: "bottomRight"
  });
};
let key = 0;
const CollectionCreateForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form, menu } = props;
  const { getFieldDecorator, setFieldsValue } = form;
  //console.log("父组件"+props.resetField);
  if (!visible) {
    key++;
  }
  return (
    <Modal
      key={key}
      visible={visible}
      title="添加角色"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
      width={700}
      style={{ top: 100, height: 400 }}
    >
      <Form onSubmit={onCreate}>
        <FormItem {...formItemLayout} label="英文角色名称" hasFeedback>
          {getFieldDecorator("roleName", {
            rules: [
              {
                required: true,
                message: "请输入角色名称!"
              }
            ]
          })(<Input placeholder="请输入角色名称,例：ROLE_ADMIN" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="中文角色名称" hasFeedback>
          {getFieldDecorator("remarks", {
            rules: [{ required: true, message: "请输入中文角色名称!" }]
          })(
            <TextArea
              autosize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入中文角色名称"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="分配菜单" hasFeedback>
          {getFieldDecorator("menus")(
            <Tree
              checkable
              autoExpandParent
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

class ManageUserCreateForm extends Component {
  state = {
    visible: false,
    menuData: [],
    checkedKeys: []
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
      this.props.addRole(
        {
          ...values,
          menus: Array.from(new Set(menus)).map(res => ({ id: res }))
        },
        (status) => {
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
    //todo 子菜单排序
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
      <div style={{ display: "inline-block", marginBottom: "10px" }}>
        <Button type="primary" onClick={this.showModal}>
          添加角色
        </Button>
        <CollectionCreateForm
          ref={ref => (this.form = ref)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          menu={menu}
        />
      </div>
    );
  }
}

export default ManageUserCreateForm;

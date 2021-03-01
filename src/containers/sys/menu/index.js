import React from "react";
import { pick } from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getMenuTree,
  getMenuInfo,
  updateMenuInfo,
  deleteSelectedMenu,
  createMenu
} from "@/actions/sys/menu";
import ManageMenuCreateForm from "@/components/forms/ManageMenuCreateForm";
import {
  Card,
  Row,
  Col,
  Form,
  Tree,
  Input,
  Select,
  Switch,
  Button,
  notification,
  Popconfirm,
  message,
  InputNumber
} from "antd";
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 }
  }
};
const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: "bottomRight"
  });
};
class ManageMenuSet extends React.Component {
  componentDidMount = () => {
    this.InitTreeAndList();
  };
  InitTreeAndList = () => {
    this.props.getMenuTree();
  };
  BuildMenuTree = origionMenuData => {
    return origionMenuData.map(item => {
      if (item.children.length > 0) {
        return (
          <TreeNode title={item.menuName} key={item.id} dataRef={item}>
            {this.BuildMenuTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.menuName} key={item.id} dataRef={item} />;
    });
  };
  onMenuTreeSelect = selectedKeys => {
    if (selectedKeys[0]) {
      this.props.getMenuInfo(selectedKeys[0], result => {
        this.props.form.setFieldsValue({
          id: result.id,
          menuName: result.menuName,
          menuSort: result.menuSort,
          menuHref: result.menuHref,
          permission: result.permission,
          parentId: result.parentId || "top",
          remarks: result.remarks,
          show: result.show
        });
      });
    } else {
      message.error("无效数据！");
    }
  };
  onSwitchChange = e => {
    this.props.form.setFieldsValue({
      show: e
    });
  };
  updateMenuInfo = () => {
    this.props.form.validateFields((err, values) => {
      const keys = [
        "id",
        "menuHref",
        "menuName",
        "menuSort",
        "parentId",
        "permission",
        "remarks",
        "show"
      ];
      if (!err) {
        this.props.updateMenuInfo(pick(values, keys), status => {
          if (status === "success") {
            this.props.getMenuTree();
            openNotification("success", "更新成功！", "成功更新菜单信息");
          } else {
            openNotification("error", "更新失败！", "菜单信息更新失败");
          }
        });
      }
    });
  };
  deleteSelectedMenu = () => {
    this.props.form.validateFields(err => {
      const key = this.props.form.getFieldValue("id");
      if (!err) {
        this.props.deleteSelectedMenu(key, status => {
          if (status === "success") {
            this.props.form.resetFields();
            this.props.getMenuTree();
            openNotification("success", "成功！", `您已删除ID为${key}菜单!`);
          } else {
            openNotification("error", "抱歉，删除菜单失败！", "删除菜单失败！");
          }
        });
      }
    });
  };
  render() {
    const { menu = [] } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let parentMenuSelect = [];
    menu.forEach(obj => {
      parentMenuSelect.push(
        <Select.Option value={obj.id} key={obj.id}>
          {obj.menuName}
        </Select.Option>
      );
      if (obj.children.length > 0) {
        for (let i = 0; i < obj.children.length; i++) {
          let menuName = obj.menuName + "-" + obj.children[i].menuName;
          parentMenuSelect.push(
            <Select.Option value={obj.children[i].id} key={obj.children[i].id}>
              {menuName}
            </Select.Option>
          );
        }
      }
    });
    parentMenuSelect.push(
      <Select.Option value="top" key="top">
        无
      </Select.Option>
    );
    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={6}>
            <Card style={{ padding: 0 }}>
              <ManageMenuCreateForm select={parentMenuSelect} {...this.props} />
              <Tree showLine onSelect={this.onMenuTreeSelect}>
                {this.BuildMenuTree(menu)}
              </Tree>
            </Card>
          </Col>
          <Col span={18}>
            <Card>
              <Form>
                <FormItem {...formItemLayout} label="菜单ID">
                  {getFieldDecorator("id")(<Input disabled />)}
                </FormItem>
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
                    normalize: value => {
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
                      {parentMenuSelect}
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
                {getFieldValue("id") ? (
                  <FormItem {...formItemLayoutWithOutLabel}>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        width: "20%",
                        left: "20%"
                      }}
                      onClick={() => this.updateMenuInfo()}
                    >
                      更新菜单信息
                    </Button>
                    <Popconfirm
                      title="确定删除此菜单吗?"
                      onConfirm={() => this.deleteSelectedMenu()}
                    >
                      <Button
                        type="danger"
                        size="large"
                        style={{ width: "20%", left: "30%" }}
                      >
                        删除选中菜单
                      </Button>
                    </Popconfirm>
                  </FormItem>
                ) : (
                  ""
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToPorps = state => {
  return { ...state.menu };
};
const mapDispatchToProps = dispatch => ({
  getMenuTree: bindActionCreators(getMenuTree, dispatch),
  getMenuInfo: bindActionCreators(getMenuInfo, dispatch),
  updateMenuInfo: bindActionCreators(updateMenuInfo, dispatch),
  deleteSelectedMenu: bindActionCreators(deleteSelectedMenu, dispatch),
  createMenu: bindActionCreators(createMenu, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(Form.create()(ManageMenuSet));

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
  Checkbox,
  Radio,
  Collapse
} from "antd";
import _ from "lodash";

import City from "@/components/city/citylist";
import DictSelect from "@/components/DictionarySelect";
import AgentSelect from "@/components/AgentSelect";

const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
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
    description: "添加用户成功！",
    placement: "bottomRight"
  });
};
let key = 0;
const CollectionCreateForm = Form.create()(props => {
  const { visible, onCancel, onCreate, form, roles } = props;
  const { getFieldDecorator } = form;
  if (!visible) {
    key++;
  }
  const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
  };
  return (
    <Modal
      key={key}
      visible={visible}
      title="添加用户"
      okText="确定"
      onCancel={onCancel}
      onOk={onCreate}
      width={700}
      style={{ top: 100, height: 800 }}
    >
      <Form onSubmit={onCreate} autoComplete="disabled">
        <FormItem {...formItemLayout} label="手机号" hasFeedback>
          {getFieldDecorator("mobile", {
            rules: [
              {
                required: true,
                message: "请输入手机号！"
              },
              {
                len: 11,
                message: "请输入正确的手机号"
              }
            ]
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="登录密码" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入登录密码!"
              }
            ]
          })(<Input type="password" placeholder="请输入登录密码！" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="真实姓名" hasFeedback>
          {getFieldDecorator("realName", {
            rules: [
              {
                required: true,
                message: "请输入真实姓名！"
              }
            ]
          })(<Input placeholder="请输入真实姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户邮箱" hasFeedback>
          {getFieldDecorator("email")(<Input placeholder="请输入邮箱" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户性别" hasFeedback>
          {getFieldDecorator("sex")(
            <RadioGroup style={{ width: "130px" }}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <Collapse bordered={false}>
          <Panel header="代理商" key="1" style={customPanelStyle}>
            <FormItem {...formItemLayout} label="区域" hasFeedback>
              {getFieldDecorator("area")(<City />)}
            </FormItem>
            <FormItem {...formItemLayout} label="所属上级">
              {getFieldDecorator("parentId")(
                <AgentSelect placeholder="选择所属上级" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="身份">
              {getFieldDecorator("type")(<DictSelect data={roles} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="开通码">
              {getFieldDecorator("invitationCode")(
                <Input placeholder="请输入开通码" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="合同乙方名称" hasFeedback>
              {getFieldDecorator("compactName")(
                <Input placeholder="请输入合同乙方名称！" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="开户行" hasFeedback>
              {getFieldDecorator("accountBank")(
                <Input placeholder="请输入开户行！" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="开户人" hasFeedback>
              {getFieldDecorator("accountUser")(
                <Input placeholder="请输入开户人！" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="账号" hasFeedback>
              {getFieldDecorator("accountNo")(
                <Input placeholder="请输入账号！" />
              )}
            </FormItem>
          </Panel>
        </Collapse>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator("remarks")(
            <TextArea
              autosize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入备注"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="角色">
          {getFieldDecorator("roles")(
            <CheckboxGroup
              options={(props.allRole || []).map(res => ({
                label: res.remarks,
                value: res.id
              }))}
            />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});

class ManageUserCreateForm extends Component {
  state = {
    visible: false
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    this.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      this.props.addUser(
        {
          ...values,
          enabled: 1,
          roles: _.isArray(values.roles)
            ? values.roles.map(res => ({ id: res }))
            : []
        },
        (status) => {
          if (status === "success") {
            openNotificationSuccess("success");
            this.setState({ visible: false }, () => {
              this.form.resetFields();
            });
            this.props.getUsers({
              pageNum: this.props.pageNum,
              parentId: this.props.parentId
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <Button type="primary" onClick={this.showModal}>
          添加用户
        </Button>
        <CollectionCreateForm
          {...this.props}
          ref={ref => (this.form = ref)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default ManageUserCreateForm;

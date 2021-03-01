/**
 * 组件：用户分群创建页
 */
import React, { Component } from "react";
import {
  Modal,
  Spin,
  Form,
  Input,
  Checkbox,
  notification,
  Button,
  Radio,
  Collapse
} from "antd";
import { isArray } from "lodash";

import City from "@/components/city/citylist";
import DictSelect from "@/components/DictionarySelect";
import AgentSelect from "@/components/AgentSelect";

const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const openNotificationSuccess = type => {
  notification[type]({
    message: "真棒！",
    description: "保存用户成功！",
    placement: "bottomRight"
  });
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 }
  }
};
const CollectionCreateForm = Form.create()(props => {
  const { visible, loading, onCancel, onCreate, form, allRole, roles } = props;
  const { getFieldDecorator } = form;
  const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
  };
  return (
    <Modal
      visible={visible}
      title="编辑用户信息"
      okText="保存"
      onCancel={onCancel}
      onOk={onCreate}
      width={700}
      style={{ top: 100, height: 800 }}
    >
      {loading ? (
        <Spin spinning={loading} />
      ) : (
        <Form>
          <FormItem
            {...formItemLayout}
            style={{
              display: "none"
            }}
            label="角色ID"
          >
            {getFieldDecorator("id")(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号">
            {getFieldDecorator("mobile", {
              rules: [
                {
                  required: true,
                  message: "请输入手机号！"
                },
                {
                  pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                  message: "请输入正确的手机号"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="真实姓名">
            {getFieldDecorator("realName", {
              rules: [
                {
                  required: true,
                  message: "请输入真实姓名！"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="用户邮箱">
            {getFieldDecorator("email")(<Input placeholder="请输入邮箱" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="用户性别">
            {getFieldDecorator("sex")(
              <RadioGroup>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <Collapse bordered={false}>
            <Panel header="代理商" key="1" style={customPanelStyle}>
              <FormItem {...formItemLayout} label="区域">
                {getFieldDecorator("area")(<City style={{ height: 200 }} />)}
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
              <TextArea autosize={{ minRows: 2, maxRows: 10 }} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色">
            {getFieldDecorator("roles", {})(
              <CheckboxGroup
                options={(allRole || []).map(res => ({
                  label: res.remarks,
                  value: res.id
                }))}
              />
            )}
          </FormItem>
        </Form>
      )}
    </Modal>
  );
});

class ManageUserEditForm extends Component {
  state = {
    visible: false,
    loading: false,
    roleDataDefaultValue: []
  };
  isRequest = false;
  showModal = () => {
    //根据用户id获取用户信息，填充到编辑界面的表单中
    this.setState({ visible: true, loading: true }, () => {
      this.props.getUserInfo(this.props.id, (status, response) => {
        this.setState(
          {
            loading: false
          },
          () => {
            if (status === "success") {
              const {
                id,
                realName,
                mobile,
                remarks,
                sex,
                parentId,
                area,
                email,
                roles,
                type,
                invitationCode,
                accountBank,
                accountNo,
                accountUser,
                compactName
              } = response;
              this.form.setFieldsValue({
                id,
                realName,
                mobile,
                remarks,
                sex,
                parentId,
                area,
                email,
                type,
                invitationCode,
                accountBank,
                accountNo,
                accountUser,
                compactName,
                roles: roles.map(res => res.id)
              });
            }
          }
        );
      });
    });
  };
  handleCancel = () => {
    this.setState({ visible: false }, () => {
      this.form.resetFields();
    });
  };
  handleCreate = () => {
    if (!this.isRequest) {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
        this.isRequest = true;
        this.props.editUser(
          {
            ...values,
            roles: isArray(values.roles)
              ? values.roles.map(res => ({ id: res }))
              : []
          },
          (status) => {
            this.isRequest = false;
            if (status === "success") {
              openNotificationSuccess("success");
              this.form.resetFields();
              this.setState({ visible: false });
              this.props.getUsers({
                pageNum: this.props.pageNum,
                realName: this.props.realName,
                sex: this.props.sex,
                parentId: this.props.parentId
              });
            }
          }
        );
      });
    }
  };
  render() {
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
          {...this.props}
          ref={ref => (this.form = ref)}
          visible={this.state.visible}
          loading={this.state.loading}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
export default ManageUserEditForm;

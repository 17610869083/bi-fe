import React from "react";
import { Modal, Form, Input, message } from "antd";
import { logout } from "@/utils";
import { updatePassword } from "@/actions/sys/user";
const FormItem = Form.Item;

class ResetPassWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  checkPass = (rule, value, callback) => {
    callback();
  };
  checkPass2 = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    let pass = getFieldValue("new");
    let rePass = getFieldValue("repeat");
    if (pass !== rePass) {
      callback("两次输入密码不一致！");
    } else {
      callback();
    }
  };
  handleCommit = () => {
    const { getFieldValue } = this.props.form;
    let oldPassword = getFieldValue("password");
    let newPassword = getFieldValue("new");
    let data = {
      oldPassword,
      newPassword
    };
    updatePassword(data, resp => {
      if (resp.success) {
        message.success("修改成功，请重新登录！");
        logout();
      } else {
        message.error("操作失败！");
      }
      this.props.onCancel();
    });
  };
  render() {
    const { visiable, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visiable}
        title="修改密码"
        onCancel={this.props.onCancel}
        onOk={this.handleCommit}
      >
        <Form>
          <FormItem label="密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  whitespace: true
                }
              ]
            })(<Input type="password" placeholder="请输入密码" />)}
          </FormItem>
          <FormItem label="新密码">
            {getFieldDecorator("new", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  trigger: "onChange",
                  validator: this.checkPass
                }
              ]
            })(<Input type="password" placeholder="请输入新密码" />)}
          </FormItem>
          <FormItem label="确认密码">
            {getFieldDecorator("repeat", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  trigger: "onBlur",
                  validator: this.checkPass2
                }
              ]
            })(
              <Input
                type="password"
                placeholder="请重新输入密码"
                onChange={e => console.log(e)}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(ResetPassWord);

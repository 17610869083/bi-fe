import React, { PureComponent } from "react";
import { Button, Input, Form } from "antd";
import PropTypes from "prop-types";
import { purifyValues } from "@/utils";
import IdentityCascader from "@/components/identityCascader";
import { extractValues } from "./extractValues";

const { Item } = Form;
class FormItems extends PureComponent {
  // 表单提交
  handleFormSubmit = evt => {
    evt.preventDefault();
    const { updateRetriveValues, handleSubmit, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        values = purifyValues(values);
        values = extractValues(values);
        updateRetriveValues(values);

        handleSubmit(values);
      }
    });
  };
  render() {
    const { form, resetRetriveValues, handleSubmit } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleFormSubmit}>
        <Item>
          {form.getFieldDecorator("name")(<Input placeholder="管控点名称" />)}
        </Item>
        <Item>
          {form.getFieldDecorator("checkPosition")(
            <IdentityCascader placeholder="检视人身份" />
          )}
        </Item>
        <Item>
          {form.getFieldDecorator("executePosition")(
            <IdentityCascader placeholder="执行人身份" />
          )}
        </Item>

        <Item>
          <Button type="primary" icon="search" htmlType="submit">
            查询
          </Button>
        </Item>
        <Item>
          <Button
            icon="sync"
            onClick={() => {
              form.resetFields();
              resetRetriveValues();
              handleSubmit();
            }}
          >
            重置
          </Button>
        </Item>
      </Form>
    );
  }
}
FormItems.propTyeps = {
  updateRetriveValues: PropTypes.func
};
const Retrivel = Form.create()(FormItems);
export default Retrivel;

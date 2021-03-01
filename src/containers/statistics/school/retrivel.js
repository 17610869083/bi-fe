import React from "react";
// import PropTypes from 'prop-types'
import { Button, Input, Form, InputNumber } from "antd";
import { purifyValues } from "@/utils";

const { Item } = Form;
export default Form.create()(props => {
  const {
    resetRetriveValues,
    updateRetriveValues,
    handleSubmit,
    form,
    retriveValues: { schoolId }
  } = props;

  // 表单提交
  const handleFormSubmit = evt => {
    evt.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values = purifyValues(values);
        updateRetriveValues(values);

        handleSubmit(values);
      }
    });
  };
  return (
    <Form layout="inline" onSubmit={handleFormSubmit}>
      <Item>
        {form.getFieldDecorator("schoolId", {
          initialValue: schoolId
        })(<InputNumber min={0} placeholder="学校ID" />)}
      </Item>
      <Item>
        {form.getFieldDecorator("schoolName")(
          <Input placeholder="学校名称（可模糊搜索）" />
        )}
      </Item>

      <Item>
        <Button type="primary" icon="search" htmlType="submit">
          搜索
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
});

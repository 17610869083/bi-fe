import React, { Component } from "react";
import { Input, Col, Row, Form, Divider, Button } from "antd";
const { Item } = Form;
const PointColLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};
// const ColLayout = { labelCol: { span: 3 }, wrapperCol: { span: 9 } };
export default class PointItem extends Component {
  render() {
    const { getFieldDecorator, data = {}, removeItem } = this.props;
    return (
      <Row>
        <Col span={12}>
          <Item label="名称" {...PointColLayout}>
            {getFieldDecorator(`controlItem${data.id}`, {
              initialValue: data.name,
              rules: [
                {
                  required: true,
                  message: "管控项名称不能为空！"
                }
              ]
            })(<Input placeholder="管控项名称" />)}
          </Item>
        </Col>
        <Col span={12}>
          <Item wrapperCol={{ span: 22, offset: 2 }}>
            <Button
              onClick={() => {
                removeItem(data.id);
              }}
              shape="circle"
              icon="delete"
              type="danger"
            />
          </Item>
        </Col>
        <Col span={12}>
          <Item label="检查标准" {...PointColLayout}>
            {getFieldDecorator(`checkNorm${data.id}`, {
              initialValue: data.checkNorm,
              rules: [
                {
                  required: true,
                  message: "检查标准不能为空！"
                }
              ]
            })(<Input.TextArea rows={6} placeholder="检查标准" />)}
          </Item>
        </Col>
        <Col span={12}>
          <Item label="执行标准" {...PointColLayout}>
            {getFieldDecorator(`executeNorm${data.id}`, {
              initialValue: data.executeNorm
            })(<Input.TextArea rows={6} placeholder="执行标准" />)}
          </Item>
        </Col>
        <Divider />
      </Row>
    );
  }
}

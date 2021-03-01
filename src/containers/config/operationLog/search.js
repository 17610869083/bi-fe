import React, { PureComponent } from "react";
import { Button, Input, Form, Select, DatePicker } from "antd";
import PropTypes from "prop-types";
import { purifyValues } from "@/utils";
import DictSelect from "@/components/DictionarySelect";
const { RangePicker } = DatePicker;

const { Option } = Select;
const { Item } = Form;
class FormItems extends PureComponent {
  // 表单提交
  handleFormSubmit = evt => {
    evt.preventDefault();
    const { updateRetriveValues, getOperationLog, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        if (values.createdAt && values.createdAt.length) {
          const [start, end] = values.createdAt;
          values["startTime"] = start.format("YYYY-MM-DD HH:mm:ss");
          values["endTime"] = end.format("YYYY-MM-DD HH:mm:ss");
        }
        values = purifyValues(values);
        updateRetriveValues(values);

        getOperationLog(values);
      }
    });
  };
  render() {
    const { form, resetRetriveValues, getOperationLog, operationModule } = this.props;
    return (
      <Form layout="inline" onSubmit={this.handleFormSubmit}>
        <Item>
          {form.getFieldDecorator("module")(
            <DictSelect
              data={operationModule}
              style={{ width: 160 }}
              placeholder="操作模块"
            />
          )}
        </Item>
        <Item>
          {form.getFieldDecorator("type")(
            <Select placeholder="操作类型" style={{ width: "100px" }} allowClear>
              <Option value={1}>增加</Option>
              <Option value={2}>删除</Option>
              <Option value={3}>修改</Option>
              <Option value={4}>查询</Option>
            </Select>
          )}
        </Item>
        <Item>
          {form.getFieldDecorator("uid")(
            <Input placeholder="用户ID"/>
          )}
        </Item>
        <Item>
          {form.getFieldDecorator("roleId")(
            <Input placeholder="用户角色ID"/>
          )}
        </Item>
        <Item>
          {form.getFieldDecorator("schoolId")(
            <Input placeholder="学校ID"/>
          )}
        </Item>
        <Item>
          {form.getFieldDecorator("createdAt")(
            <RangePicker
              placeholder={["开始时间", "结束时间"]}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
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
              getOperationLog();
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

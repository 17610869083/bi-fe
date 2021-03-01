import React, { Component } from "react";
import { Table } from "antd";
import JSONInput from "react-json-editor-ajrm";
import locale from 'react-json-editor-ajrm/locale/en';
export default class BannerList extends Component {
  constructor() {
    super();
    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 60,
        fixed: "left"
      },
      {
        title: "主键ID",
        dataIndex: "keyId",
        key: "keyId",
        width: 100,
        fixed: "left"
      },
      {
        title: "学校ID",
        dataIndex: "schoolId",
        key: "schoolId",
        width: 100,
        fixed: "left"
      },
      {
        title: "模块名称",
        dataIndex: "module",
        key: "module",
        render: (text, record) => {
          const typeObj =
            this.props.operationModule.find(item => {
              return item.detailName === record.module;
            }) || {};
          return typeObj.detailContent;
        },
        width: 150,
      },
      {
        title: "新值",
        dataIndex: "currentValue",
        key: "currentValue",
        width: 200,
        render: (text) => (
          <JSONInput
            id="menu_display_json"
            placeholder={JSON.parse(text)}
            height="150px"
            width="100%"
            locale={locale}
            // onChange={this.handleJsonChange}
            // onKeyPressUpdate={false}
            theme="light_mitsuketa_tribute"
            viewOnly={true}
          />
        )
      },
      {
        title: "旧值",
        dataIndex: "oldValue",
        key: "oldValue",
        width: 200,
        render: (text) => (
          <JSONInput
            id="menu_display_json"
            placeholder={JSON.parse(text)}
            height="150px"
            width="100%"
            locale={locale}
            // onChange={this.handleJsonChange}
            // onKeyPressUpdate={false}
            theme="light_mitsuketa_tribute"
            viewOnly={true}
          />
        )
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
      },
      {
        title: "操作名称",
        dataIndex: "operation",
        key: "operation",
        width: 150,
      },
      {
        title: "操作类型",
        dataIndex: "type",
        key: "type",
        width: 150,
        render: (text) => {
          if (text === 1) {
            return "增加";
          } else if (text === 2) {
            return "删除";
          } else if (text === 3) {
            return "修改";
          } else if (text === 4) {
            return "查询";
          }
        }
      },
      {
        title: "用户角色ID",
        dataIndex: "roleId",
        key: "roleId",
        width: 50,
      },
      {
        title: "用户ID",
        dataIndex: "uid",
        key: "uid",
        width: 100,
      },
      {
        title: "用户姓名",
        dataIndex: "userName",
        key: "userName",
        width: 150,
      },
    ];
  }
  render() {
    const {
      operationList,
      loading,
      pageNum,
      total,
      retriveValues
    } = this.props;
    console.log(this.props, "this.propsssss");
    return (
      <Table
        rowKey={"id"}
        scroll={{ x: 1200 }}
        columns={this.columns}
        dataSource={operationList}
        loading={loading}
        pagination={{
          onChange: page => {
            this.props.getOperationLog({ pageNum: page, ...retriveValues });
          },
          pageNo: pageNum,
          pageSize: 20,
          total,
          showTotal: total => `共 ${total} 日志`
        }}
      />
    );
  }
}

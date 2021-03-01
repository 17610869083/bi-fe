import React, { Component } from "react";
import { Table, Button, Popconfirm } from "antd";
export default class DictList extends Component {
  render() {
    const {
      self,
      data,
      getParents,
      deleteDict,
      DictModal,
      loading,
      pagination: { pageNum, total }
    } = this.props;
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        width: 100,
        fixed: "left"
      },
      {
        title: "唯一标识",
        dataIndex: "dictName"
      },
      {
        title: "字典名称",
        dataIndex: "dictContent"
      },
      {
        title: "操作",
        dataIndex: "opts",
        width: 180,
        fixed: "right",
        render: (text, record, index) => (
          <span>
            <Button
              type="primary"
              icon="edit"
              size="small"
              onClick={() =>
                DictModal.call(
                  self,
                  { ...record, details: this.props.details || [] },
                  index
                )
              }
            >
              编辑
            </Button>
            <span style={{ paddingLeft: 10 }} />
            <Popconfirm
              title={`是否删除字典项${record.dictName}?`}
              onConfirm={() =>
                deleteDict(record.id, () => {
                  getParents();
                })
              }
            >
              <Button icon="delete" size="small">
                删除
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={data}
        scroll={{ x: 800 }}
        pagination={{
          pageNum,
          pageSize: 50,
          total,
          onChange: current => {
            getParents({ pageNum: current });
          }
        }}
        loading={loading}
      />
    );
  }
}

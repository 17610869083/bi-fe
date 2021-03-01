import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table, Button, Popconfirm, message } from "antd";
import {
  deletePoint,
  getPoint,
  editPoint
} from "@/actions/controlPoint/points";
import pick from "lodash/pick";

import IdentityCascader from "@/components/identityCascader";
export default class PointList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "管控点ID",
        dataIndex: "id"
      },
      {
        title: "管控点名称",
        dataIndex: "name"
      },
      {
        title: "管控卡编号",
        dataIndex: "number"
      },
      {
        title: "检视/执行身份",
        dataIndex: "identity",
        render: (val, record) => {
          return (
            <React.Fragment>
              <IdentityCascader
                value={[
                  String(record.checkPosition),
                  String(record.checkSubPosition)
                ]}
                // options={roles}
                disabled
              />
              <br />
              <IdentityCascader
                value={[
                  String(record.executePosition),
                  String(record.executeSubPosition)
                ]}
                // options={roles}
                disabled
              />
            </React.Fragment>
          );
        }
      },
      {
        title: "添加时间",
        dataIndex: "createdAt"
      },

      {
        title: "操作",
        dataIndex: "opts",
        width: 200,
        fixed: "right",
        render: (txt, item) => {
          const { id } = item;
          return (
            <Button.Group size="small">
              <Button
                type="primary"
                onClick={() => {
                  this.props.handleModalVisible(true, id);
                }}
              >
                修改
              </Button>
              <Popconfirm
                title="见证奇迹的时刻~~"
                onConfirm={() => {
                  getPoint(id, resp => {
                    const { handlePageChange, retriveValues } = this.props;
                    if (resp.success) {
                      let { point } = resp;
                      let cloned = pick(point, [
                        "name",
                        "videoUrl",
                        "videoCoverUrl",
                        "checkIcon",
                        "checkPosition",
                        "checkSubPosition",
                        "checkColour",
                        "executeIcon",
                        "executePosition",
                        "executeSubPosition",
                        "executeColour",
                        "controlItem",
                        "controlExecuteNorm",
                        "controlCheckNorm"
                      ]);
                      cloned.name = `${
                        cloned.name
                      }-${new Date().getTime()}-克隆`;
                      console.log("dr", cloned);
                      editPoint(cloned, resp => {
                        if (resp.success) {
                          message.success("克隆成功!");
                          handlePageChange(retriveValues);
                        } else {
                          message.error("操作失败！");
                        }
                      });
                    } else {
                      message.error("删除失败!");
                    }
                  });
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button>一键克隆</Button>
              </Popconfirm>
              <Popconfirm
                title="确定删除？"
                onConfirm={() => {
                  deletePoint(id, resp => {
                    const { handlePageChange, retriveValues } = this.props;
                    if (resp.success) {
                      message.success("删除成功!");
                      handlePageChange(retriveValues);
                    } else {
                      message.error("删除失败!");
                    }
                  });
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];
  }

  render() {
    const {
      loading,
      pagination: { pageNum, total },
      data,
      retriveValues: params,
      handlePageChange,
      updateRetriveValues
    } = this.props;
    console.log("data source", data);
    return (
      <div>
        <Table
          dataSource={data.map(record => ({ ...record, key: record.id }))}
          loading={loading}
          columns={this.columns}
          scroll={{ x: 1300 }}
          pagination={{
            pageSize: 20,
            current: Number(pageNum),
            total,
            onChange: current => {
              const currParams = { ...params, pageNum: current };
              updateRetriveValues(currParams);
              handlePageChange(currParams);
            },
            showTotal: total => `共${total}条记录`
          }}
        />
      </div>
    );
  }
}
PointList.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  updateRetriveValues: PropTypes.func,
  retriveValues: PropTypes.object
};
PointList.defaultProps = {
  loading: true,
  pageNum: 20,
  total: 100
};

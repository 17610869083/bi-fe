import React from "react";
import { Table, Popconfirm, Badge, Button, message } from "antd";
import EditRoleModal from "./editRoleModal";

class RoleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.columns = [
      {
        title: "英文角色名称",
        dataIndex: "roleName",
        width: 180,
        fixed: "left"
      },
      {
        title: "中文角色名称",
        dataIndex: "remarks"
      },
      {
        title: "创建时间",
        dataIndex: "createdAt"
      },
      {
        title: "修改时间",
        dataIndex: "updatedAt"
      },
      {
        title: "状态",
        dataIndex: "enabled",
        render: (text, record) => (
          <Badge
            status={record.enabled === 1 ? "success" : "error"}
            text={record.enabled === 1 ? "正常" : "禁用"}
          />
        )
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 280,
        fixed: "right",
        render: (text, record) => {
          const { enabled, id } = record;
          const roleEnabled = enabled === 1;
          return (
            <span>
              <EditRoleModal key={id} {...this.props} id={id} />
              <Popconfirm
                title="确定删除此角色吗?"
                onConfirm={() => this.delete(record)}
              >
                <Button size="small" icon="minus-circle">
                  删除
                </Button>
              </Popconfirm>
              <Popconfirm
                title="确定执行此操作吗?"
                onConfirm={() => this.changeStatus(id, roleEnabled)}
              >
                <Button
                  size="small"
                  icon={roleEnabled ? "check-circle" : "close-circle"}
                >
                  {roleEnabled ? `禁用` : `启用`}
                </Button>
              </Popconfirm>
            </span>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.getRoles();
  }
  edit(params) {
    this.props.editRole(params, (status) => {
      if (status === "success") {
        message.success("修改成功！");
        this.props.getRoles({ pageNum: this.props.pageNum });
      } else {
        message.error("角色信息修改失败！");
      }
    });
  }
  delete = record => {
    this.props.deleteRole(record.id, (status) => {
      if (status === "success") {
        message.success("您已删除角色：" + record.remarks);
        this.props.getRoles({ pageNum: this.props.pageNum });
      } else {
        message.error("抱歉，删除角色失败！");
      }
    });
  };
  changeStatus = (id, changed_runstatus) => {
    this.props.changeStatus(id, changed_runstatus, (status) => {
      if (status === "success") {
        message.success("操作成功！");
        this.props.getRoles({ pageNum: this.props.pageNum });
      }
    });
  };
  getRoles = (
    params = {
      pageNum: 1,
      pageSize: 10
    }
  ) => {
    this.setState({ loading: true });
    this.props.getRoles(params, () => {
      this.setState({ loading: false });
    });
  };
  render() {
    const { roles, total } = this.props;
    const dataSource = roles.map(item => ({ ...item, key: item.id }));
    return (
      <Table
        dataSource={dataSource}
        columns={this.columns}
        scroll={{ x: 1200 }}
        pagination={{
          total: total,
          onChange: current => {
            this.getRoles({ pageNum: current });
          }
        }}
        loading={this.state.loading}
      />
    );
  }
}

export default RoleList;

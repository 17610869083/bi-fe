import React from "react";
import {
  Table,
  Popconfirm,
  Badge,
  Button,
  Dropdown,
  Menu,
  message
} from "antd";
import { connect } from "react-redux";
import ManageUserEditForm from "../forms/ManageUserEditForm";

class EditableTableManageUser extends React.Component {
  state = { loading: false, isReset: false };

  componentDidMount() {
    this.getUsers({
      pageNum: 1,
      loginName: "",
      realName: ""
    });
  }
  getUsers(params) {
    this.props.getUsers(params);
  }

  changeStatus(record, changed_runstatus) {
    this.props.changeStatus(record.id, changed_runstatus, status => {
      if (status === "success") {
        message.success("操作成功！");
        this.getUsers({ pageNum: this.props.pageNum });
      }
    });
  }
  reset(id) {
    this.props.reset(id, status => {
      if (status === "success") {
        message.success("操作成功！");
        this.getUsers({ pageNum: this.props.pageNum });
      } else {
        message.warning("请用管理员来重置密码！");
      }
    });
  }
  render() {
    const { users, total, loading, agent_position = [] } = this.props;
    const dataSource = users.map(item => ({
      ...item,
      key: item.id,
      roles: []
    }));
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        width: 80,
        fixed: "left"
      },
      {
        title: "真实姓名",
        dataIndex: "realName",
        width: 120
      },
      {
        title: "手机号",
        dataIndex: "mobile",
        width: 120
      },
      {
        title: "创建时间",
        dataIndex: "createdAt"
      },
      {
        title: "身份",
        dataIndex: "type",
        render: (text, record) => {
          console.log(text);
          const typeObj =
            agent_position.find(item => {
              return Number(item.detailName) === record.type;
            }) || {};
          return typeObj.detailContent || "暂无身份";
        }
      },
      {
        title: "状态",
        dataIndex: "enabled",
        width: 80,
        render: enabled => (
          <Badge
            status={enabled == 1 ? "success" : "error"}
            text={enabled == 1 ? "正常" : "禁用中"}
          />
        )
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 330,
        fixed: "right",
        render: (text, record) => {
          console.log(text);
          return (
            <React.Fragment>
              <ManageUserEditForm
                key={record.id}
                {...this.props}
                id={record.id}
              />

              <Popconfirm
                title={`确定${record.enabled != 1 ? `启用` : `禁用`}此用户吗?`}
                onConfirm={() => this.changeStatus(record, record.enabled != 1)}
              >
                <Button
                  size="small"
                  icon={`${record.enabled != 1 ? "check" : "close"}-circle`}
                  style={{ marginLeft: 10 }}
                >
                  {record.enabled != 1 ? `启用` : `禁用`}
                </Button>
              </Popconfirm>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a onClick={() => this.reset(record.id)}>
                        重置密码（六个0）
                      </a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button size="small" icon="setting" style={{ marginLeft: 10 }}>
                  设置
                </Button>
              </Dropdown>
            </React.Fragment>
          );
        }
      }
    ];
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1200 }}
        pagination={{
          total,
          onChange: pageNum => {
            this.getUsers({ pageNum, type: this.props.type });
          },
          showTotal: total => `共 ${total} 用户`
        }}
        loading={loading}
      />
    );
  }
}
const mapStateToPorps = state => {
  return { ...state.adminUser, ...state.common.dicts };
};

export default connect(mapStateToPorps)(EditableTableManageUser);

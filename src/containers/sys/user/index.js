import React from "react";
import { Input, Form, Button, Divider } from "antd";
import EditableTableManageUser from "@/components/tables/EditableTableManageUser";
import ManageUserCreateForm from "@/components/forms/ManageUserCreateForm";
import DictSelect from "@/components/DictionarySelect";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUsers,
  getUserInfo,
  addUser,
  editUser,
  changeStatus,
  reset,
  getTree
} from "@/actions/sys/user";
import { getChildrens } from "@/actions/sys/dict";
import { getAllRole } from "@/actions/sys/role";
import { purifyValues } from "@/utils";

const SearchForm = Form.create()(props => {
  const { roles = [] } = props;
  const { getFieldDecorator } = props.form;
  console.log(props);
  return (
    <Form
      layout="inline"
      style={{ float: "left" }}
      onSubmit={e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
            console.log("ddd", values);
            values = purifyValues(values);
            props.getUsers(values);
          }
        });
      }}
    >
      <Form.Item>
        {getFieldDecorator("mobile")(
          <Input style={{ width: 200 }} placeholder="手机号" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("realName")(
          <Input style={{ width: 210 }} placeholder="真实姓名" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("types")(
          <DictSelect data={roles} placeholder="请选择身份" />
        )}
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" icon="search">
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
});

class ManageUserTables extends React.Component {
  state = {
    id: null,
    types: null
  };
  componentDidMount() {
    console.log("ddd", this.props);
    this.props.getAllRole();
    this.props.getChildrens();
    this.props.getTree();
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%",
            minHeight: 40,
            padding: "0 5px 10px",
            zIndex: 200
          }}
        >
          <SearchForm {...this.props} />
          <div className="toolbar_right" style={{ float: "right" }}>
            <ManageUserCreateForm {...this.props} />
          </div>
        </div>
        <Divider />
        <EditableTableManageUser type={this.state.types} {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToPorps = state => {
  return {
    ...state.adminUser,
    allRole: state.role.allRole || [],
    roles: state.common.dicts.agent_position
  };
};
const mapDispatchToProps = dispatch => ({
  getUsers: bindActionCreators(getUsers, dispatch),
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
  addUser: bindActionCreators(addUser, dispatch),
  editUser: bindActionCreators(editUser, dispatch),
  changeStatus: bindActionCreators(changeStatus, dispatch),
  getAllRole: bindActionCreators(getAllRole, dispatch),
  reset: bindActionCreators(reset, dispatch),
  getChildrens: bindActionCreators(getChildrens, dispatch),
  getTree: bindActionCreators(getTree, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(ManageUserTables);

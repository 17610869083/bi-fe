/**
 * 组件：系统管理用户信息列表页
 */
import React from "react";
import { Divider } from "antd";
import RoleList from "./table";
import ManageRoleCreateForm from "@/components/forms/ManageRoleCreateForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getRoles,
  getRoleInfo,
  addRole,
  editRole,
  deleteRole,
  changeStatus
} from "@/actions/sys/role";
import { getMenuTree } from "@/actions/sys/menu";

class ManageRoleTables extends React.Component {
  componentDidMount() {
    this.props.getMenuTree();
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ float: "right" }}>
          <ManageRoleCreateForm {...this.props} />
        </div>
        <Divider />
        <div>
          <RoleList {...this.props} newRecord={this.state} />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToPorps = state => {
  return { ...state.role, menu: state.menu.menu || [] };
};
const mapDispatchToProps = dispatch => ({
  getRoles: bindActionCreators(getRoles, dispatch),
  getRoleInfo: bindActionCreators(getRoleInfo, dispatch),
  addRole: bindActionCreators(addRole, dispatch),
  editRole: bindActionCreators(editRole, dispatch),
  deleteRole: bindActionCreators(deleteRole, dispatch),
  changeStatus: bindActionCreators(changeStatus, dispatch),
  getMenuTree: bindActionCreators(getMenuTree, dispatch)
});
export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(ManageRoleTables);

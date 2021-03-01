//统一管理所有的reducers，方便后期扩展维护

import { combineReducers } from "redux";
// 存放基础数据
import common from "./common";
// 登录
import login from "./login";

// 系统管理
import menu from "./sys/menu";
import role from "./sys/role";
import adminUser from "./sys/adminUser";
import dict from "./sys/dict";

// 配置中心
import group from "./config/group";
import banner from "./config/banner";
import holiday from "./config/holiday";
import operationLog from "./config/operationLog";
// 统计
import statSchool from "./statistics/school";
// 管控点
import points from "./controlPoint/points";

const rootReducer = combineReducers({
  common,
  login,
  menu,
  role,
  adminUser,
  dict,
  group,
  banner,
  holiday,
  statSchool,
  points,
  operationLog
});

export default rootReducer;

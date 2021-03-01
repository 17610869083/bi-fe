import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};

//获取分页用户数据
const getUsersHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `roles?${qsEncode({ ...defalutOptions, ...params })}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取用户详情
export const getUserHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `roles/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取所有用户数据
export const getAllUserHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: "roles",
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

export const getUsers = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getUsersHttp(params);
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "UPDATE_USER",
      data: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};

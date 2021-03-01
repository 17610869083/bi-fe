import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
const upUsers = data => ({
  type: "UPDATA_USERS",
  users: data.list,
  pageNum: data.pageNum,
  total: data.total
});

const open = () => ({
  type: "OPEN_LOADING"
});
const close = () => ({
  type: "CLOSE_LOADING"
});

const upChildren = data => ({
  type: "GET_TREE",
  children: data,
  position: data
});

export const getTree = () => dispatch => {
  request({
    type: "get",
    url: "region/tree",
    end: (status, response) => {
      console.log(response);
      if (status === "success") {
        dispatch(upChildren(response));
      }
    }
  });
};

export const getUsers = (params = {}) => dispatch => {
  dispatch(open());
  request({
    type: "get",
    url: `sys/user/list?${qsEncode({
      pageNum: 1,
      pageSize: 20,
      ...params
    })}`,
    end: (status, response) => {
      if (status === "success") {
        dispatch(upUsers(response));
        dispatch({
          type: "UPDATA_SEARCH_PARAM",
          realName: params.realName || ""
        });
      }
      dispatch(close());
    }
  });
};

export const getUserInfo = (key, callback) => () => {
  request({
    type: "get",
    url: `sys/user/${key}`,
    end: (status, response) => {
      if (status === "success") {
        if (callback) callback(status, response);
      }
    }
  });
};

export const addUser = (params, callback) => () => {
  request({
    type: "post",
    url: `sys/user`,
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const editUser = (params, callback) => () => {
  request({
    type: "put",
    url: `sys/user`,
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const reset = (id, callback) => () => {
  request({
    type: "put",
    url: `sys/user/${id}/password/init`,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

// 用户修改密码
export const updatePassword = (data, callback) => {
  request({
    type: "put",
    url: `sys/user/password`,
    data: JSON.stringify(data),
    end: status => {
      if (status === "success") {
        if (callback) callback({ success: true });
      } else {
        if (callback) callback({ success: false });
      }
    }
  });
};

export const changeStatus = (id, status, callback) => () => {
  request({
    type: "put",
    url: `sys/user/${id}/${status ? "enabled" : "disabled"}`,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

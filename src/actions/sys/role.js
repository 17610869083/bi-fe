import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
const upRoles = data => ({
  type: "UPDATA_ROLES",
  roles: data.list,
  pageNum: data.pageNum,
  total: data.total
});

const upAllRole = data => ({
  type: "UP_ALL_ROLE",
  allRole: data
});

export const getRoles = (params, callback) => dispatch => {
  request({
    type: "get",
    url: `sys/role/list?${qsEncode({
      pageNum: 1,
      pageSize: 10,
      ...params
    })}`,
    end: (status, response) => {
      if (status === "success") dispatch(upRoles(response));
      if (callback) callback(status, response);
    }
  });
};

export const getRoleInfo = (key, callback) => () => {
  request({
    type: "get",
    url: `sys/role/${key}`,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const addRole = (params, callback) => () => {
  request({
    type: "post",
    url: `sys/role`,
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const editRole = (params, callback) => () => {
  request({
    type: "post",
    url: `sys/role`,
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const deleteRole = (id, callback) => () => {
  request({
    type: "delete",
    url: `sys/role/${id}`,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const changeStatus = (id, status, callback) => () => {
  request({
    type: "put",
    url: `sys/role/${id}/${status ? "enabled" : "disabled"}`,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const getAllRole = () => dispatch => {
  request({
    type: "get",
    url: "sys/role/all",
    end: (status, response) => {
      if (status === "success") {
        dispatch(upAllRole(response));
      }
    }
  });
};

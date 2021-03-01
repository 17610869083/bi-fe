import { request } from "@/axios/tools";
const upDataMenuTree = data => ({
  type: "UPDATA_MENU_TREE",
  menuTree: data
});

export const getMenuTree = () => dispatch => {
  request({
    type: "get",
    url: "sys/menu/tree",
    end: (status, response) => {
      if (status === "success") {
        dispatch(upDataMenuTree(response));
      }
    }
  });
};
export const getMenuInfo = (key, callback) => () => {
  request({
    type: "get",
    url: `sys/menu/${key}`,
    end: (status, response) => {
      if (status === "success") {
        if (callback) callback(response);
        //dispatch(upDataInfo(response));
      }
    }
  });
};

export const updateMenuInfo = (params, callback) => () => {
  request({
    type: "post",
    url: `sys/menu`,
    data: {
      ...params,
      parentId: params.parentId === "top" ? "" : params.parentId
    },
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const deleteSelectedMenu = (key, callback) => () => {
  request({
    type: "delete",
    url: `sys/menu/${key}`,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

export const createMenu = (params, callback) => () => {
  if (params.parentId === "top") {
    delete params.parentId;
  }
  request({
    type: "post",
    url: "sys/menu",
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

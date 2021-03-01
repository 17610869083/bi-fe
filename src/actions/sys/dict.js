import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

let getParentsHttp;
let getChildrensHttp;
let editDictHttp;
let addParentHttp;
let deleteDictHttp;

const open = {
  type: "OPEN_LOADING"
};

const close = {
  type: "CLOSE_LOADING"
};

export const getParents = params => dispatch => {
  dispatch(open);
  if (getParentsHttp) {
    getParentsHttp();
    getParentsHttp = null;
  }
  getParentsHttp = request({
    url: `dict/list?${qsEncode({
      pageNum: 1,
      pageSize: 50,
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      dispatch(close);
      if (status === "success") {
        dispatch({
          type: "UPDATA_PARENTS",
          parentObj: {
            parents: response.list,
            pageNum: response.pageNum,
            total: response.total,
            dictName: params.dictName || ""
          }
        });
      }
    }
  });
};
export const addDict = (params, callback) => () => {
  if (addParentHttp) {
    addParentHttp();
    addParentHttp = null;
  }
  addParentHttp = request({
    url: "dict",
    type: "post",
    data: params,
    end: (status) => {
      if (status === "success") {
        if (callback) callback();
      }
    }
  });
};

export const editDict = (params, index, callback) => (dispatch, getState) => {
  if (editDictHttp) {
    editDictHttp();
    editDictHttp = null;
  }
  const parentObj = getState().dict.parentObj;
  const parents = [...parentObj.parents];
  parents[index] = { ...parents[index], ...params };
  editDictHttp = request({
    url: `dict`,
    type: "put",
    data: { ...params, id: parents[index].id },
    end: (status) => {
      if (status === "success") {
        dispatch({
          type: "UPDATA_PARENTS",
          parentObj: { ...parentObj, parents }
        });
        if (callback) callback();
      }
    }
  });
};

export const deleteDict = (id, callback) => () => {
  if (deleteDictHttp) {
    deleteDictHttp();
    deleteDictHttp = null;
  }
  deleteDictHttp = request({
    url: `dict/${id}`,
    type: "delete",
    end: (status) => {
      if (status === "success") {
        if (callback) callback();
      }
    }
  });
};

export const getChildrens = (dictName, callback) => dispatch => {
  console.log(dictName);
  if (getChildrensHttp) {
    getChildrensHttp();
    getChildrensHttp = null;
  }
  getChildrensHttp = request({
    url: `dict/item/${dictName}`,
    type: "get",
    end: (status, response) => {
      console.log(status, response);
      if (callback) callback(status, response, dispatch);
    }
  });
};

import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};
//获取分页集团数据
const getGroupsHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `blocinfos?${qsEncode({ ...defalutOptions, ...params })}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取集团详情
export const getGroupHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `blocinfos/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取所有集团数据
export const getAllGroupHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: "blocinfos",
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

// const deleteGroupHttp = id =>
//   new Promise(resole => {
//     request({
//       type: "delete",
//       url: `blocinfos/${id}`,
//       end: (status, response) => {
//         resole({ status, response });
//       }
//     });
//   });

export const getGroups = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getGroupsHttp(params);
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "UPDATA_GROUP",
      data: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};

export const editGroup = (params, callback) => {
  const type = params.id ? "put" : "post";
  request({
    type,
    url: "blocinfos",
    data: params,
    end: (status) => {
      if (status == "success") {
        callback && callback({ success: true });
      } else {
        callback && callback({ success: false });
      }
    }
  });
};

export const deleteGroup = (id, callback) => {
  request({
    type: "delete",
    url: `blocinfos/${id}`,
    end: (status) => {
      if (status == "success") {
        callback && callback({ success: true });
      } else {
        callback && callback({ success: false });
      }
    }
  });
};

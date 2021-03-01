import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

export const getPointList = params => dispatch => {
  console.log("params:", params);
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  dispatch({
    type: `OPEN_LOADING`
  });
  request({
    url: `controlpointbase/base?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");
        dispatch({
          type: `GET_POINT_LIST`,
          pointList: resp.list,
          pageNum: resp.pageNum,
          total: resp.total
        });
      }
      dispatch({
        type: `CLOSE_LOADING`
      });
    }
  });
};

// 获取管控点
export const getPoint = (id, cb) => {
  request({
    url: `controlpointbase/base/${id}`,
    type: "get",
    end: (status, response) => {
      if (status == "success") {
        cb && cb({ success: true, point: response });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};
// 编辑：包括新增
export const editPoint = (params, cb) => {
  const type = params.id ? "put" : "post";
  request({
    url: "controlpointbase/base",
    type,
    data: params,
    end: status => {
      if (status === "success") {
        cb && cb({ success: true });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};
// 删除
export const deletePoint = (id, cb) => {
  request({
    url: `controlpointbase/delete/${id}`,
    type: "delete",
    end: status => {
      if (status === "success") {
        cb && cb({ success: true });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};

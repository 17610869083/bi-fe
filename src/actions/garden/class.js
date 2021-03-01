import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

export const getClassList = params => dispatch => {
  // console.log("params:", params);
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  dispatch({
    type: `OPEN_LOADING`
  });
  request({
    url: `schoolclasses?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");

        dispatch({
          type: `GET_CLASS_LIST`,
          classList: resp.list,
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

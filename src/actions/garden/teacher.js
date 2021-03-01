import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

export const getTeacherList = params => dispatch => {
  // console.log("params:", params);
  params = {
    pageNum: 1,
    pageSize: 20,
    // 1是老师
    primaryIdentity: 1,
    ...params
  };
  dispatch({
    type: `OPEN_LOADING`
  });
  request({
    url: `schoolemploies?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");

        dispatch({
          type: `GET_TEACHER_LIST`,
          teacherList: resp.list,
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

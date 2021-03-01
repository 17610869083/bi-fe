import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
import { wechatUrl } from "@/config";

export const getStatSchoolList = params => dispatch => {
  console.log(params);
  dispatch({
    type: "OPEN_LOADING"
  });
  request({
    origin: wechatUrl,
    type: "get",
    url: `admin/stats/kindergarten/list?${qsEncode(params)}`,
    end: (status, resp) => {
      if (status === "success") {
        dispatch({
          type: "GET_SCHOOL_STAT_LIST",
          data: resp.list,
          pageNum: resp.pageNum,
          total: resp.total
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
    }
  });
};

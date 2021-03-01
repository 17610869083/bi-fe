import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};
const getParams = (state, params) => {
  return {
    schoolName: state.schoolName !== undefined ? state.schoolName : "",
    schoolIds: state.schoolIds !== undefined ? state.schoolIds : "",
    ...params
  };
};
//获取分页集团数据
const getPostersHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `poster?${qsEncode({ ...defalutOptions, ...params })}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

export const getPosters = params => async (dispatch, getState) => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getPostersHttp(getParams(getState(), params));
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "UPDATA_POSTER",
      data: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};

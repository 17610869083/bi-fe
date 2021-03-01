import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
import { wechatUrl } from "@/config";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};

//获取分页消息数据
const getTasksHttp = params =>
  new Promise(resolve => {
    request({
      origin: wechatUrl,
      type: "get",
      url: `admin/stats/messagetask/task?${qsEncode({
        ...defalutOptions,
        ...params
      })}`,
      end: (status, response) => {
        resolve({ status, response });
      }
    });
  });

export const getTasks = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getTasksHttp(params);
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "UPDATE_MSG_TASK",
      data: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};

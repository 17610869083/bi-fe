import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

export const getAnswerList = (qid, params = {}) => dispatch => {
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  dispatch({
    type: `OPEN_LOADING`
  });
  request({
    url: `answers/list/${qid}?${qsEncode(params)}`,
    end: (status, resp) => {
      if (status === "success") {
        dispatch({
          type: `GET_ANSWER_LIST`,
          answerList: resp.list,
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
export const getAnswer = id => dispatch => {
  request({
    url: `answers/${id}`,
    end: (status, resp) => {
      console.log("hello", resp);
      if (status === "success") {
        // console.log("hello success");
        dispatch({
          type: `GET_ANSWER`,
          currAnswer: resp
        });
      }
    }
  });
};
// 编辑回答：包括新增
export const editAnswer = (params, cb) => {
  const type = params.id ? "put" : "post";
  request({
    url: "answers",
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

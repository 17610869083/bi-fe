import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

export const getQuestionList = params => dispatch => {
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
    url: `questions?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");
        dispatch({
          type: `GET_QUESTION_LIST`,
          questionList: resp.list,
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
export const getQuestion = id => dispatch => {
  request({
    url: `questions/${id}`,
    end: (status, resp) => {
      console.log("hello", resp);
      if (status === "success") {
        // console.log("hello success");
        dispatch({
          type: `GET_QUESTION`,
          currQuestion: resp
        });
      }
    }
  });
};

// 编辑提问：包括新增
export const editQuestion = (params, cb) => {
  const type = params.id ? "put" : "post";
  request({
    url: "questions",
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

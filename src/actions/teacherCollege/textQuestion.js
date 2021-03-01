import { request } from "../../axios/tools";
// import { message } from "antd";

//获取试卷
export const getExamHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `exam/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
// 添加考试
// 查询考试题目
const getExamitemsHttps = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `examitems/list/${params}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const getExamList = params => async dispatch => {
  console.log(params, "params");
  dispatch({ type: "OPEN_LOADING" });
  const result = await getExamitemsHttps(params);
  console.log(result.status, "params");
  if (result.status === "success") {
    console.log(result, "result.response");
    dispatch({
      type: "GET_EXAM_LISTS",
      examList: result.response
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};
// 题目添加编辑
export const edidExamItem = (params, callback) => () => {
  console.log(params.id, "params.id");
  const isEdit = params.id ? true : false;
  console.log(isEdit, "params.id");
  request({
    type: isEdit ? "put" : "post",
    url: "examitems",
    data: params,
    end: (status, response) => {
      console.log(status, response, "params.id");
      if (status === "success") {
        callback && callback({ success: true });
      }
    }
  });
};
// 根据id获取详情
export const getExamHttpID = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `examitems/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
//删除题目
const deleteExamHttp = id =>
  new Promise(resole => {
    request({
      type: "delete",
      url: `examitems/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const deleteExam = params => async dispatch => {
  console.log(params, "deleteExamdeleteExam");
  const deleteResponse = await deleteExamHttp(params.id);
  if (deleteResponse.status === "success") {
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getExamitemsHttps(params.courseId);
    console.log(getResponse.response, "getResponsegetResponsegetResponse");
    if (getResponse.status === "success") {
      dispatch({
        type: "GET_EXAM_LISTS",
        examList: getResponse.response
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

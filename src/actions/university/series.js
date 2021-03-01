import { request } from "../../axios/tools";
import { qsEncode } from "@/utils";
import { message } from "antd";

const getCourseHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `course/page?${qsEncode(params)}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const getCourseList = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getCourseHttp(params);
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "GET_COURSE_LISTS",
      courseList: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};
//删除课程
const deleteCouresHttp = id =>
  new Promise(resole => {
    request({
      type: "delete",
      url: `course/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const deleteCoures = params => async dispatch => {
  console.log(params, "deleteCouresdeleteCoures");
  const deleteResponse = await deleteCouresHttp(params.id);
  if (deleteResponse.status === "success") {
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getCourseHttp({
      courseType: params.type !== undefined ? params.type : ""
    });
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "GET_COURSE_LISTS",
        courseList: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

export const editCourse = (params, callback) => () => {
  console.log(params.id, "params.id");
  const isEdit = params.id ? true : false;
  console.log(isEdit, "params.id");
  request({
    type: isEdit ? "put" : "post",
    url: "course",
    data: params,
    end: (status, response) => {
      console.log(status, response, "params.id");
      if (status === "success") {
        callback && callback({ success: true, res: response });
      }
    }
  });
};
//获取集团详情
export const getCourseHttpID = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `course/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

// 获取课前作业
const getQuestionHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `question/course/${params}`,
      end: (status, response) => {
        resole({ status, response });
        console.log(status, response, "1234567");
      }
    });
  });
export const getQuestionList = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getQuestionHttp(params);
  if (result.status === "success") {
    dispatch({
      type: "GET_QUESTION_LISTS",
      questionList: result.response
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};
//删除作业
const deleteQuestionHttp = id =>
  new Promise(resole => {
    request({
      type: "delete",
      url: `question/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const deleteQuestion = (id, courseID) => async dispatch => {
  // this.props.match.params.courseId
  const deleteResponse = await deleteQuestionHttp(id);
  if (deleteResponse.status === "success") {
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getQuestionHttp(courseID);
    if (getResponse.status === "success") {
      message.success("删除成功");
      dispatch({
        type: "GET_QUESTION_LISTS",
        questionList: getResponse.response
      });
    } else {
      message.success("删除失败");
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};
// 课前作业编辑修改
export const editQuestions = (params, callback) => () => {
  console.log(params.id, "params.id");
  const isEdit = params.id ? true : false;
  console.log(isEdit, "params.id");
  request({
    type: isEdit ? "put" : "post",
    url: "question",
    data: params,
    end: (status, response) => {
      console.log(status, response, "params.id");
      if (status === "success") {
        callback && callback({ success: true });
      }
    }
  });
};
//获取课前作业详情
export const getQuestionHttpIDs = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `question/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
// 获取幼儿园名称
export const getSchoolHttps = (params, callback) => {
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  request({
    url: `schoolinfos/schoollist/contition?${qsEncode({
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      if (status === "success") {
        if (callback) callback({ success: true, data: response });
      } else {
        if (callback) callback({ success: false, data: null });
      }
    }
  });
};
// 获取学生名称
export const getStudentHttps = (params, callback) => {
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  request({
    url: `studentinfos?${qsEncode({
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      if (status === "success") {
        if (callback) callback({ success: true, data: response });
      } else {
        if (callback) callback({ success: false, data: null });
      }
    }
  });
};

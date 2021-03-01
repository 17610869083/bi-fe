import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
//获取专题列表
const getTopicsHttp = (params, callback) => {
  request({
    url: `topic?${qsEncode({ pageNum: 1, pageSize: 20, ...params })}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//删除专题
const deleteTopicHttp = (id, callback) => {
  request({
    url: `topic/${id}`,
    type: "delete",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//获取专题详情
const getTopicHttp = (id, callback) => {
  request({
    url: `topic/${id}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//编辑专题
const editTopicHttp = (params, callback) => {
  request({
    url: "topic",
    type: "put",
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//添加专题
const addTopicHttp = (params, callback) => {
  request({
    url: "topic",
    type: "post",
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//获取所有专题数据
export const getAllTopicsHttp = callback => {
  request({
    url: "topic/list",
    type: "get",
    end: (status, response) => {
      callback && callback(status, response);
    }
  });
};

export const getTopic = (id, callback) => () => {
  getTopicHttp(id, (status, response) => {
    callback && callback(status, response);
  });
};

export const getTopics = params => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  getTopicsHttp(params, (status, response) => {
    if (status === "success") {
      dispatch({
        type: "UPDATA_TOPIC",
        data: response.list,
        pageNum: response.pageNum,
        total: response.total
      });
    }
    dispatch({
      type: "CLOSE_LOADING"
    });
  });
};

export const deleteTopic = id => (dispatch, getState) => {
  deleteTopicHttp(id, (status) => {
    if (status === "success") {
      dispatch({
        type: "OPEN_LOADING"
      });
      getTopicsHttp(
        {
          pageNum: getState().topic.pageNum || 1
        },
        (status, response) => {
          if (status === "success") {
            dispatch({
              type: "UPDATA_TOPIC",
              data: response.list,
              pageNum: response.pageNum,
              total: response.total
            });
          }
          dispatch({
            type: "CLOSE_LOADING"
          });
        }
      );
    }
  });
};

export const addTopic = (params, callback) => (dispatch, getState) => {
  addTopicHttp(params, (status) => {
    if (status === "success") {
      if (callback) callback();
      dispatch({
        type: "OPEN_LOADING"
      });
      getTopicsHttp(
        {
          pageNum: getState().topic.pageNum || 1
        },
        (status, response) => {
          if (status === "success") {
            dispatch({
              type: "UPDATA_TOPIC",
              data: response.list,
              pageNum: response.pageNum,
              total: response.total
            });
          }
          dispatch({
            type: "CLOSE_LOADING"
          });
        }
      );
    }
  });
};

export const editTopic = (params, callback) => (dispatch, getState) => {
  editTopicHttp(params, (status) => {
    if (status === "success") {
      if (callback) callback();
      dispatch({
        type: "OPEN_LOADING"
      });
      getTopicsHttp(
        {
          pageNum: getState().topic.pageNum || 1
        },
        (status, response) => {
          if (status === "success") {
            dispatch({
              type: "UPDATA_TOPIC",
              data: response.list,
              pageNum: response.pageNum,
              total: response.total
            });
          }
          dispatch({
            type: "CLOSE_LOADING"
          });
        }
      );
    }
  });
};

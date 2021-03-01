import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

// 获取文章列表页数据(分页)
export const fetchArticleList = params => (dispatch, getState) => {
  const {
    title,
    cid,
    topicId,
    module,
    pageNum,
    pageSize = 20
  } = getState().article;
  const data = { title, cid, topicId, module, pageNum, pageSize, ...params };
  request({
    type: "get",
    url: `article?${qsEncode(data)}`,
    end: (status, response) => {
      if (status === "success") {
        dispatch({
          type: "FETCH_ARTICLE_LIST",
          articleData: {
            data: response.list,
            pageNum: response.pageNum,
            total: response.total,
            title: data.title || "",
            cid: data.cid || "",
            topicId: data.topicId,
            module: data.topicId
          }
        });
      }
    }
  });
};
// 创建文章
export const createArticle = (params, callback) => {
  request({
    type: "post",
    url: "article",
    data: JSON.stringify(params),
    end: (status, response) => {
      callback && callback(status, response);
    }
  });
};
// 更新文章
export const updateArticle = (params, callback) => {
  request({
    type: "put",
    url: "article",
    data: JSON.stringify(params),
    end: (status, response) => {
      if (status === "success") {
        callback && callback(status, response);
      }
    }
  });
};
// 根据专题ID获取文章
export const fetchTopicArticle = (id, callback) => () => {
  request({
    type: "get",
    url: `article/topic/${id}/articles`,
    end: (status, response) => {
      callback && callback(status, response);
    }
  });
};
// 删除文章
export const deleteArticle = (id, callback) => {
  request({
    type: "delete",
    url: `article/${id}`,
    end: (status) => {
      if (status === "success") {
        callback && callback();
      }
    }
  });
};
// 根据id获取文章详情
export const fetchArticleDetail = (id, callback) => () => {
  request({
    type: "get",
    url: `article/${id}`,
    end: (status, response) => {
      callback && callback(status, response);
    }
  });
};

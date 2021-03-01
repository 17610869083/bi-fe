import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
// 根据module获取全部专题信息
export const fetchAllTopicListRequests = module =>
  new Promise(resole => {
    console.log(module);
    request({
      type: "get",
      url: `topic?module=${module}&pageSize=2000`,
      end: (status, response = {}) => {
        console.log(response);
        resole({
          status,
          response
        });
      }
    });
  });
export const getModule = () => dispatch => {
  request({
    type: "get",
    url: "dict/item/module",
    end: (status, res) => {
      console.log(status, res);
      status === "success" &&
        dispatch({
          type: "GET_MODULE",
          mod: res
        });
    }
  });
};
// cms_fields

export const getField = () => dispatch => {
  request({
    type: "get",
    url: "dict/item/cms_fields",
    end: (status, res) => {
      console.log(status, res);
      status === "success" &&
        dispatch({
          type: "GET_FIELDS",
          fields: res
        });
    }
  });
};

// 获取文章列表页数据(分页)
export const contentList = params => (dispatch, getState) => {
  console.log(params, "contentListcontentList");
  const { pageNum, pageSize = 20 } = getState().article;
  const data = {
    pageNum,
    pageSize,
    ...params
  };
  request({
    type: "get",
    url: `article?${qsEncode(data)}`,
    end: (status, response) => {
      if (status === "success") {
        console.log(response, "respones");
        dispatch({
          type: "GET_CONTENT_LIST",
          articleData: {
            data: response.list,
            pageNum: response.pageNum,
            total: response.total
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
  console.log(params);
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
      console.log(status, response);
      callback && callback(status, response);
    }
  });
};

// 获取分类数据(分页)
export const fetchCategoryList = params => dispatch => {
  request({
    type: "get",
    url: `category/?${qsEncode(params)}`,
    end: (status, response) => {
      if (status === "success") {
        dispatch({
          type: "FETCH_CATEGORY_LIST",
          categoryData: response
        });
      }
    }
  });
};

// 创建分类
export const createCategory = (params, callback) => {
  request({
    type: "post",
    url: "category/",
    data: JSON.stringify(params),
    end: (status) => {
      if (status === "success") {
        /* dispatch({
                    type: 'CREATE_CATEGORY',
                    data: response
                }) */
        callback && callback();
      }
    }
  });
};

// 更新分类
export const updateCategory = (params, callback) => {
  request({
    type: "put",
    url: "category/",
    data: JSON.stringify(params),
    end: (status) => {
      if (status === "success") {
        callback && callback();
      }
    }
  });
};

// 删除分类
export const deleteCategory = (id, callback) => () => {
  request({
    type: "delete",
    url: `category/${id}`,
    end: (status) => {
      if (status === "success") {
        /* 
                dispatch({
                    type: 'DELETE_CATEGORY',
                    data: response.data
                }) */
        callback && callback();
      }
    }
  });
};
// 根据id获取分类 直接请求
export const fetchCategoryDetailRequest = (id, callback) => {
  request({
    type: "get",
    url: `category/${id}`,
    end: (status, response = {}) => {
      if (status === "success") {
        // response.fields = response.fields ? JSON.parse(response.fields) : [];
        callback && callback(response);
        /* dispatch({
                    type: 'FETCH_CATEGORY_DETAIL',
                    data: response.data
                }) */
      }
    }
  });
};
// 根据module获取全部分类信息
// export const fetchAllCategoryListRequest = (modul, callback) => {
//    console.log("ddd",modul);
//     request({
//         type: 'get',
//         url: `category/module/${modul}`,
//         end: (status, response) => {
//             console.log(status, response)
//             callback && callback(status,response);
//         }
//     });
// }

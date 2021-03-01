import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

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
export const fetchAllCategoryListRequest = module =>
  new Promise(resole => {
    request({
      type: "get",
      url: `category/module/${module}`,
      end: (status, response = {}) => {
        console.log(response);
        resole({ status, response });
      }
    });
  });

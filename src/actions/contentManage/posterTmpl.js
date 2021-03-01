import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};

//获取分页集团数据
const getPostertmplsHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `postertmpl?${qsEncode({ ...defalutOptions, ...params })}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取集团详情
export const getPostertmplHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `postertmpl/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取所有集团数据
export const getAllPostertmplHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: "postertmpl",
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

const deletePostertmplHttp = id =>
  new Promise(resole => {
    request({
      type: "delete",
      url: `postertmpl/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

const addPostertmplHttp = params =>
  new Promise(resole => {
    request({
      type: "post",
      url: "postertmpl",
      data: params,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

const editPostertmplHttp = params =>
  new Promise(resole => {
    request({
      type: "put",
      url: "postertmpl",
      data: params,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

export const getPostertmpls = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getPostertmplsHttp(params);
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "UPDATA_HOLIDAY",
      data: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};

export const addPostertmpl = (params, callback) => async (
  dispatch
  ) => {
  const addResponse = await addPostertmplHttp(params);
  if (addResponse.status === "success") {
    callback && callback();
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getPostertmplsHttp();
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "UPDATA_HOLIDAY",
        data: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

export const editPostertmpl = (params, callback) => async (
  dispatch
) => {
  const editResponse = await editPostertmplHttp(params);
  if (editResponse.status === "success") {
    callback && callback();
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getPostertmplsHttp();
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "UPDATA_HOLIDAY",
        data: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

export const deletePostertmpl = id => async dispatch => {
  const deleteResponse = await deletePostertmplHttp(id);
  if (deleteResponse.status === "success") {
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getPostertmplsHttp();
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "UPDATA_HOLIDAY",
        data: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

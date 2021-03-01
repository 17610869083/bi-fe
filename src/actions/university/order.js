import { request } from "../../axios/tools";
import { qsEncode } from "@/utils";
import { message } from "antd";

//获取订单统计
export const getOrderHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: `order`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
// 查询订单
const getOrderHttps = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `order/page?${qsEncode(params)}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const getOrderList = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getOrderHttps(params);
  if (result.status === "success") {
    console.log(result.response, "bindActionCreators");
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "GET_ORDER_LISTS",
      orderList: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};
//删除订单
const deleteOrderHttp = id =>
  new Promise(resole => {
    request({
      type: "delete",
      url: `order/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const deleteCoures = id => async dispatch => {
  const deleteResponse = await deleteOrderHttp(id);
  if (deleteResponse.status === "success") {
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getOrderHttps();
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "GET_ORDER_LISTS",
        orderList: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};
// 批次列表
const getBatchHttps = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `card/page/batch?${qsEncode(params)}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const getBatchLists = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getBatchHttps(params);
  if (result.status === "success") {
    console.log(result.response, "bindActionCreators");
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "GET_BATCH_LISTS",
      batchList: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};
// 编码列表
const getBindHttps = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `card/page/bind?${qsEncode(params)}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const getBindList = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getBindHttps(params);
  if (result.status === "success") {
    console.log(result.response, "bindActionCreators");
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "GET_BIND_LISTS",
      bindList: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};
//获取当前卡批次
export const getBatchHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: `card/batch`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
//添加课程编码
const addBindHttp = params =>
  new Promise(resole => {
    request({
      type: "post",
      url: "card",
      data: params,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });
export const addBind = (params, callback) => async dispatch => {
  const addResponse = await addBindHttp(params);
  console.log(addResponse, "esponse");
  if (addResponse.status === "success") {
    callback && callback();
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getBindHttps();
    if (getResponse.status === "success") {
      message.success("添加成功");
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "GET_BIND_LISTS",
        bindList: list,
        pageNum,
        total
      });
    } else {
      message.error("添加失败");
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

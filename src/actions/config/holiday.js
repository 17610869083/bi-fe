import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};

//获取分页集团数据
const getHolidaysHttp = params =>
  new Promise(resole => {
    request({
      type: "get",
      url: `holidaymanage?${qsEncode({
        ...defalutOptions,
        ...params
      })}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取集团详情
export const getHolidayHttp = id =>
  new Promise(resole => {
    request({
      type: "get",
      url: `holidaymanage/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

//获取所有集团数据
export const getAllHolidayHttp = () =>
  new Promise(resole => {
    request({
      type: "get",
      url: "holidaymanage",
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

const deleteHolidayHttp = id =>
  new Promise(resole => {
    request({
      type: "delete",
      url: `holidaymanage/${id}`,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

const addHolidayHttp = params =>
  new Promise(resole => {
    request({
      type: "post",
      url: "holidaymanage",
      data: params,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

const editHolidayHttp = params =>
  new Promise(resole => {
    request({
      type: "put",
      url: "holidaymanage",
      data: params,
      end: (status, response) => {
        resole({ status, response });
      }
    });
  });

export const getHolidays = params => async (dispatch) => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getHolidaysHttp(params);
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

export const addHoliday = (params, callback) => async (dispatch) => {
  const addResponse = await addHolidayHttp(params);
  if (addResponse.status === "success") {
    callback && callback();
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getHolidaysHttp();
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

export const editHoliday = (params, callback) => async (dispatch) => {
  const editResponse = await editHolidayHttp(params);
  if (editResponse.status === "success") {
    callback && callback();
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getHolidaysHttp();
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

export const deleteHoliday = id => async (dispatch) => {
  const deleteResponse = await deleteHolidayHttp(id);
  if (deleteResponse.status === "success") {
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getHolidaysHttp();
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

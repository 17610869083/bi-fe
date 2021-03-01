import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

const defalutOptions = {
  pageNum: 1,
  pageSize: 20
};

//获取分页banner数据
const getBannersHttp = async params =>
  new Promise(resovle => {
    request({
      type: "get",
      url: `banner?${qsEncode({ ...defalutOptions, ...params })}`,
      end: (status, response) => {
        resovle({ status, response });
      }
    });
  });

//获取banner详情
export const getBannerHttp = id =>
  new Promise(resovle => {
    request({
      type: "get",
      url: `banner/${id}`,
      end: (status, response) => {
        resovle({ status, response });
      }
    });
  });

//获取所有banner数据
export const getAllBannerHttp = () =>
  new Promise(resovle => {
    request({
      type: "get",
      url: "banner",
      end: (status, response) => {
        resovle({ status, response });
      }
    });
  });

const deleteBannerHttp = id =>
  new Promise(resovle => {
    request({
      type: "delete",
      url: `banner/${id}`,
      end: (status, response) => {
        resovle({ status, response });
      }
    });
  });

const addBannerHttp = params =>
  new Promise(resovle => {
    request({
      type: "post",
      url: "banner",
      data: params,
      end: (status, response) => {
        resovle({ status, response });
      }
    });
  });

// const editBannerHttp = params => {
//   const isEdit = params.id ? true : false;
//   console.log("promise here");

//   return new Promise(resovle => {
//     request({
//       type: isEdit ? "put" : "post",
//       url: "banner",
//       data: params,
//       end: (status, response) => {
//         console.log("promise status", status);

//         resovle({ status, response });
//       }
//     });
//   });
// };

export const getBanners = params => async dispatch => {
  dispatch({ type: "OPEN_LOADING" });
  const result = await getBannersHttp(params);
  if (result.status === "success") {
    const { list, pageNum, total } = result.response;
    dispatch({
      type: "UPDATA_BANNER",
      data: list,
      pageNum,
      total
    });
  }
  dispatch({ type: "CLOSE_LOADING" });
};

export const addBanner = (params, callback) => async (dispatch, getState) => {
  const addResponse = await addBannerHttp(params);
  if (addResponse.status === "success") {
    callback && callback();
    console.log(getState());
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getBannersHttp();
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "UPDATA_BANNER",
        data: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

export const editBanner = (params, callback) => () => {
  console.log(params.id, "params.id");
  const isEdit = params.id ? true : false;
  request({
    type: isEdit ? "put" : "post",
    url: "banner",
    data: params,
    end: (status) => {
      if (status === "success") {
        callback && callback({ success: true });
      }
    }
  });
};

export const deleteBanner = id => async (dispatch, getState) => {
  const deleteResponse = await deleteBannerHttp(id);
  if (deleteResponse.status === "success") {
    console.log(getState());
    dispatch({ type: "OPEN_LOADING" });
    const getResponse = await getBannersHttp();
    if (getResponse.status === "success") {
      const { list, pageNum, total } = getResponse.response;
      dispatch({
        type: "UPDATA_BANNER",
        data: list,
        pageNum,
        total
      });
    }
    dispatch({ type: "CLOSE_LOADING" });
  }
};

import { request } from "@/axios/tools";
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = (params, cb) => () => {
  request({
    url: "auth/token",
    type: "post",
    data: JSON.stringify(params),
    end: (status, response) => {
      if (cb) cb(status, response);
    }
  });
};

/**
 * http通用工具函数
 */
import axios from "axios";
import { message } from "antd";
import Cookie from "js-cookie";

//
import { logout } from "@/utils";
import { adminUrl } from "@/config";
/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */

const CancelToken = axios.CancelToken;
message.config({
  top: 50,
  maxCount: 3
});
export const get = ({ url, msg = "接口异常", headers }) =>
  axios
    .get(url, headers)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      message.warn(msg.substring(0, 400));
    });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url, data, msg = "接口异常", headers }) =>
  axios
    .post(url, data, headers)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      message.warn(msg.substring(0, 400));
    });

export const request = options => {
  const {
    type = "get", //请求方式
    data, //数据体
    url, //请求地址
    end, //请求结束事件
    origin = adminUrl
  } = options;
  let status = "error";
  let response;
  let cancel;
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `${Cookie.get("Authorization")}`
    },
    cancelToken: new CancelToken(c => {
      cancel = c;
    })
  };
  axios({
    method: type,
    url: `${origin}/${url}`,
    data,
    ...config,
    timeout: 30000
  })
    .then(res => {
      console.log("then", res);

      switch (res.data.code) {
        case 0:
          status = "success";
          response = res.data.data;
          break;
        // 账号
        case 30102:
          response = { msg: res.data.error_description };
          break;
        case 401:
          logout();
          break;
        default:
          message.warning(
            (res.data && res.data.msg && res.data.msg.substring(0, 400)) ||
              "接口错误！"
          );
          break;
      }
    })
    .catch(err => {
      if (!axios.isCancel(err)) {
        if (err.response && err.response.status === 401) {
          logout();
        } else if (err.response && err.response.status === 400) {
          // 临时措施，严格来说返回的code码不对
          response = { msg: "账号或密码有误！" };
        } else {
          message.error(err.toString().substring(0, 400));
        }
      }
    })
    .then(() => {
      end(status, response);
    });
  return cancel;
};

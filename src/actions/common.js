import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";

// 批量获取字典数据
const fetchAllDicts = cb => {
  request({
    type: "get",
    url: `dict/cache`,
    end: (status, response) => {
      console.log("resp", response);

      if (status === "success") {
        console.log("dicts", response);
        cb && cb({ success: true, data: response });
      } else {
        cb && cb({ success: false, data: null });
      }
    }
  });
};

// 全部客服列表
const getCSers = cb => {
  request({
    type: "get",
    url: "schoolinfos/customer",
    end: (status, res) => {
      console.log(status, res);
      status === "success" && cb && cb(res);
    }
  });
};
// 省市县数据
const getAddress = cb => {
  request({
    type: "get",
    url: "region/tree",
    end: (status, response) => {
      console.log(response);

      if (status === "success") {
        cb && cb(response);
      }
    }
  });
};
// 代理商
export const getAllAgent = () => dispatch => {
  const params = qsEncode({
    types: "4,8",
    pageSize: 2000
  });
  request({
    type: "get",
    url: `sys/user/list?${params}`,
    end: (status, res) => {
      console.log(status, res);
      status === "success" &&
        dispatch({
          type: "UPDATE_COMMON_AGENTS",
          agents: res.list
        });
    }
  });
};
// 根据名称获取代理商
export const getAgentsByName = (name, cb) => {
  const params = qsEncode({
    realName: name,
    types: "4,8",
    pageSize: 2000
  });
  request({
    type: "get",
    url: `sys/user/list?${params}`,
    end: (status, response) => {
      if (status === "success") {
        if (cb) cb({ success: true, data: response });
      } else {
        if (cb) cb({ success: false, data: null });
      }
    }
  });
};
export const initCommonData = () => dispatch => {
  // 省市县数据
  getAddress(resp => {
    dispatch({
      type: "GET_COMMON_ADDRESS",
      address: resp
    });
  });
  // 所有页面用到的字典数据，都在这里添加
  fetchAllDicts(resp => {
    console.log("data", resp);

    dispatch({
      type: "UPDATE_COMMON_DICTS",
      dicts: resp.data
    });
  });

  // 获取所有的客服信息
  getCSers(res => {
    dispatch({
      type: "GET_COMMON_CSERS",
      CSers: res
    });
  });
};

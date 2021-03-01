import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
import { wechatUrl } from "@/config";
//获取专题列表
export const getWxsHttp = (params, callback) => {
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  request({
    url: `wechatinfos?${qsEncode({
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      if (status === "success") {
        if (callback) callback({ success: true, data: response });
      } else {
        if (callback) callback({ success: false, data: null });
      }
    }
  });
};
export const updateWx = (params, callback) => {
  request({
    url: `wechatinfos`,
    data: params,
    type: "put",
    end: (status, response) => {
      if (status === "success") {
        callback && callback({ success: true, data: response });
      } else {
        callback && callback({ success: false, data: response });
      }
    }
  });
};
export const updateWxLogo = (params, callback) => {
  request({
    origin: wechatUrl,
    url: `weixin/openplatform/uploadlogo`,
    data: params,
    type: "post",
    end: (status, response) => {
      if (status === "success") {
        callback && callback({ success: true, data: response });
      } else {
        callback && callback({ success: false, data: response });
      }
    }
  });
};
export const allSetWx = (appid, schoolId, cb) => {
  request({
    origin: wechatUrl,
    url: `weixin/wechat/configure/${appid}/${schoolId}`,
    type: "get",
    end: (status, response) => {
      if (status === "success") {
        cb && cb({ success: true, data: response });
      } else {
        cb && cb({ success: false, data: response });
      }
    }
  });
};

export const getWxs = params => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  getWxsHttp(params, resp => {
    if (resp.success) {
      dispatch({
        type: "GET_WX_DATA",
        data: resp.data.list,
        pageNum: resp.data.pageNum,
        total: resp.data.total
      });
    }
    dispatch({
      type: "CLOSE_WX_LOADING"
    });
  });
};

//获取公众号配置菜单列表
export const getWxMenu = (appid, callback) => {
  request({
    origin: wechatUrl,
    url: `weixin/menu/conf/${appid}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

//创建菜单
export const createMenu = (params, callback) => {
  const {
    menu: { button },
    appid
  } = params;
  request({
    origin: wechatUrl,
    url: `weixin/menu/conf`,
    data: {
      appid,
      menu: button
    },
    type: "post",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

const getMaterial = (params, callback) => {
  let appid = params && params.appid;
  let offset = params && params.offset;
  let count = params && params.count;
  request({
    origin: wechatUrl,
    url: `/weixin/material/get/${appid}/news/${offset}/${count}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

//获取公众号管理素材  图文
export const getMaterialData = params => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  getMaterial(params, (status, response) => {
    if (status === "success") {
      dispatch({
        type: "GET_MATERIAL_DATA",
        materialData: {
          type: response.type,
          data: response.item,
          item_count: response.item_count,
          total_count: response.total_count
        }
      });
      dispatch({
        type: "CLOSE_WX_LOADING"
      });
    }
  });
};

const getMaterialImg = (params, callback) => {
  const { appid, offset, count } = params;
  request({
    origin: wechatUrl,
    url: `weixin/material/get/${appid}/image/${offset}/${count}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//获取公众号管理素材 图片
export const getMaterialImgData = params => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  getMaterialImg(params, (status, response) => {
    if (status === "success") {
      dispatch({
        type: "GET_MATERIALIMG_DATA",
        materialImgData: {
          data: response.item,
          item_count: response.item_count,
          total_count: response.total_count
        }
      });
      dispatch({
        type: "CLOSE_WX_LOADING"
      });
    }
  });
};

const industry = (appid, callback) => {
  request({
    origin: wechatUrl,
    url: `/weixin/template/industry/get/${appid}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
// 展示行业
export const getIndustry = appid => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  industry(appid, (status, response) => {
    if (status === "success") {
      dispatch({
        type: "GET_INDUSTRY",
        industry: response
      });
      dispatch({
        type: "CLOSE_WX_LOADING"
      });
    }
  });
};

const content = (appid, callback) => {
  request({
    origin: wechatUrl,
    url: `/weixin/template/get/${appid}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//获取模版列表内容
export const getTemplateContent = appid => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  content(appid, (status, response) => {
    if (status === "success") {
      dispatch({
        type: "GET_MODULE_CONTENT",
        moduleContent: response[0].template_list
      });
      dispatch({
        type: "CLOSE_WX_LOADING"
      });
    }
  });
};

const userList = (appid, callback) => {
  request({
    origin: wechatUrl,
    url: `/weixin/user/list/${appid}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//获取用户列表
export const getUserList = appid => dispatch => {
  dispatch({
    type: "OPEN_LOADING"
  });
  userList(appid, (status, response) => {
    if (status === "success") {
      dispatch({
        type: "GET_USER_LIST",
        userList: response
      });
      dispatch({
        type: "CLOSE_WX_LOADING"
      });
    }
  });
};

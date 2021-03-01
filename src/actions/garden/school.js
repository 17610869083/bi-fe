import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";
import { pick } from "lodash";
import { message } from "antd";

const upChildren = data => ({
  type: "GET_TREE",
  position: data
});
const LARGE_PAGE_SIZE = 20000;

// 获取所有园所
export const fetchAllSchools = (params, callback) => {
  const { isPaid = true } = params;
  delete params.isPaid;
  const qs = qsEncode({
    ...params,
    pageNum: 1,
    pageSize: LARGE_PAGE_SIZE
  });
  const url = isPaid ? `schoolinfos/ispaid/school?${qs}` : `schoolinfos?${qs}`;
  request({
    url,
    type: "get",
    end: (status, resp) => {
      if (status === "success") {
        callback && callback({ success: true, data: resp.list });
      } else {
        callback && callback({ success: false, data: null });
      }
    }
  });
};
// 已付费圆所列表
const getPaidSchoolsHttp = (params, callback) => {
  request({
    url: `schoolinfos/ispaid/school?${qsEncode({
      pageNum: 1,
      pageSize: 20,
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
export const getPaidSchools = params => dispatch => {
  console.log(params);
  dispatch({
    type: "OPEN_LOADING"
  });
  getPaidSchoolsHttp(params, (status, response) => {
    console.log(response);
    if (status === "success") {
      dispatch({
        type: "UPDATA_SCHOOL",
        data: response.list,
        pageNum: response.pageNum,
        total: response.total
      });
    }
    dispatch({
      type: "CLOSE_LOADING"
    });
  });
};
// 省市级联
export const getTree = () => dispatch => {
  request({
    type: "get",
    url: "region/tree",
    end: (status, response) => {
      console.log(response);
      if (status === "success") {
        dispatch(upChildren(response));
      }
    }
  });
};
//申请退费
export const applyRefund = (params, cb) => () => {
  request({
    url: "schoolpayment/ispaid",
    type: "put",
    data: params,
    end: (status) => {
      if (status === "success") {
        if (cb) cb({ success: true });
      } else {
        if (cb) cb({ success: false });
      }
    }
  });
};

//获取专题列表
const getParams = (state, params) => {
  console.log(
    pick({ ...state(), ...params }, [
      "pageNum",
      "name",
      "status",
      "type",
      "provinceId",
      "cityId",
      "customerId",
      "openStatus",
      "agentId",
      "familyColleage",
      "schoolId"
    ])
  );
  return pick({ ...state(), ...params }, [
    "pageNum",
    "name",
    "status",
    "type",
    "provinceId",
    "cityId",
    "customerId",
    "openStatus",
    "agentId",
    "familyColleage",
    "schoolId"
  ]);
};

const getSchoolsHttp = (params, callback) => {
  console.log(params);
  request({
    url: `schoolinfos?${qsEncode({
      pageNum: 1,
      pageSize: 20,
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      console.log(response);
      if (callback) callback(status, response);
    }
  });
};
//删除专题
const deleteSchoolHttp = (schoolId, callback) => {
  request({
    url: `schoolinfos`,
    type: "put",
    data: { status: 2, schoolId },
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};
//获取管理详情
const getManagementHttp = (id, callback) => {
  request({
    url: `schoolemploies/${id}`,
    type: "get",
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

//编辑管理
const editSchoolemploies = (params, callback) => {
  request({
    url: "schoolemploies/admin",
    type: "put",
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

//创建园所
export const createSchool = async params =>
  new Promise(resovle => {
    request({
      type: "post",
      url: `schoolinfos`,
      data: params,
      end: (status, response) => {
        if (status == "success") {
          resovle({ success: true, data: response });
        } else {
          resovle({ success: false, data: null });
        }
      }
    });
  });
//创建管理员
export const createSchoolAdmin = async params =>
  new Promise(resovle => {
    request({
      type: "post",
      url: `schoolemploies/admin`,
      data: params,
      end: (status, response) => {
        if (status == "success") {
          resovle({ success: true, data: response });
        } else {
          resovle({ success: false, data: null });
        }
      }
    });
  });

//获取跟踪记录集合
const getTracks = (id, callback) => {
  request({
    url: `schoolaction/${id}`,
    type: "get",
    end: (status, response) => {
      console.log(response);

      callback && callback(status, response);
    }
  });
};
//添加跟踪记录
const addTrack = (params, callback) => {
  request({
    url: "schoolaction",
    type: "post",
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

//查询管理员
const getScloolemploiesHttp = (params, callback) => {
  console.log(params, callback);
  request({
    url: `schoolemploies?${qsEncode({
      pageNum: 1,
      pageSize: 20,
      ...params
    })}`,
    type: "get",
    end: (status, response) => {
      console.log(status, response);
      if (callback) callback(status, response);
    }
  });
};
//查询管理员
export const getSchoolemploies = params => dispatch => {
  dispatch({
    type: "ADMIN_LIST_LOADING"
  });
  getScloolemploiesHttp(params, (status, response) => {
    console.log(status, response);
    if (status === "success") {
      dispatch({
        type: "GET_SCHOOLEMPLOIES",
        admins: response.list,
        adminPageNum: response.pageNum,
        adminTotal: response.total
      });
      dispatch({
        type: "ADMIN_LIST_LOADING_CLOSE"
      });
    }
  });
};

//添加管理员
const addSchoolemploiesHttp = (params, callback) => {
  request({
    url: "schoolemploies/admin",
    type: "post",
    data: params,
    end: (status, response) => {
      if (callback) callback(status, response);
    }
  });
};

//添加管理员

export const addSchoolemploies = (params, callback) => (dispatch, getState) => {
  console.log(params);
  addSchoolemploiesHttp(params, (status, response) => {
    console.log(response);
    if (status === "success") {
      if (callback) callback();
      dispatch({
        type: "OPEN_LOADING"
      });
      getScloolemploiesHttp(
        getSchoolemploiess(getState, params),
        (status, response) => {
          console.log(status, response);
          if (status === "success") {
            message.success("添加成功");
            dispatch({
              type: "GET_SCHOOLEMPLOIES",
              admins: response.list,
              pageNum: response.pageNum,
              total: response.total
            });
          }
          dispatch({
            type: "CLOSE_LOADING"
          });
        }
      );
    }
  });
};
// 编辑管理员
export const editSchoolemploiesManges = (params, callback) => (
  dispatch,
  getState
) => {
  editSchoolemploies(params, (status) => {
    if (status === "success") {
      if (callback) callback();
      dispatch({
        type: "OPEN_LOADING"
      });
      getScloolemploiesHttp(
        getSchoolemploiess(getState, params),
        (status, response) => {
          if (status === "success") {
            message.success("更新成功");
            dispatch({
              type: "UPDATA_SCHOOLEMPLOIESS",
              admins: response.list,
              pageNum: response.pageNum,
              total: response.total
            });
          }
          dispatch({
            type: "CLOSE_LOADING"
          });
        }
      );
    }
  });
};
export const getSchool = (id, callback) => {
  request({
    url: `schoolinfos/${id}`,
    type: "get",
    end: (status, response) => {
      if (status == "success") {
        callback && callback({ success: true, school: response });
      } else {
        callback && callback({ success: false });
      }
    }
  });
};
// 根据id获取详情
export const getManagement = (id, callback) => () => {
  getManagementHttp(id, (status, response) => {
    callback && callback(status, response);
  });
};
export const getTracksBySchoolId = (id, callback) => dispatch => {
  getTracks(id, (status, response) => {
    callback && callback(status, response);
    console.log("tracks", response);

    dispatch({
      type: "GET_SCHOOL_TRACKS",
      trackData: response
    });
  });
};

export const addTrackBySchool = (params, callback) => dispatch => {
  addTrack(params, (status, response) => {
    if (status === "success") {
      if (callback) callback();
      dispatch({
        type: "OPEN_LOADING"
      });
      console.log("add track:", response);
      getTracks(response.schoolId, (status, response) => {
        console.log("newest tracks", response);
        if (status === "success") {
          dispatch({
            type: "GET_SCHOOL_TRACKS",
            trackData: response
          });
        }
        dispatch({
          type: "CLOSE_LOADING"
        });
      });
    }
  });
};
// 根据园所ID获取财务记录
export const getPaymentBySchoolId = (id, callback) => dispatch => {
  request({
    url: `schoolpayment?schoolId=${id}`,
    type: "get",
    end: (status, response) => {
      callback && callback(status, response);
      console.log("payment", response);

      dispatch({
        type: "GET_SCHOOL_PAYMENT",
        payment: response.list
      });
    }
  });
};
//新增财务记录
export const editPayment = (params, cb) => () => {
  const type = params.id ? "put" : "post";
  request({
    url: "schoolpayment",
    type,
    data: params,
    end: (status) => {
      if (status === "success") {
        cb && cb({ success: true });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};
export const getSchools = params => dispatch => {
  console.log(params);
  dispatch({
    type: "OPEN_LOADING"
  });
  getSchoolsHttp(params, (status, response) => {
    console.log(response);
    if (status === "success") {
      dispatch({
        type: "UPDATA_SCHOOL",
        data: response.list,
        pageNum: response.pageNum,
        total: response.total
      });
    }
    dispatch({
      type: "CLOSE_LOADING"
    });
  });
};

export const deleteSchool = id => (dispatch, getState) => {
  deleteSchoolHttp(id, (status) => {
    if (status === "success") {
      dispatch({
        type: "OPEN_LOADING"
      });
      getSchoolsHttp(getParams(getState), (status, response) => {
        if (status === "success") {
          dispatch({
            type: "UPDATA_SCHOOL",
            data: response.list,
            pageNum: response.pageNum,
            total: response.total
          });
        }
        dispatch({
          type: "CLOSE_LOADING"
        });
      });
    }
  });
};

// 批量分配客服
export const batchAssign = (params, callback) => {
  request({
    url: "schoolinfos/allotcustomer",
    type: "put",
    data: params,
    end: status => {
      if (status === "success") {
        callback && callback({ success: true });
      } else {
        callback && callback({ success: false });
      }
    }
  });
};
// 更新管理员delFlag
export const updateAdminDelFlag = (params, callback) => {
  const { roleId, delFlag } = params;
  request({
    url: `schoolemploies/${roleId}/${delFlag}`,
    type: "put",
    end: status => {
      if (status === "success") {
        callback && callback({ success: true });
      } else {
        callback && callback({ success: false });
      }
    }
  });
};

// 编辑学校：包括新增
export const editSchool = (params, callback) => {
  const type = params.schoolId ? "put" : "post";
  request({
    url: "schoolinfos",
    type,
    data: params,
    end: status => {
      if (status === "success") {
        callback && callback({ success: true });
      } else {
        callback && callback({ success: false });
      }
    }
  });
};

const getSchoolemploiess = (state, params) => {
  console.log(
    pick({ ...state(), ...params }, ["pageNum", "name", "status", "type"])
  );
  return pick({ ...state(), ...params }, ["schoolId", "primaryIdentity"]);
};

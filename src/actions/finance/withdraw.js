import { request } from "../../axios/tools";
import { qsEncode } from "@/utils";

const LARGE_PAGE_SIZE = 20000;

// 获取所有提现
export const fetchAllWithdraws = (params, cb) => {
  const qs = qsEncode({
    ...params,
    pageNum: 1,
    pageSize: LARGE_PAGE_SIZE
  });
  const url = `agentwithdrawrecord?${qs}`;
  request({
    url,
    type: "get",
    end: (status, resp) => {
      if (status === "success") {
        cb && cb({ success: true, data: resp.list });
      } else {
        cb && cb({ success: false, data: null });
      }
    }
  });
};

export const getApplyList = params => dispatch => {
  // console.log("params:", params);
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  dispatch({
    type: `OPEN_LOADING`
  });
  request({
    url: `agentwithdrawrecord?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");

        dispatch({
          type: `GET_APPLY_LIST`,
          applyList: resp.list,
          pageNum: resp.pageNum,
          total: resp.total
        });
      }
      dispatch({
        type: `CLOSE_LOADING`
      });
    }
  });
};

export const getCurrSchools = (recordId, cb) => dispatch => {
  // const { recordId } = params;
  dispatch({
    type: `LOADING_CURR_AGENT_SCHOOLS`
  });
  request({
    url: `agentwithdrawrecord/school/${recordId}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");

        dispatch({
          type: `GET_CURR_AGENT_SCHOOLS`,
          currAgentSchools: resp
        });
        cb && cb();
      }
      dispatch({
        type: `LOADED_CURR_AGENT_SCHOOLS`
      });
    }
  });
};

export const payToAgent = (params, cb) => () => {
  request({
    type: "put",
    url: `agentwithdrawrecord/payment`,
    data: params,
    end: (status) => {
      if (status == "success") {
        // console.log("pay to agent resp data", resp);

        cb && cb({ success: true });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};

export const getWithdrawDetails = (params, cb) => {
  request({
    type: "get",
    url: `agentwithdrawrecord/maidinfo?${qsEncode(params)}`,
    end: (status, resp) => {
      if (status == "success") {
        console.log("detail data", resp);

        cb && cb({ success: true, list: resp });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};

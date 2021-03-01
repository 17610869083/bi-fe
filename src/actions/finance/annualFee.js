import { request } from "../../axios/tools";
import { qsEncode } from "@/utils";
export const getOrderList = params => dispatch => {
  console.log("params:", params);
  params = {
    pageNum: 1,
    pageSize: 20,
    ...params
  };
  dispatch({
    type: `OPEN_LOADING`
  });
  request({
    url: `schoolorder?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");
        dispatch({
          type: `GET_SCHOOL_ORDER_LIST`,
          orderList: resp.list,
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
//获取所有年费
export const fetchAllFees = (params, cb) => {
  console.log("params:", params);
  params = {
    pageNum: 1,
    ...params,
    pageSize: 200000
  };
  request({
    url: `schoolorder?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");
        cb && cb({ success: true, data: resp.list });
      } else {
        cb && cb({ success: false, data: null });
      }
    }
  });
};

export const getSchoolsByName = (name, cb) => () => {
  request({
    url: `schoolinfos?name=${name}`,
    end: (status, resp) => {
      if (status == "success") {
        // console.log("pay to agent resp data", resp);

        cb && cb({ success: true, data: resp.list });
      } else {
        cb && cb({ success: false });
      }
    }
  });
};

export const bindSchool = (params, cb) => () => {
  request({
    type: "put",
    url: `schoolorder/school`,
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

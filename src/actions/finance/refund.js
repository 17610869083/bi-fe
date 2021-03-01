import { request } from "../../axios/tools";
import { qsEncode } from "@/utils";

export const getRefundList = params => dispatch => {
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
    url: `schoolpayment/refund?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");

        dispatch({
          type: `GET_REFUND_APPLY_LIST`,
          refundList: resp.list,
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
export const updatePaymentStatus = (params, cb) => () => {
  request({
    url: `schoolpayment/ispaid`,
    type: "put",
    data: params,
    end: (status) => {
      if (status === "success") {
        cb && cb({ success: true });
        return;
      }
      cb && cb({ success: false });
    }
  });
};

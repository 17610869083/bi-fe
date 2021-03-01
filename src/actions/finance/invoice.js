import { request } from "../../axios/tools";
import { qsEncode } from "@/utils";

export const getInvoiceList = params => dispatch => {
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
    url: `applyinvoices?${qsEncode(params)}`,
    end: (status, resp) => {
      // console.log("hello", resp.list);
      if (status === "success") {
        // console.log("hello success");
        dispatch({
          type: `GET_INVOICE_LIST`,
          invoiceList: resp.list,
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

export const editInvoice = (params, callback) => {
  request({
    url: "applyinvoices",
    type: "put",
    data: params,
    end: (status, res) => {
      console.log(res, "resresres");
      if (status === "success") {
        callback && callback({ success: true, data: res });
      } else {
        callback && callback({ success: false, data: "" });
      }
    }
  });
};
const LARGE_PAGE_SIZE = 20000;

// 批量导出
export const fetchAllInvoice = (params, callback) => {
  // const { isPaid = true } = params;
  // delete params.isPaid;
  const qs = qsEncode({
    ...params,
    pageNum: 1,
    pageSize: LARGE_PAGE_SIZE
  });
  // const url = isPaid ? `schoolinfos/ispaid/school?${qs}` : `schoolinfos?${qs}`;
  request({
    url: `applyinvoices?${qs}`,
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

import { request } from "@/axios/tools";
import { qsEncode } from "@/utils";


export const getOperationLog = params => dispatch => {
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
    url: `usroperationlog/page?${qsEncode(params)}`,
    end: (status, resp) => {
      console.log(resp, "this.props");
      if (status === "success") {
        dispatch({
          type: `GET_OPERATION_LIST`,
          operationList: resp.list,
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
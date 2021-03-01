const operationLog = (
  state = {
    loading: false,
    pageNum: 1,
    total: 100,
    // operationList: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_OPERATION_LIST": {
      console.log("this.props", state, action);
      return {
        ...state,
        operationList: action.operationList,
        pageNum: action.pageNum,
        total: action.total
      };
    }

    case "OPEN_LOADING":
      return { ...state, loading: true };
    case "CLOSE_LOADING":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
export default operationLog;

const group = (
  state = {
    loading: false,
    data: [],
    pageNum: 1,
    total: 1
  },
  action
) => {
  switch (action.type) {
    case "UPDATA_GROUP":
      return {
        ...state,
        data: action.data,
        pageNum: action.pageNum,
        total: action.total
      };
    case "OPEN_LOADING":
      return { ...state, loading: true };
    case "CLOSE_LOADING":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
export default group;

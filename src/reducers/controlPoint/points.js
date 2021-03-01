const points = (
  state = {
    loading: false,
    pageNum: 1,
    total: 100,
    pointList: []
  },
  action
) => {
  switch (action.type) {
    case "GET_POINT_LIST": {
      const { pointList, pageNum, total } = action;
      console.log("reducer", state, action);
      return {
        ...state,
        pointList,
        pageNum,
        total
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
export default points;

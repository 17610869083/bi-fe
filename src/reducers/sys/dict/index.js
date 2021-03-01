const dict = (
  state = {
    parentObj: {
      parents: [],
      pageNum: 1,
      total: 1
    },
    childrenObj: {
      childrens: [],
      pageNum: 1,
      total: 1
    },
    dicts: {},
    loading: false
  },
  action
) => {
  switch (action.type) {
    case "FETCH_DICTS":
      return { ...state, dicts: action.dicts || {} };
    case "UPDATA_PARENTS":
      return { ...state, parentObj: action.parentObj || {} };
    case "UPDATA_DETAILS":
      return { ...state, details: action.details || [] };
    case "OPEN_LOADING":
      return { ...state, loading: true };
    case "CLOSE_LOADING":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
export default dict;

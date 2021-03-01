const statSchool = (
  state = {
    loading: false,
    pageNum: 1,
    total: 100,
    statSchoolList: []
  },
  action
) => {
  switch (action.type) {
    case "GET_SCHOOL_STAT_LIST": {
      let { data: statSchoolList, pageNum, total } = action;
      // console.log("reducer", state, action);
      return {
        ...state,
        statSchoolList,
        pageNum,
        total
      };
    }
    case "GET_SCHOOL_STAT_ALL": {
      let { currAllList } = action;
      return {
        ...state,
        currAllList
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
export default statSchool;

const adminUser = (
  state = {
    users: [],
    pageNum: 1,
    total: 0,
    info: {},
    loginName: "",
    realName: "",
    types: "",
    id: "",
    loading: false,
    children: [],
    position: []
  },
  action
) => {
  switch (action.type) {
    case "UPDATA_USERS":
      return {
        ...state,
        users: action.users || [],
        pageNum: Number(action.pageNum),
        total: Number(action.total)
      };
    case "GET_TREE":
      return {
        ...state,
        children: action.children || []
      };
    case "GET_POSITION":
      return {
        ...state,
        position: action.position || []
      };
    case "UPDATA_USER_INFO":
      return { ...state, info: action.info || {} };
    case "UPDATA_SEARCH_PARAM":
      return {
        ...state,
        loginName: action.loginName,
        realName: action.realName,
        type: action.types,
        id: action.id
      };
    case "OPEN_LOADING":
      return { ...state, loading: true };
    case "CLOSE_LOADING":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
export default adminUser;

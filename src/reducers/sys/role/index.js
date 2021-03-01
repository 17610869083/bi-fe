const role = (
  state = {
    roles: [],
    pageNum: 1,
    total: 0,
    info: {},
    allRole: []
  },
  action
) => {
  switch (action.type) {
    case "UPDATA_ROLES":
      return {
        ...state,
        roles: action.roles || [],
        pageNum: Number(action.pageNum),
        total: Number(action.total)
      };
    case "UPDATA_ROLE_INFO":
      return { ...state, info: action.info || {} };

    case "UP_ALL_ROLE":
      return { ...state, allRole: action.allRole || [] };
    default:
      return { ...state };
  }
};
export default role;

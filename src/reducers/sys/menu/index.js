const menu = (state = {}, action) => {
  switch (action.type) {
    case "UPDATA_MENU_TREE":
      return { ...state, menu: action.menuTree || [] };
    case "UPDATA_INFO":
      return { ...state, info: action.info || {} };
    default:
      return { ...state };
  }
};
export default menu;

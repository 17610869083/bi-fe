const tree = (
  state = {
    children: []
  },
  action
) => {
  switch (action.type) {
    case "GET_TREE":
      return {
        ...state,
        children: action.children || []
      };
    default:
      return { ...state };
  }
};
export default tree;

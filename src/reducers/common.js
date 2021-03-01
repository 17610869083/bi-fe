const common = (
  state = {
    dicts: {},
    CSers: [],
    address: [],
    agents: []
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_COMMON_DICTS": {
      let { dicts: newDicts } = action;
      let dicts = Object.assign({}, state.dicts, newDicts);
      return {
        ...state,
        dicts
      };
    }
    case "UPDATE_COMMON_AGENTS": {
      let { agents } = action;
      return {
        ...state,
        agents
      };
    }
    case "GET_COMMON_CSERS": {
      let { CSers } = action;
      return {
        ...state,
        CSers
      };
    }
    case "GET_COMMON_ADDRESS": {
      let { address } = action;
      return {
        ...state,
        address
      };
    }
    default:
      return { ...state };
  }
};
export default common;

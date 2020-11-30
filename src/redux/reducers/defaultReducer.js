import { DEFAULT_ACTION } from "../constants";

export const defaultReducer = (state = {}, action) => {
  switch (action.type) {
    case DEFAULT_ACTION: {
      let nextState = { ...state };
      return nextState;
    }
    default: {
      return state;
    }
  }
};

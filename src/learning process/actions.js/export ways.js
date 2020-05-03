import * as actions from "./actionTypes";

// All can works

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description: "bug",
  },
});

export const bugAdded = (description) => {
  return {
    type: actions.BUG_ADDED,
    payload: {
      description: "bug",
    },
  };
};

export function bugAdded(description) {
  return {
    type: actions.BUG_ADDED,
    payload: {
      description: "bug",
    },
  };
}

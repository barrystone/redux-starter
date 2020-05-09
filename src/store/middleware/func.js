// Tuunk / Func
// If use redux with no-toolkit should (npm i redux-thunk ) and registering as middleware function.
const func = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") action(dispatch, getState);
  else next(action);
};

export default func;

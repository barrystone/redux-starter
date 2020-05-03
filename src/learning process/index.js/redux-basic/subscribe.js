import store from "./store";

store.subscribe(() => {
  console.log("Store changed!!", store.getState());
});
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "bug",
  },
});
store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

console.log(store.getState());

import store from "./customStore";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(actions.bugAdded("bug added"));

console.log(store.getState());

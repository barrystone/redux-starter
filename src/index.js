import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

//state = reducer(state, action)
//notify the subscribe

store.dispatch(bugAdded("Bug"));

// store.dispatch(bugRemoved(1));

store.dispatch(bugResolved(1));

console.log(store.getState());

import configureStore from "./store/configureStore";
// import * as actions from "./store/api";
import { loadBugs } from "./store/bugs";

const store = configureStore();

// UI layer
store.dispatch(loadBugs());

// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugReceived",
//   })
// );

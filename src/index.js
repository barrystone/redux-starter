import configureStore from "./store/configureStore";
import { addBug, assignBugToUser, resolveBug, loadBugs } from "./store/bugs";
import { userAdded } from "./store/users";

const store = configureStore();

// UI layer
store.dispatch(loadBugs());

// store.dispatch(addBug({ description: "a" }));

// setTimeout(() => store.dispatch(resolveBug(1)), 2000);

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

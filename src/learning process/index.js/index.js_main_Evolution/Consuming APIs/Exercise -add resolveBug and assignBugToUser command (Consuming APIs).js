import configureStore from "./store/configureStore";
import {
  addBug,
  assignBugToUser,
  resolveBug,
  bugAssignToUser,
  bugAdded,
  bugResolved,
  loadBugs,
} from "./store/bugs";
import { userAdded } from "./store/users";

const store = configureStore();

// UI layer
store.dispatch(loadBugs());
// store.dispatch(addBug({ description: "a" }));

// store.dispatch(bugAdded({ description: "a" }));
// store.dispatch(userAdded({ name: "first" }));
// store.dispatch(bugAssignToUser({ userId: 1, bugId: 2 }));
// store.dispatch(bugResolved({ id: 2 }));

// setTimeout(() => store.dispatch(resolveBug(1)), 2000);

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

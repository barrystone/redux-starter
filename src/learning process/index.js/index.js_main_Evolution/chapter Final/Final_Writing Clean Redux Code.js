import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(projectAdded({ name: "Project 1" }));

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));
store.dispatch(actions.bugResolved({ id: 1 }));
store.dispatch(actions.bugRemoved({ id: 2 }));

console.log(store.getState());

import configureStore from "./store/configureStore";
import { addBugs } from "./store/bugs";

const store = configureStore();

// UI layer
store.dispatch(addBugs({ description: "a" }));

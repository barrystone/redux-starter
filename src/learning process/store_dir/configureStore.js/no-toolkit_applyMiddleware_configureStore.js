// //Set (const store = configureStore;) in index.js
// import { createStore, applyMiddleware, compose } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
// import reducer from "./reducer";
// import logger from "./middleware/logger";

// const store = createStore(
//   reducer,
//   compose(applyMiddleware(logger), devToolsEnhancer({ trace: true }))
// );
// export default store;

// Set (const store = configureStore();) in index.js
import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./reducer";
import logger from "./middleware/logger";

export default function configureStore() {
  const store = createStore(
    reducer,
    compose(devToolsEnhancer({ trace: true }), applyMiddleware(logger))
  );
  return store;
}

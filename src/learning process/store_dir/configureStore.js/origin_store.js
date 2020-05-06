// store.js (before After Ducks Pattern (Writing Clean Redux Code) commit ), the previous version of configureStore.js
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
  reducer,
  devToolsEnhancer({ trace: true })
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

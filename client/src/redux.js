import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const reduxStore = () => {
  return { store, persistor };
};

export { store, persistor };
export default reduxStore;

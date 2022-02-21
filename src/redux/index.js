import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import track from "./track";
import music from "./music";
import playlist from "./playlist";
const rootReducer = combineReducers({ playlist, track, music });

const middlewares = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize…
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();

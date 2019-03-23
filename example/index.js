import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";

import withLoading, { reducer } from "../src";

const extendedCompose =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;
const store = createStore(
  combineReducers({ loaders: reducer }),
  extendedCompose
);

const LOADER_NAME = "example";

const App = ({ loaders }) => {
  const loader = loaders[LOADER_NAME];
  return (
    <>
      <p>Loader state: <b>{loader.status ? "loading..." : "done"}</b></p>
      <br/>
      <button onClick={() => loader.start()}>Start loading</button>
      {" | "}
      <button onClick={() => loader.stop()}>Stop loading</button>
    </>
  );
};

const WithLoadingApp = withLoading(LOADER_NAME)(App);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  ReactDOM.render(
    <Provider store={store}>
      <WithLoadingApp />
    </Provider>,
    root
  );
});

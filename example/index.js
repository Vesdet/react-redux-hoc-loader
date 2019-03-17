import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import withLoading, { reducer } from "../src";

const store = createStore(
  combineReducers({ loaders: reducer }),
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__())
);

const LOADER_NAME = "example";

const App = ({ loaders }) => {
  const loader = loaders[LOADER_NAME];
  return (
    <>
      <p>Loader state: <b>{loader.status ? "loading..." : "waiting"}</b></p>
      <br/>
      <button onClick={() => loader.start()}>Start loading</button>
      {" | "}
      <button onClick={() => loader.stop()}>Stop loading</button>
    </>
  );
};

const WithLoadingApp = withLoading(LOADER_NAME)(App);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  ReactDOM.render(
    <Provider store={store}>
      <WithLoadingApp />
    </Provider>,
    root
  );
});
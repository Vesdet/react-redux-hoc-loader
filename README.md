[![NPM](https://img.shields.io/npm/v/react-redux-hoc-loader.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-hoc-loader)
# react-redux-hoc-loader
> React-Redux HOC and Reducer for managing status of loaders in redux state

## Install

```bash
npm install --save react-redux-hoc-loader
```

## Usage

**Step 1:** 
Add `loaders` reducer to list of your reducers.

```jsx
// index.js
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as loadersReducer } from "react-redux-hoc-loader";

const store = createStore(
  combineReducers({
    /* your reducers here */
    loaders: loadersReducer
  })
);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
```

**Step 2:**
Wrap your component with `withLoading` high order component and pass names of loaders as arguments.

```jsx
// component.js
import withLoading from "react-redux-hoc-loader";

const LOADER_NAME = "example";

const CustomComponent = ({ loaders, ...props }) => {
  const loader = loaders[LOADER_NAME];
  return (
    <>
      <p>Loader status: <b>{loader.status ? "loading..." : "done"}</b></p>
      <button onClick={() => loader.start()}>Start loading</button>
      <button onClick={() => loader.stop()}>Stop loading</button>
    </>
  );
};

export default withLoading(LOADER_NAME)(CustomComponent);
```

HOC provides `loaders` property to your component.
You can get object of concrete loader by `loaders["NAME_OF_YOUR_LOADER"]`.

Each object contains following properties for working with loader:

| Property | Type | Description |
|:--------------|:--------------|:--------------|
| `status` | boolean | Status of you loader |
| `start` | function | Method for start of a loader.<br/>Can receive async or not callback as a first argument.<br/>See Options of Usage to get more details. |
| `stop` | function |  Method for stop of a loader |

## Options of Usage

**1.**
You can push more that one loader name to HOC:
```jsx
withLoading("firstLoader", "secondLoader" /*, ... */)(Component)
```

**2.** 
You can pass your async callback and arguments for it to `start` method of loader.<br/>
In this case loader will be started before the start and stopped after the end of your callback<br/>
Example of usage `start` function with async callback:
```js
  // async callback 
  loader.start(fetch, "/smth", { method: "DELETE" })
  // sync callback
  loader.start(console.log, "smth")
```

**3.** 
If you want to start/stop loaders from your action creators, **"react-redux-hoc-loader"** provides
functions `startLoading` and `stopLoading` to manage it:
```js
import { startLoading, stopLoading } from "react-redux-hoc-loader";

const LOADER_NAME = "example";

export const asyncAction = async dispatch => {
  dispatch(startLoading(LOADER_NAME));
  /* your async code, e.g.: */
  await fetch("/smth");
  /* end of async code */
  dispatch(stopLoading(LOADER_NAME));
}
```

## License

This project is licensed under the terms of the [MIT license](./LICENSE).

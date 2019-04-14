import React from "react";
import { connect } from "react-redux";

import { startLoading, stopLoading } from "./reducer";

const mapStateToProps = state => ({
  states: state.loaders
});

const mapDispatchToProps = {
  startLoading,
  stopLoading
};

function extendedStartLoading(name, start, stop, callback, ...arg) {
  start(name);
  if (!callback) return;

  return Promise.resolve(
    callback(...arg)
  ).finally(() => stop(name));
}

const withLoading = (...loadersNames) => Component => {
  const Wrapper = props => {
    const { states, dispatch, startLoading, stopLoading, ...rest } = props;

    const loaders = {};
    loadersNames.forEach(name => {
      loaders[name] = {
        status: states[name] || false,
        start: (callback, ...arg) => extendedStartLoading(name, startLoading, stopLoading, callback, ...arg),
        stop: () => stopLoading(name)
      };
    });
    return <Component loaders={loaders} {...rest} />;
  };

  const displayName = Component.displayName || Component.name;
  Wrapper.displayName = `WithLoading(${displayName})`;
  Wrapper.WrappedComponent = Component;

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper);
};

export default withLoading;

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

const withLoading = (...loadersNames) => Component => {
  const Wrapper = props => {
    const { states, dispatch, startLoading, stopLoading, ...rest } = props;

    const loaders = {};
    loadersNames.forEach(name => {
      loaders[name] = {
        status: states[name] || false,
        start: () => startLoading(name),
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

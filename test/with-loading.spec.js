import React from "react";
import { shallow } from "enzyme";
import withLoading from "../src/with-loading";
import { startLoading, stopLoading } from "../src/reducer";

jest.mock('react-redux', () => ({
  connect: (mapStateToProps, mapDispatchToProps) => (Wrapper) => {
    const ConnectedComponent = Wrapper.bind(null, {
      ...mapStateToProps({ loaders: { "first-example": true } }),
      ...mapDispatchToProps
    });
    ConnectedComponent.displayName = Wrapper.displayName;
    ConnectedComponent.WrappedComponent = Wrapper.WrappedComponent;
    return ConnectedComponent;
  }
}));
jest.mock("../src/reducer", () => ({
  startLoading: jest.fn(),
  stopLoading: jest.fn()
}));

describe("WithLoading HOC", () => {
  const CustomComponent = props => (<div {...props}>Test</div>);
  const loadersNames = ["first-example", "second-example"];
  let WithLoadingComponent;
  let Component;

  beforeEach(() => {
    WithLoadingComponent = withLoading(...loadersNames)(CustomComponent);
    Component = shallow(<WithLoadingComponent/>);
  });

  it("should has loaders property with loaders", () => {
    const loaders = Component.props().loaders;
    const expectedProperty = {
      [loadersNames[0]]: {
        status: true,
        start: expect.any(Function),
        stop: expect.any(Function)
      },
      [loadersNames[1]]: {
        status: false,
        start: expect.any(Function),
        stop: expect.any(Function)
      }
    };

    expect(loaders).toEqual(expectedProperty)
  });

  it("should call startLoading and stopLoading", () => {
    const loaders = Component.props().loaders;
    loaders[loadersNames[0]].start();
    expect(startLoading).toBeCalledWith(loadersNames[0]);

    loaders[loadersNames[0]].stop();
    expect(stopLoading).toBeCalledWith(loadersNames[0]);
  });

  it("should start and stop loader when async callback passed to start()", async () => {
    async function test(arg) {
      return Promise.resolve(arg);
    }
    const resolvedValue = "test";

    const loaders = Component.props().loaders;
    const result = await loaders[loadersNames[0]].start(test, resolvedValue);

    expect(startLoading).toBeCalledWith(loadersNames[0]);
    expect(stopLoading).toBeCalledWith(loadersNames[0]);
    expect(result).toBe(resolvedValue);
  });

  it("should start and stop loader when sync callback passed to start()", () => {
    const loaders = Component.props().loaders;
    console.log = jest.fn();
    const resolvedValue = "test";

    loaders[loadersNames[0]].start(console.log, resolvedValue);

    expect(startLoading).toBeCalledWith(loadersNames[0]);
    expect(stopLoading).toBeCalledWith(loadersNames[0]);
    expect(console.log).toBeCalledWith(resolvedValue);
  });

  it("should pass displayName and WrappedComponent to WrappedComponent", () => {
    expect(WithLoadingComponent.displayName).toBe(`WithLoading(${"CustomComponent"})`);
    expect(WithLoadingComponent.WrappedComponent).toEqual(CustomComponent);
  });
});

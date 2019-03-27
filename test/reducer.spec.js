import loadersReducer, { startLoading, stopLoading } from "../src/reducer";

describe("Loaders reducer", () => {
  const initialState = {};
  const LOADER_NAME = "example";

  it("should return initial state", () => {
    expect(loadersReducer()).toEqual(initialState);
  });

  it("should change loader status in state", () => {
    let action = startLoading(LOADER_NAME);
    let result = loadersReducer(initialState, action);
    expect(result).toEqual({
      [LOADER_NAME]: true
    });

    action = stopLoading(LOADER_NAME);
    result = loadersReducer(initialState, action);
    expect(result).toEqual({
      [LOADER_NAME]: false
    });
  });

  it("should add one more loader status to state", () => {
    const secondLoader = "second-example";
    const action = startLoading(LOADER_NAME);
    const result = loadersReducer({ [secondLoader]: true }, action);

    expect(result).toEqual({
      [secondLoader]: true,
      [LOADER_NAME]: true
    });
  });

  it("should create correct start action", () => {
    const action = startLoading(LOADER_NAME);

    expect(action).toEqual({
      type: "@@loading/START",
      payload: { [LOADER_NAME]: true }
    });
  });

  it("should create correct stop action", () => {
    const action = stopLoading(LOADER_NAME);

    expect(action).toEqual({
      type: "@@loading/STOP",
      payload: { [LOADER_NAME]: false }
    });
  })
});

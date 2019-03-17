// Actions
const START_LOADING = "loading/START";
const STOP_LOADING = "loading/STOP";

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case START_LOADING:
    case STOP_LOADING:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

// Action Creators
export const startLoading = name => ({
  type: START_LOADING,
  payload: { [name]: true }
});

export const stopLoading = name => ({
  type: STOP_LOADING,
  payload: { [name]: false }
});

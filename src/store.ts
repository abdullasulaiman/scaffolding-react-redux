import { createStore, applyMiddleware } from "redux";
import produce from 'immer';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

const initialState = {
  data: [],
  object: {
    name: "Name",
    value: "Value",
    b: {
      c: 'c'
    }
  }
};

function reducer(state: any = initialState, action: any): any {
  switch (action.type) {
    case "ARRAY_MUTATION":
      // Validating Via ES Lint
      state.object.name = "Modifiying Objects";
      state.data.push(1);
      return state;
      // Not Mutated with help of native destructuring
      // const newState = Object.assign([], ...state.data, action.element);
      // return newState;
    default:
      return state;
  }
}

// To show immutablitiy via immutableStateInvariantMiddleware
// This is need to be added as part of middleware only in __DEV__ mode
// const store = createStore(reducer, applyMiddleware(immutableStateInvariantMiddleware()));

// Example of Immer.js with produce function which gives you a draft object
// validated with immutableStateInvariantMiddleware as original object getting immutated or not
const store = createStore(reducer, applyMiddleware(immutableStateInvariantMiddleware()))
// const store = createStore(reducer, applyMiddleware())
store.dispatch({ type: "ARRAY_MUTATION", element: { a: 1, b: 2 } });
export default store;

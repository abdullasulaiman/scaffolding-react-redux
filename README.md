This repo shows basics of RxJS and how to integrate it with React applications using React Hooks for state management. 
Built a demo chat application. This chat application will have three components that will communicate with each other through RxJS.

### To Run the project
yarn install  
yarn start

### POC for Validating different options available for Immutability

#### Linting Options

plugin name: eslint-plugin-functional 
Documentation Url: http://www.lib4dev.in/info/jonaskello/eslint-plugin-functional/194648815#supported-rules

This package has a collection of eslint rules to promote functional programming style concepts. Note that you can use this package to enforce only some aspects of functional programming, for example only immutability. There are also options for the rules that allow you to gradually adopt a functional style. Most rules can be used both for JavaScript and TypeScript, however some rules, for example enforcing the readonly keyword, is of course only available for TypeScript.

We've identified the following areas that need to be linted in order to promote functional style in TypeScript/JavaScript:

No mutations
No object-orientation
No statements
No exceptions
Currying

ESlint Configuration : .eslintrc.js
```
{
    ...other config omitted
    "plugins": [
        "functional"
    ],
    // Rules to detect mutation in the app
    rules:  {
      "functional/immutable-data": "error"
    },
}
```

#### Developer Options as Middleware

npm module : redux-immutable-state-invariant  
repository link : https://github.com/leoasis/redux-immutable-state-invariant#readme

Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches. For development use only!

Sample Code you can view here
https://github.com/leoasis/redux-immutable-state-invariant/blob/master/example/src/index.js


#### Use Immer.js 

npm module : immer
repository link : https://github.com/immerjs/immer

Create the next immutable state tree by simply modifying the current tree

Code Sample 

```
import { createStore, applyMiddleware } from "redux";
import produce from 'immer';

const initialState = {
  data: [],
  object: {
    name: "Name",
    value: "Value"
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


```


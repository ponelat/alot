#### Redux cheatsheet

## Forward

This is mostly for SwaggerHub devs, as we are in the proccess of migrating to redux from a moreartyjs/reflux system
Hopefully this will shed some light on any magic, so that we can carry on making cool stuff


## Quickly....

You have a single state (object)
**Reducers** take a state + data and return a new state
**Actions** are simple objects that get dispatched, and handed over to reducers. For simplicity we use a simple schema for the objects, known as Flux-Standard-Actions (FSA)
**Stores** is the interface. It holds the state, assigns the root reducer and exposes the `dispatch`, `subscribe` methods

The flow goes like this...
You setup your store, give it *the* root reducer.
With the store instance, you dispatch actions with data.
The reducers are wired to take the action+data and return a new state
Your components are then updated to the new state


#### Reducers

Possibly the most interesting thing in redux.
A reducer is simply a function that takes a the state + data(your action) and returns a *new* state
Your store start with a single reducer, known as the root reducer. All actions will pass through this function.
Your reducer can then delegate to sub-reducers and merge there new states into the root state. This is how we break down our app's state management.

#### Actions
They are quite boring.
An action is an object... and even that isn't a requirement.

#### Redux middlware

With the redux flow, actions are passed to reducers.
Redux Middleware, allows you to put code between that step, so that you can work on all actions.
Things like - logging, advanced error handling, and redux-thunk (see **redux-thunk**)

## Some libs

#### redux-actions 
they create functions, that return FSA conforming objects.
like this...
```js
import createAction from 'redux-actions'

const LOGIN_USER = 'login-user'
var loginUser = createAction(LOGIN_USER)

loginUser({username: 'josh'})
// => 
{
 type: 'login-user',
 payload: {
   username: 'josh'
 },
 meta: {},
 error: false
}

// So all it does is create functions, that make objects.. which are standardized 
// See FSA for more info on the props of the object
```

#### redux-thunk

This is amazing.. its a lib, which has about exactly 7 lines of code
This little lib takes advantage of middleware in redux.
It allows you to pass in functions, instead of plain objects as your actions
In those functions, you'll be given `dispatch` and `getState` which you can use to asynchrnously dispatch further actions
This allows us to write asynchronous actions






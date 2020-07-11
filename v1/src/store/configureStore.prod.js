import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import {createStore, applyMiddleware} from 'redux'


const configureStore = () => {
  const store = createStore(
    reducers, 
    {},
    applyMiddleware(
      thunkMiddleware
    )
  )
  return store
}

export default configureStore

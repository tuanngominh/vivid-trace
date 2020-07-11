import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = () => {
  const store = createStore(
    reducers, 
    {},
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  )
  return store
}

export default configureStore

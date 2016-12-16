import {
    createStore,
    applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import promiseMiddleware from './middlewares/promiseMiddleware';
import afterApiMiddleware from './middlewares/afterApiMiddleware'
import rootReducer from './reducers'
import {
    browserHistory
} from 'react-router'

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            createLogger(),
            promiseMiddleware({
                promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']
            }),
            afterApiMiddleware
        )
    )
    // if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        // module.hot.accept('../reducers', () => {
        //   const nextReducer = require('../reducers').default
        //   store.replaceReducer(nextReducer)
        // })
    // }

    return store
}

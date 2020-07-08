import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import  App  from './App'
import createStore from './createReduxStore'
import Divice from "./divice";

const store = createStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
        <Divice/>
    </Provider>,
    document.getElementById('root')
)
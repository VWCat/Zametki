import { combineReducers } from 'redux'
import { dataReducer } from './data'
import { testReducer } from './test'

export const rootReducer = combineReducers({
    test: testReducer,
    data: dataReducer,
})
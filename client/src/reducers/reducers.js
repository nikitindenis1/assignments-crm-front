import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import employees_reducer from './employees_reducer'
import navbar_reducer from './navbar_reducer'
import assignments_reducer from './assignments_reducer'
import user_reducer from './user_reducer'
import global_reducer from './global_reducer'
export default (history) => combineReducers({
    router: connectRouter(history),
    employees:employees_reducer,
    navbar:navbar_reducer,
    assignments:assignments_reducer,
    user:user_reducer,
    global:global_reducer
})
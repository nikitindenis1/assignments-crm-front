
import {
    UPDATE_NAVBAR_REDUCER
} from './types'

export const updateNavbarReducer = (name, value) => async dispatch => {

    dispatch({
        type: UPDATE_NAVBAR_REDUCER,
        payload: { name, value }
    })
}
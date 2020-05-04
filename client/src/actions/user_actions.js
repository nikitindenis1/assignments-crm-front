
import {
    UPDATE_USER_REDUCER
} from './types'

export const updateUserReducer = (name, value) => async dispatch => {

    dispatch({
        type: UPDATE_USER_REDUCER,
        payload: { name, value }
    })
}
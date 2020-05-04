
import {
    SET_DATA_TO_ASSIGNMENTS_REDUCER
} from './types'

export const setDataToAssignmentsReducer = (name, value) => async dispatch => {
    dispatch({
        type: SET_DATA_TO_ASSIGNMENTS_REDUCER,
        payload: { name, value }
    })
}

export const addAssignment = (assignment, list) => async dispatch => {
    let new_list = JSON.parse(JSON.stringify(list))
    new_list = [assignment, ...new_list]
    let value = new_list
    let name = 'assignments_list'
    dispatch({
        type: SET_DATA_TO_ASSIGNMENTS_REDUCER,
        payload: { name, value }
    })
}

export const removeAssignment = (assignment, list) => async dispatch => {
    let new_list = JSON.parse(JSON.stringify(list))
    new_list = new_list.filter(m => m._id !== assignment._id)
    let value = new_list
    let name = 'assignments_list'
    dispatch({
        type: SET_DATA_TO_ASSIGNMENTS_REDUCER,
        payload: { name, value }
    })
}


export const updateAssignment = (assignment, list) => async dispatch => {
   
    let new_list = list ? JSON.parse(JSON.stringify(list)) : []
    let index = new_list.findIndex(m => m._id === assignment._id)
        console.log(index)
  
    if (index >= 0) {
        new_list.splice(index, 1, assignment)
    }
    let value = new_list
    let name = 'assignments_list'
    dispatch({
        type: SET_DATA_TO_ASSIGNMENTS_REDUCER,
        payload: { name, value }
    })
}

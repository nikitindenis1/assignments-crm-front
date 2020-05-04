
import {
    SET_DATA_TO_EMPLOYEES_REDUCER
} from './types'

export const setDataToEmployeesReducer = (name, value) => async dispatch => {
    dispatch({
        type: SET_DATA_TO_EMPLOYEES_REDUCER,
        payload: { name, value }
    })
}

export const removeEmployee = (employee, list) => async dispatch => {
    let new_list = JSON.parse(JSON.stringify(list))
    new_list = new_list.filter(m => m._id !== employee._id)
    let value = new_list
    let name = 'employees_list'
    dispatch({
        type: SET_DATA_TO_EMPLOYEES_REDUCER,
        payload: { name, value }
    })
}


export const AddAndUpdateEmployee = (employee, list) => async dispatch => {
   
    let new_list = JSON.parse(JSON.stringify(list))
    let index = new_list.findIndex(m => m._id === employee._id)
   
    if (index >= 0) {
        new_list.splice(index, 1, employee)
    }else{
        new_list = [employee, ...new_list]
    }
    let value = new_list
    let name = 'employees_list'
    dispatch({
        type: SET_DATA_TO_EMPLOYEES_REDUCER,
        payload: { name, value }
    })
}



import {
  SET_DATA_TO_EMPLOYEES_REDUCER
} from '../actions/types'
  const initialState = {
    employees_list:[],
    employee_assignments:[]
}

export default function (state = initialState, action) {

  switch (action.type) {
    case SET_DATA_TO_EMPLOYEES_REDUCER:
      const {name, value} = action.payload
      return {
        ...state,
        [name]:value
      }
    default:
      return state
  }
}
import {
    UPDATE_NAVBAR_REDUCER
  } from '../actions/types'
 
    const initialState = {
      selected_employee:''
  }
  
  export default function (state = initialState, action) {
  
    switch (action.type) {
        case UPDATE_NAVBAR_REDUCER:
            const {name, value} = action.payload
            return {
                ...state,
                [name]:value
            }
      default:
        return state
    }
  }
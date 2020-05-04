import {
    SET_DATA_TO_ASSIGNMENTS_REDUCER
  } from '../actions/types'
    const initialState = {
      assignments_list:[]
  }
  
  export default function (state = initialState, action) {
  
    switch (action.type) {
      case SET_DATA_TO_ASSIGNMENTS_REDUCER:
        const {name, value} = action.payload
        return {
          ...state,
          [name]:value
        }
      default:
        return state
    }
  }
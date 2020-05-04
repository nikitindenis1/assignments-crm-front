  import {
    UPDATE_USER_REDUCER
  } from '../actions/types'
  

  
  const initialState = {
    user:'',
    permissions:[]
}

export default function (state = initialState, action) {

  switch (action.type) {
    case UPDATE_USER_REDUCER:
      const {name, value} = action.payload
      return {
        ...state,
        [name]:value
      }

    default:
      return state
  }
}
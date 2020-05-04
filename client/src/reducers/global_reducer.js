
  
import {
    UPDATE_GLOBAL_REDUCER
} from '../actions/types'
import { text } from '../text/text'
  
  const initialState = {    
    error:false,
    success:false,
    system_text:text.english
}

export default function (state = initialState, action) {

  switch (action.type) {
    case UPDATE_GLOBAL_REDUCER:
        const {name, value} = action.payload
        return {
            ...state,
            [name]:value
        }

    default:
      return state
  }
}
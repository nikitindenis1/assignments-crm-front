
import {
    UPDATE_GLOBAL_REDUCER
} from './types'
import { text } from '../text/text'

export const updateGlobalReducer = (name, value) => async dispatch => {

    dispatch({
        type: UPDATE_GLOBAL_REDUCER,
        payload: { name, value }
    })
}



export const setSystemLanguage = (language) => async dispatch => {
    const body = document.querySelector('body')
   
    const value = text[language] ? text[language]  : text['english']
    if(value.settings.direction === 'rtl'){
        body.classList.add('rtl__body')
    }else{
        body.classList.remove('rtl__body')
    }
    let name = 'system_text'
    dispatch({
        type: UPDATE_GLOBAL_REDUCER,
        payload: { name, value }
    })
    
    dispatch({
        type: UPDATE_GLOBAL_REDUCER,
        payload: { name:'language', value:language }
    })
}

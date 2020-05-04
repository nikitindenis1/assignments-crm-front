import React from 'react';
import SmallLoader from './SmallLoader';

const SumbitBtn = (props) => {
    const {text, active} = props
    return(
        <div className='submit__btn'>
            {active ? <SmallLoader active = {true}/> : <button>{text}</button>}
        </div>
    )
}
export default SumbitBtn
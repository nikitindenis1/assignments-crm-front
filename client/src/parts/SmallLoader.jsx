import React  from 'react';

const SmallLoader = (props) => {
    const {active}  =props
    return (
        <div 
        style ={{
            opacity:active ? 1 : 0,
            pointerEvents:'none'
        }}
        id='loader'
        class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
}
export default SmallLoader
import React, { Component } from 'react';

const SmallPopup = (props) =>{
    const {text, style, arrow_class} = props 
    return (
            <div 
            style = {style}
            className='smal__popup flex__center'>
               {text}
               <aside className={arrow_class}></aside>
            </div>
    )
}
export default SmallPopup
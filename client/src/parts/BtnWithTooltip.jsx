import React, { Component } from "react";

const  BtnWithTooltip = (props) => {
  const { svg, tooltip , handleClick, value} = props;
  return (
    <div 
  
    onClick = {() => handleClick ? handleClick(value) : ''}
    className='btn__with__tooltip'>
      <button   type='button'>{svg}</button>
      <figure>{tooltip}</figure>
    </div>
  );
};

export default BtnWithTooltip
import React from "react";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

const NoData = (props) => {
  const { text, create_text, create } = props;
  return (
    <div className="no__data flex__column">
      <CloudOffIcon className='no__data__main__svg'/>
      <h3>{text}</h3>
      {create_text ? (
        <button 
        className='add__btn flex__center'
        onClick={() => create()}>
          <AddOutlinedIcon />
          {create_text}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
export default NoData;

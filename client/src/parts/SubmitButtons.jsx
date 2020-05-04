import React from "react";
import SmallLoader from "./SmallLoader";

const SubmitButtons = (props) => {
    const {loading, close_text, close, submit, submit_text} = props
  return (
    <div className="submit__buttons__box flex__start">
      {!loading ? (
        <button
          className="flex__center"
          style={{
            color: "white",
            background: "#0091ff",
          }}
          onClick = {() => submit ? submit()  :''}
          type="submit"
        >
         {submit_text}
        </button>
      ) : (
        <button 
        style ={{
            background:'transparent',
            border:'none',
            position:'relative'
        }}
        >
            <SmallLoader active={true} />
        </button>
      )}
      <button
        className="flex__center"
        style={{
          color: "#0091ff",
          background: "rgba(0, 145, 255, 0.1)",
        }}
        type="button"
        onClick={() => close()}
      >
       {close_text}
      </button>
    </div>
  );
};
export default SubmitButtons;

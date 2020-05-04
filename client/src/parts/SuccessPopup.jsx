import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/actions";


const SuccessPopup = (props) => {
    const { msg} = props
    const {system_text} = props.global;
    return (
        <div
            style={{
                opacity: msg ? 1 : 0,
                pointerEvents:msg ? 'all'  :'none'
            }}
            className='popup__with__question'>
            <section
            onClick={() => props.close()}
            className="overlay"></section>
            <div className='popup__with__question__content'>
                <h2>{msg}</h2>
                <section className='popup__with__question__actions flex__center'>
                    <button
                    style ={{
                        color:'white',
                        background:'#0091ff'
                    }}
                        onClick={() => props.close()}
                >{system_text.CLOSE}</button>
                </section>
            </div>
        </div>
    );
}
function mapStateToProps({ assignments, global }) {
    return { assignments, global };
  }
  
  export default (
    connect(mapStateToProps, actions)(SuccessPopup)
  );
  
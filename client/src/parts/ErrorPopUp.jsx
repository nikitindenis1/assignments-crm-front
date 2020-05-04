import React from 'react';

const ErrorPopup = (props) => {
    const { error} = props
    return (
        <div
            style={{
                opacity: error ? 1 : 0,
                pointerEvents:error ? 'all'  :'none'
            }}
            className='popup__with__question'>
            <section
            onClick={() => props.close()}
            className="overlay"></section>
            <div className='popup__with__question__content'>
                <h2>{error}</h2>
                <section className='popup__with__question__actions flex__center'>
                    <button
                    style ={{
                        color:'white',
                        background:'#0091ff'
                    }}
                        onClick={() => props.close()}
                    >Close</button>
                </section>
            </div>
        </div>
    );
}
export default ErrorPopup;
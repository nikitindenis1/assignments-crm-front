import React from 'react';
import SmallLoader from './SmallLoader';

const PopupWithFunction = (props) => {
    const { text, name, active, submit_text, close_text, loading } = props
    return (
        <div
            style={{
                opacity: active ? 1 : 0,
                pointerEvents:active ? 'all'  :'none'
            }}
            className='popup__with__question'>
            <section
            onClick={() => props.close()}
            className="overlay"></section>
            <div className='popup__with__question__content'>
                <h2>{text}</h2>
                <h3>{name}</h3>
                <section className='popup__with__question__actions flex__center'>
                   {!loading ? <>
                   <button
                    style ={{
                        color:'white',
                        background:'#0091ff'
                    }}
                        onClick={() => props.submit()}
                    >{submit_text}</button>
                    <button
                       onClick={() => props.close()}
                    style ={{
                        color:'#0091ff',
                        background:'rgba(0, 145, 255, 0.1)'
                    }}  
                    >{close_text}</button>
                    </> : <SmallLoader active ={true} />}
                </section>
            </div>
        </div>
    );
}
export default PopupWithFunction;

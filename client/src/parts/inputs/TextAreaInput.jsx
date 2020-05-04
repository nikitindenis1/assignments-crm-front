import React, { Component } from 'react';



class TextAreaInput extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    handleChnage = (value) => {
        const { input } = this.props
        const { property_name } = input
        this.props.handleUpdate(property_name, value)
    }
    handleBlur = () => {
        const { value,input } = this.props
        let validation_error
       let error = !value
       this.setState({
        validation_error,
        error,
        active: value
    })
    }
    handleFocus = () => {
        this.setState({
            active:  true,
            validation_error:false,
            error:false

        })       
    }

    componentWillReceiveProps(nextProps){
        const {validate, input, value} = this.props
        const {type} = input
        if(nextProps.validate !== validate){
            this.handleBlur(type, value)
        }
    }
    
    render() {
        const { input, value } = this.props
        const { empty_text, label } = input
        const { active, error } = this.state
        return (
            <div className={active || value ? 
                'text__input text__area__input text__input--active' : 
            'text__input text__area__input'}>
                <label>{label}</label>
                <textarea 
                    onChange={e => this.handleChnage(e.target.value)}
                    onBlur={e => this.handleBlur()}
                    onFocus={e => this.handleFocus()}
                    value={value}
                />
                {error ?
                    <p className='text__input__error'>{empty_text}</p> :
                   
                        null}
            </div>
        );
    }
}

export default TextAreaInput;

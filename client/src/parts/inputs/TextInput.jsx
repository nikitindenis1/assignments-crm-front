import React, { Component } from "react";
import validator from "validator";
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'


const validateInput = (type, value) => {
  switch (type) {
    case "email":
      return !validator.isEmail(value);
    case "phone":
      return !validator.isMobilePhone(String(value));
    default:
      break;
  }
};

class TextInput extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChnage = (value) => {
    const { input } = this.props;
    const { property_name, type } = input;
    if (type === "phone") {
      let num = value.replace(/[^0-9.]/g, "");
      this.props.handleUpdate(property_name, num);
    } else {
      this.props.handleUpdate(property_name, value);
    }
  };
  handleBlur = () => {
    const { value, input } = this.props;
    const { type, required } = input;

    let validation_error, error;
    this.setState({
      active: value,
    });
    if (value) {
      validation_error = validateInput(type, value);
    } else {
      if (required) error = true;
    }
    this.setState({
      validation_error,
      error,
    });
  };
  handleFocus = () => {
    this.setState({
      active: true,
      validation_error: false,
      error: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { validate, input, value } = this.props;
    const { type, required } = input;
    if (nextProps.validate !== validate && required) {
      this.handleBlur(type, value);
    }
  }

  render() {
    const { input, value } = this.props;
    const { empty_text, validation_text, label, type } = input;
    const { active, error, validation_error } = this.state;
    const {system_text} = this.props.global
    return (
      <div
        className={
          active || value ? "text__input text__input--active" : "text__input"
        }
      >
        {/* <label>{label}</label> */}
        <input
          type={type === "password" ? "password" : "text"}
          onChange={(e) => this.handleChnage(e.target.value)}
          onBlur={(e) => this.handleBlur()}
          onFocus={(e) => this.handleFocus()}
          placeholder={system_text[label]}
          value={value}
        />
        {error ? (
          <p className="text__input__error">{system_text[empty_text]}</p>
        ) : validation_error ? (
          <p className="text__input__error">{system_text[validation_text]}</p>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ global }) {
  return { global }
}

export default (connect(mapStateToProps, actions)(TextInput))


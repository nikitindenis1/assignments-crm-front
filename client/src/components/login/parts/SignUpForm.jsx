import React, { Component } from "react";
import TextInput from "../../../parts/inputs/TextInput";
import signup_inputs from "./signup-inputs";
import { apiPostRequest } from "../../../tools/api";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import { setCookie } from "../../../tools/cookie";
import { AUTH_TOKEN } from "../../../tools/keys";
import SumbitBtn from "../../../parts/SumbitBtn";
import SignupSuccess from "./SignupSuccess";
import { EMPLOYEES_ROUTE } from "../../../tools/routes";

class signUpForm extends Component {
  constructor() {
    super();
    this.state = {
      form_data: {},
    };
  }

  updateForm = (name, value) => {
    const form_data = { ...this.state.form_data };
    form_data[name] = value;
    this.setState({
      form_data,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    this.setState({
      validate: true,
    });
    setTimeout(() => {
      const errors = document.querySelectorAll(".text__input__error");
      if (errors.length === 0) {
        this.signup();
      }
      this.setState({
        validate: false,
      });
    }, 50);
  };

  signup = async () => {
    const { form_data } = this.state;
    const api = "users/create";
    this.setState({
      loading: true,
    });
    const res = await apiPostRequest(api, form_data);
    if (res.ok) {
      this.props.updateUserReducer("user", res.result);
      setCookie(AUTH_TOKEN, res.result.token);
      this.setState({
        signup_success:true
      })
      setTimeout(() => {
        this.props.history.push(EMPLOYEES_ROUTE)
      }, 3000);
    }
    if (!res.ok && res.result) {
      this.props.updateGlobalReducer('error',res.result);
    }
    this.setState({
      loading: false,
    });
  };
  render() {
    const { form_data, validate, error_popup, loading, signup_success } = this.state;
    return (
      <div className="login flex__center">
        <SignupSuccess 
        active = {signup_success}
        />
        <form
        style ={{
          filter:signup_success ? 'blur(2px)' : '',
        
        }}
          onSubmit={(e) => this.submitForm(e)}
          className="login__form signup__form flex__column"
        >
          <h2>Signup</h2>
          {error_popup ? <p>{error_popup}</p> : ""}
          <section className="login__form__inputs">
            {signup_inputs.map((input, i) => {
              return (
                <TextInput
                  key={i}
                  handleUpdate={this.updateForm}
                  input={input}
                  validate={validate}
                  value={form_data[input.property_name]}
                />
              );
            })}
          </section>
          <SumbitBtn text="Submit" active={loading} />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps, actions)(signUpForm));

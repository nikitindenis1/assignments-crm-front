import React, { Component } from "react";
import signin_inputs from "./signin-inputs";
import TextInput from "../../../parts/inputs/TextInput";
import { apiPostRequest } from "../../../tools/api";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import { DASHBOARD_ROUTE, EMPLOYEES_ROUTE, EMPLOYEE_DASHBOARD_ROUTE, EMPLOYEE_DASHBOARD_PAGE_ROUTE } from "../../../tools/routes";
import { setCookie, removeCookie } from "../../../tools/cookie";
import { AUTH_TOKEN } from "../../../tools/keys";
import { withRouter } from "react-router";
import SumbitBtn from "../../../parts/SumbitBtn";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
class SignInForm extends Component {
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
        this.signin();
      } 
      this.setState({
        validate: false,
      });
    }, 50);
  };

  signin = async () => {
    const { form_data } = this.state;
    this.setState({
      loading:true
    })
    const api = "auth/login";
    const res = await apiPostRequest(api, form_data);
    if (res.ok) {
      this.props.updateUserReducer("user", res.result);
      setCookie(AUTH_TOKEN, res.result.token);
      if(res.result.is_manager)  return this.props.history.push(EMPLOYEES_ROUTE);
      if(!res.result.active) {
        removeCookie(AUTH_TOKEN);
        this.setState({
          loading:false
        })
        return  this.props.updateGlobalReducer('error','Employee is inactive');
      }
     else return this.props.history.push(
      EMPLOYEE_DASHBOARD_PAGE_ROUTE.replace(":id", res.result._id)
    )
    }
    if (!res.ok && res.result) {
      this.props.updateGlobalReducer('error',res.result);
    }
    this.setState({
      loading:false
    })
  };

  render() {
    const { form_data, validate, loading } = this.state;
    return (
      <div className='login flex__center'>
       <form
        onSubmit={(e) => this.submitForm(e)}
        className="login__form signin__form flex__column"
      >
        {/* <h2>Login</h2> */}
        <AccountCircleRoundedIcon 
        style ={{
          fontSize:'70px',
          marginLeft:'auto',
          marginRight:'auto',
          marginBottom:'20px',
          color:'rgba(0, 145, 255, 1)'
        }}
        />
        <section className="login__form__inputs">
          {signin_inputs.map((input, i) => {
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
       <SumbitBtn
       text = 'Submit'
       active = {loading}
       />
      </form> 
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps, actions)(SignInForm));

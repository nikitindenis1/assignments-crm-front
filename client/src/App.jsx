import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  EMPLOYEE_DASHBOARD_ROUTE,
  EMPLOYEES_ROUTE,
  EMPLOYEE_DASHBOARD_PAGE_ROUTE,
} from "./tools/routes";
import Dashboard from "./components/dashboard/Dashboard";
import { connect } from "react-redux";
import * as actions from "./actions/actions";
import EmployeeDashboard from "./components/employee-dashboard/EmployeeDashboard";
import ErrorPopup from "./parts/ErrorPopUp";
import SuccessPopup from "./parts/SuccessPopup";
import { AUTH_TOKEN } from "./tools/keys";
import { LoginWithJwt } from "./functions/auth_functions";
import { getCookie } from "./tools/cookie";
import SignInForm from "./components/login/parts/SignInForm";
import SignUpForm from "./components/login/parts/SignUpForm";
import InvalidRoute from "./components/invalid-route/InvalidRoute";
import { apiGetRequest } from "./tools/api";





class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    const token = await getCookie(AUTH_TOKEN);
    const url = window.location.pathname;
    if (token) {
      const user = await LoginWithJwt();
      if (user) {
        this.props.updateUserReducer("user", user);
     
        this.handleUserRouting(user, url);
      }
    } else this.handleNoAccessRoutes(url);

    this.setState({
      page_loaded:true
    })
  }

  handleNoAccessRoutes = (url) => {
    if (url.indexOf("signin") === -1 && url.indexOf("signup") === -1) {
      this.props.history.push(LOGIN_ROUTE);
    }
  };

  handleUserRouting = (user, url) => {
    if(!url.split('/')[1]){
      if (user.is_manager) return this.props.history.push(EMPLOYEES_ROUTE);
      else
        return this.props.history.push(
          EMPLOYEE_DASHBOARD_PAGE_ROUTE.replace(':id', user._id)
        );
    }
  
  };

  close = () => {
    this.props.updateGlobalReducer("error", false);
    this.props.updateGlobalReducer("success", false);
  };
  render() {
    const { error, success } = this.props.global;
 
    const { user } = this.props.user;
    const {page_loaded} = this.state
    return (
      page_loaded ? <div>
        <SuccessPopup active msg={success} close={this.close} />
        <ErrorPopup active error={error} close={this.close} />
        <Switch>
          {user && user._id ? (
            <Route path={DASHBOARD_ROUTE} render={() => <Dashboard />} />
          ) : null}
          <Route path={LOGIN_ROUTE} render={() => <SignInForm />} />
          <Route path={SIGNUP_ROUTE} render={() => <SignUpForm />} />
          {user && user._id ? (
            <Route
              path={EMPLOYEE_DASHBOARD_ROUTE}
              render={() => <EmployeeDashboard />}
            />
          ) : null}
          <Route path='*' exact={true} component={InvalidRoute} />
        </Switch>
      </div>  :''
    );
  }
}

function mapStateToProps({ router, user, global }) {
  return { router, user, global };
}

export default withRouter(connect(mapStateToProps, actions)(App));

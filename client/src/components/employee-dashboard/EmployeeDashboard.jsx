import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import {
  EMPLOYEE_DASHBOARD_PAGE_ROUTE,
  EMPLOYEE_DASHBOARD_SETTINGS,
} from "../../tools/routes";
import EmployeePage from "../employee-page/EmployeePage";
import Settings from "../settings/Settings";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { employee_navigations } from "../navbar/navigations";
import { apiGetRequest } from "../../tools/api";
import { employee_settings } from "../settings/settings_routes";
import { hasPermission } from "../../functions/permission_functions";
import { EDIT_PROFILE } from "../settings/categories/permissions/Permissions_keys";

class EmployeeDashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    const { user } = this.props.user;
    const api = `account-settings?id=${user.user}`;
    const res = await apiGetRequest(api);
    if (res.ok) {
      this.props.updateUserReducer('permissions', res.result.permissions)
        this.props.setSystemLanguage(res.result.language)
      let navigations = employee_navigations;
      if (!hasPermission(user, res.result.permissions, EDIT_PROFILE)) {
        navigations = navigations.filter((m) => m.value !== "settings");
      }
      this.setState({
        navigations,
      });
    }
    this.setState({
      page_loaded:true
    })
  }
  render() {
    const { user } = this.props.user;
    const {language} = this.props.global
    const { navigations, page_loaded } = this.state;

    return user && navigations && page_loaded && language? (
      <div className="dashboard">
        <Router>
          <Navbar navigations={navigations} />
          <Switch>
            <Route
             
              path={EMPLOYEE_DASHBOARD_PAGE_ROUTE}
              render={() => <EmployeePage />}
            />
            <Route
              path={EMPLOYEE_DASHBOARD_SETTINGS}
              render={() => <Settings settings_routes={employee_settings} />}
            />
          </Switch>
        </Router>
      </div>
    ) : (
      ""
    );
  }
}

function mapStateToProps({ user, global }) {
  return { user, global };
}

export default withRouter(connect(mapStateToProps, actions)(EmployeeDashboard));

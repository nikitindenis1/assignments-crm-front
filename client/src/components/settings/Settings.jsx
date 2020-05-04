import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { SETTINGS_ROUTE, EMPLOYEE_DASHBOARD_SETTINGS } from "../../tools/routes";
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';


class Settings extends Component {
  render() {
    const {system_text} = this.props.global
    const {  settings_routes } = this.props;
    const {user} = this.props.user
    return (
      <div className='settings page__flex'>
        
        <Switch>
          {settings_routes.map((m, i) => {
            return <Route
            key = {i}
            exact path={m.route} render={() => m.component} />;
          })}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ user, global }) {
  return { user, global };
}

export default withRouter(connect(mapStateToProps, actions)(Settings));

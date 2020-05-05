import React, { Component } from "react";
import { permissions_options } from "./permissions_options";
import SwitchComponent from "../../../../parts/SwitchComponent";
import { connect } from "react-redux";
import * as actions from "../../../../actions/actions";
import { withRouter } from "react-router";
import { apiPostRequest } from "../../../../tools/api";
import { SETTINGS_ROUTE, EMPLOYEE_DASHBOARD_SETTINGS } from "../../../../tools/routes";
import {Link} from 'react-router-dom'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
class PermissionsSettings extends Component {
  constructor() {
    super();
    this.state = {
      user_permissions: [],
    };
  }
  update = async (permission) => {
    const { permissions, user } = this.props.user;
    let old_permissions = [...permissions]
    let updated_permissions = [...permissions]
    if (updated_permissions.includes(permission)) {
        updated_permissions = updated_permissions.filter((m) => m !== permission);
    } else {
        updated_permissions = [...updated_permissions, permission];
    }
    const body = {
        user:user._id,
        permissions:updated_permissions
    }
    const api = "account-settings/update";
    this.props.updateUserReducer('permissions', updated_permissions)
    const res = await apiPostRequest(api, body);
    if(!res.ok){
      this.props.updateUserReducer('permissions', old_permissions)
    }
  
  };

  render() {
    const { permissions, user } = this.props.user;
    const {system_text} =this.props.global
    return (
      <div className="settings__permissions">
        <header className='sticky__top'>
        <Link
        className='back__button flex__start'
        to ={user.is_manager ? SETTINGS_ROUTE  :EMPLOYEE_DASHBOARD_SETTINGS}>
          <NavigateBeforeIcon />{system_text.SETTINGS}
        </Link>
        </header>
    <h2>{system_text.EMPLOYEE_PERMISSIONS}</h2>
        <ul className="settings__permissions__list">
          {permissions_options.map((m, i) => {
            return (
              <li>
                <SwitchComponent
                  key={i}
                  active_text={system_text[m.text]}
                  inactive_text={system_text[m.text]}
                  updateEmployee={this.update}
                  value={
                    permissions.includes(m.code)
                  }
                  property_name={m.code}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ user, global }) {
  return { user, global };
}

export default withRouter(
  connect(mapStateToProps, actions)(PermissionsSettings)
);

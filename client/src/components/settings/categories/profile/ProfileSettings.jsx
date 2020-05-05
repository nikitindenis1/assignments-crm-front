import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../actions/actions";
import { withRouter } from "react-router";
import { apiGetRequest, apiPostRequest } from "../../../../tools/api";
import HandleProfile from "../../../employees/parts/HandleProfile";
import EmployeeProfile from "../../../employee-page/employee-assignments/EmployeeProfile";
import {
  SETTINGS_ROUTE,
  EMPLOYEE_DASHBOARD_SETTINGS,
} from "../../../../tools/routes";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Link } from "react-router-dom";
class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      edit_profile: false,
    };
  }

  async componentDidMount() {
    this.getProfile();
  }
  getProfile = async () => {
    const { user } = this.props.user;
    let api = "";
    if (user.is_manager) api = "users/get-profile";
    else api = "employee/get-profile";
    const res = await apiGetRequest(api);
    if (res.ok) {
      this.setState({ profile: res.result });
    }
  };
  saveProfile = async (profile, pw_changed) => {
    const { user } = this.props.user;
    let api = "";
    if (user.is_manager) api = "users/update";
    else api = "employee/update";
    const res = await apiPostRequest(api, profile);
    if (res.ok) {
   
      this.props.updateUserReducer("user", res.result);
      this.setState({
        profile,
      });
    }
    if (pw_changed) {
      this.resetProfilePassword(profile);
    }
  };

  resetProfilePassword = async (profile) => {
    const { user } = this.props.user;
    let api = "";
    let body = {
      password: profile.password,
    };
    if (user.is_manager) {
      api = "users/reset-password";
    } else {
      body["_id"] = profile._id;
      api = "employee/reset-password";
    }
    await apiPostRequest(api, body);
  };
  toggleHandleProfile = (val) => {
    this.setState({
      edit_profile: val,
    });
  };
  render() {
    const { profile, edit_profile } = this.state;
    const { user } = this.props.user;
    const { system_text } = this.props.global;
    return profile ? (
      <div className="settings__profile">
        <header className='sticky__top'>
          <Link
            className="back__button flex__start"
            to={user.is_manager ? SETTINGS_ROUTE : EMPLOYEE_DASHBOARD_SETTINGS}
          >
            <NavigateBeforeIcon />
            {system_text.SETTINGS}
          </Link>
        </header>
        <EmployeeProfile
          employee={profile}
          toggleHandleEmployee={this.toggleHandleProfile}
          hide_status={true}
        />
        {edit_profile ? (
          <HandleProfile
            profile_to_edit={profile}
            save={this.saveProfile}
            resetPassword={this.resetProfilePassword}
            toggleHandleProfile={this.toggleHandleProfile}
            edit_text={"Edit profile"}
            status_disabled={true}
          />
        ) : null}
      </div>
    ) : null;
  }
}

function mapStateToProps({ user, global }) {
  return { user, global };
}

export default withRouter(connect(mapStateToProps, actions)(ProfileSettings));

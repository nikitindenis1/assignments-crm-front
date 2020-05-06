import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import EmployeeMenu from "./parts/EmployeeMenu";
import EmploeeAssignments from "./employee-assignments/EmploeeAssignments";
import { apiGetRequest, apiPostRequest } from "../../tools/api";
import EmployeeProfile from "./employee-assignments/EmployeeProfile";
import HandleProfile from "../employees/parts/HandleProfile";

class EmployeePage extends Component {
  constructor() {
    super();
    this.state = {
      active_section: "assignments",
      assignments: [],
    };
  }

  changeSection = (profile) => {
    this.setState({
      profile
    });
  };



  async componentDidMount() {
    const id = this.props.match.params.id;
   setTimeout(() => {
    this.setState({
      page_loaded: true
    })
   }, 20);
    await this.getEmployee(id);
  }
  getEmployee = async (id) => {
    const api = `employee/get-by-id?id=${id}`;
    const res = await apiGetRequest(api);
    if (res.ok) {
      setTimeout(() => {
        this.setState({
          employee: res.result,
        });
      }, 100);
    }
  };

  updateEmployee = async (employee, pw_chaned) => {
    if (pw_chaned) this.resetEmployeePassword(employee);
    const api = "employee/update";
    const res = await apiPostRequest(api, employee);
    if (res.ok) {
      this.setState({
        employee: res.result,
      });
    }
  };

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  toggleHandleEmployee = (active) => {
    this.setState({
      handle_employee: active,
    });
  };

  resetEmployeePassword = async (profile) => {
    const api = "employee/password-reset";
    const body = {
      _id: profile._id,
      password: profile.password,
    };
    await apiPostRequest(api, body);
  };

  render() {
    const {
      employee,
      active_section,
      page_loaded,
      handle_employee,
      profile
    } = this.state;
    const { user } = this.props.user;
    const { system_text } = this.props.global;
    return page_loaded ?(
      <div
        className="employee__page"
        id={!user.is_manager ? "employee__page--employee" : ""}
      >
        {handle_employee ? (
          <HandleProfile
            toggleHandleProfile={this.toggleHandleEmployee}
            profile_to_edit={employee}
            returnEmployee={this.updateEmployee}
            save={this.updateEmployee}
            resetPassword={this.resetEmployeePassword}
            edit_text={system_text.EDIT_EMPLOYEE}
          />
        ) : (
          ""
        )}
        {user.is_manager ? (
          <EmployeeMenu
            system_text={system_text}
            changeSection={this.changeSection}
            active_section={active_section}
            active={true}
            employee={employee ? employee : {}}
            user={user}
          />
        ) : (
          ""
        )}

     <div className='page__flex'>
     <EmploeeAssignments
          hide_page = {profile} 
          employee={employee}
          updateEmployee={this.updateEmployee}
          updateParentState={this.updateState}
        />
       {profile ?  <EmployeeProfile
       show_close_btn = {true}
          toggleHandleEmployee={this.toggleHandleEmployee}
          employee={employee ? employee : {}}
          save={this.updateEmployee}
          changeSection = {this.changeSection}
        />  : ''}
     </div>
      </div>
    ) : (
      ""
    );
  }
}

function mapStateToProps({ employees, navbar, assignments, user, global }) {
  return { employees, navbar, assignments, user, global };
}

export default withRouter(connect(mapStateToProps, actions)(EmployeePage));

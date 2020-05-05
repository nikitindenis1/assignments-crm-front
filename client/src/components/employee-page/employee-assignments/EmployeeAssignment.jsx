import React, { Component } from "react";
import ElementActions from "../../../parts/ElementActions";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import { withRouter } from "react-router";
import { DELETE_ASSIGNMENTS } from "../../settings/categories/permissions/Permissions_keys";
import { hasPermission } from "../../../functions/permission_functions";
import {
  EMPLOYEE_ASSIGNMENT_ROUTE,
  EMPLOYEE_DASHBOARD_ASSIGNMENT_ROUTE,
} from "../../../tools/routes";
import "moment/locale/he";



class EmployeeAssignment extends Component {
  constructor() {
    super();
    this.state = {};
  }

  changeStatus = (val) => {
    const { m } = this.props;
    console.log(m);
    const updated = { ...m };
    updated["status"] = val;
    this.setState({
      hide: true,
    });
    setTimeout(async () => {
      await this.props.createAndUpdateAssignment(updated);
      this.setState({
        hide: false,
      });
    }, 500);
  };
  goToAssignment = (m) => {
    console.log(m);
    const { user } = this.props.user;
    if (user.is_manager) {
      this.props.history.push(
        EMPLOYEE_ASSIGNMENT_ROUTE.replace(":id", m.employee_id).replace(
          ":assignment_id",
          m._id
        )
      );
    } else {
      this.props.history.push(
        EMPLOYEE_DASHBOARD_ASSIGNMENT_ROUTE.replace(":id", user._id).replace(
          ":assignment_id",
          m._id
        )
      );
    }
  };
  render() {
    const { m } = this.props;
    console.log(m);
    const { permissions, user } = this.props.user;
    const { hide } = this.state;
    const {language} = this.props.global;
    let options = [
      {
        text: "VIEW",
        function: this.goToAssignment,
        param1: m,
      },
      {
        text: "MARK_AS_PENDING",
        function: this.changeStatus,
        param1: "pending",
      },
      {
        text: "MARK_AS_DONE",
        function: this.changeStatus,
        param1: "done",
      },
      {
        text: "MARK_AS_PROGRESS",
        function: this.changeStatus,
        param1: "in_progress",
      },
      {
        text: "REMOVE",
        function: this.props.handleDelete,
        param1: m,
        disabled: !hasPermission(user, permissions, DELETE_ASSIGNMENTS),
      },
    ];
    options = options.filter((val) => {
      if (val.param1 !== m.status) return val;
    });

    return (
      <li
        id={hide ? "employee__page__assignment__hidden" : ""}
        className="employee__page__assignment flex__start"
      >
        <div>
          <h4 style ={{
            display:'none'
          }}>Title</h4>
          <h3>{m.title}</h3>
        </div>
        <div>
          <h4
          style ={{
            display:'none'
          }}
          >Deadline</h4>
          <h3>{m.deadline ? moment(m.deadline)
                    .locale(language.substring(0, 2))
                    .format("ddd, LL") : "-"}</h3>
        </div>
        <ElementActions width="150px" options={options} />
      </li>
    );
  }
}

function mapStateToProps({ user,global }) {
  return { user,global };
}

export default withRouter(
  connect(mapStateToProps, actions)(EmployeeAssignment)
);

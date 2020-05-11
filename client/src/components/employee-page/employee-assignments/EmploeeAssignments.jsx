import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import { apiGetRequest, apiPostRequest } from "../../../tools/api";
import EmployeeTodoList from "./EmployeeTodoList";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  EMPLOYEE_ROUTE,
  EMPLOYEE_ASSIGNMENT_ROUTE,
  EMPLOYEE_DASHBOARD_PAGE_ROUTE,
  EMPLOYEE_DASHBOARD_ASSIGNMENT_ROUTE,
} from "../../../tools/routes";
import EmployeeAssignmentPage from "../employee-assignment-page/EmployeeAssignmentPage";
import HandleAssignment from "../../assignments/parts/HandleAssignment";
import AssignmentComments from "../parts/AssignmentComments";
import PopupWithFunction from "../../../parts/PopupWithFunction";

class EmploeeAssignments extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.getAssignments();
  }

  getAssignments = async () => {
    const api = "assignment";
    const res = await apiGetRequest(api);
    if (res.ok) {
      this.setState({
        assignments_list: res.result,
        assignments_loaded: true,
      });
    }
  };

 
  handleAssignment = (action, new_assignment, assignment_to_edit) => {
    this.setState({
      handle_assignment: action,
      new_assignment,
      assignment_to_edit,
    });
  };

  createAndUpdateAssignment = async (assignment) => {
    const { employee } = this.props;
    const api = `employee_assignment`;
    assignment["employee_id"] = employee._id;
    assignment["status"] = assignment.status ? assignment.status : "pending";
    console.log(assignment);
    const res = await apiPostRequest(api, assignment);
    if (res.ok) {
      let index = employee.assignments.findIndex(
        (m) => m._id == assignment._id
      );
      let updated_employee = JSON.parse(JSON.stringify(employee))
      if (index >= 0) {
        updated_employee.assignments.splice(index, 1, res.result);
        this.props.updateGlobalReducer("success", "Assignment updated");
      } else {
        updated_employee.assignments.unshift(res.result);
        this.props.updateGlobalReducer("success", "Assignment created");
      }
      this.props.updateParentState('employee',updated_employee);
      const url = window.location.pathname
      if(url.indexOf('assignment') > -1){
        this.updateAssignmentInAssignmentPage(res.result)
    }
    }
  };

  handleDelete = (assignment_to_remove) => {
    console.log(assignment_to_remove);
    this.setState({
      assignment_to_remove,
    });
  };
  handleAssignmentComments = (assignment_comments) => {
    this.setState({
      assignment_comments,
    });
  };

  remove = async () => {
    const { assignment_to_remove } = this.state;
    const { employee } = this.props;
    this.setState({
      delete_loading:true
    })
    assignment_to_remove["employee_id"] = employee._id;
    const api = "employee_assignment/delete";
    const res = await apiPostRequest(api, assignment_to_remove);
    if (res.ok) {
      let updated = { ...employee };
      let index = updated.assignments.findIndex(
        (m) => m._id == assignment_to_remove._id
      );
      if (index >= 0) {
        updated.assignments.splice(index, 1);
        this.props.updateEmployee(updated);
        this.close();
      }
      const url = window.location.pathname
      if(url.indexOf('assignment') === 0){
          this.props.history.push(EMPLOYEE_ROUTE.replace(':id', employee._id))
      }
    }
  setTimeout(() => {
    this.setState({
      delete_loading:false
    })
  }, 300);
  };

  close = () => {
    this.handleDelete();
  };


updateAssignmentInAssignmentPage = (page_assignment) => {
    this.setState({
        page_assignment
    })
}
updateState = (name, value) => {
    this.setState({
        [name]:value
    })
}

  render() {
    const {
      assignments_list,
      assignments_loaded,
      assignment_comments,
      handle_assignment,
      new_assignment,
      assignment_to_edit,
      assignment_to_remove,
      page_assignment,
      delete_loading
    } = this.state;
    const {system_text} = this.props.global
    const { active_section, employee, hide_page } = this.props;
    const {user} = this.props.user
    return (
      <div   
      style ={{
        opacity:hide_page ? 0 : 1,
        transition:'0.2s all'
      }}>
      <PopupWithFunction
          text={system_text.REMOVE_ASSIGNMENT_QUESTION}
          name={`${assignment_to_remove ? assignment_to_remove.title : ""}?`}
          active={assignment_to_remove}
          submit={this.remove}
          close={this.close}
          submit_text={system_text.YES}
          close_text={system_text.NO}
          loading = {delete_loading}
        />
        {assignment_comments ? (
          <AssignmentComments
            updateAssignment={this.createAndUpdateAssignment}
            assignment={assignment_comments}
            updateParentState={this.updateState}
            system_text = {system_text}
          />
        ) : (
          ""
        )}
        {handle_assignment ? (
          <HandleAssignment
            new_assignment={new_assignment}
            edit={this.createAndUpdateAssignment}
            create={this.createAndUpdateAssignment}
            assignment_to_edit={assignment_to_edit}
            toggleHandleAssignment={this.handleAssignment}
            from_employee_page={true}
            handleDelete = {this.handleDelete}
            assignments_list = {assignments_list}
           
          />
        ) : null}

        <Switch>
          <Route
            exact
            path={user.is_manager ? EMPLOYEE_ROUTE   : EMPLOYEE_DASHBOARD_PAGE_ROUTE}
            render={() => (
              <EmployeeTodoList
                handleAssignmentComments={this.handleAssignmentComments}
                handleAssignment={this.handleAssignment}
                updateEmployee={this.updateEmployee}
                employee={employee ? employee : {}}
                assignments_loaded={assignments_loaded}
                createAndUpdateAssignment = {this.createAndUpdateAssignment}
                handleDelete = {this.handleDelete}
              />
            )}
          />
          <Route
           exact
            path={user.is_manager ? EMPLOYEE_ASSIGNMENT_ROUTE : EMPLOYEE_DASHBOARD_ASSIGNMENT_ROUTE}
            render={() => (
              <EmployeeAssignmentPage
                employee={employee}
                active_section={active_section}
                handleAssignment={this.handleAssignment}
                handleDelete = {this.handleDelete}
                assignment = {page_assignment}
                updateAssignmentInAssignmentPage = {this.updateAssignmentInAssignmentPage}
                createAndUpdateAssignment = {this.createAndUpdateAssignment}
                handleAssignmentComments = {this.handleAssignmentComments}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ employees, navbar, assignments, user, global }) {
  return { employees, navbar, assignments, user , global};
}

export default withRouter(
  connect(mapStateToProps, actions)(EmploeeAssignments)
);

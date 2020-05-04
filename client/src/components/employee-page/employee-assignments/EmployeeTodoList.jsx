import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import { withRouter } from "react-router";
import EmployeeAssignment from "./EmployeeAssignment";
import AssignmentLoader from "../../assignments/parts/AssignmentLoader";
import { hasPermission } from "../../../functions/permission_functions";
import { CREATE_ASSIGNMENTS } from "../../settings/categories/permissions/Permissions_keys";
import { filterEmployeeAssignments } from "../../../functions/employe_assignments_functions";
import NoData from "../../../parts/NoData";
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import BtnWithTooltip from "../../../parts/BtnWithTooltip";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

const getAssignmentsAmount = (arr, value) => {
  if (arr && arr.length > 0) {
    let num = 0;
    arr.forEach((element) => {
      if (element.status === value) {
        num++;
      }
    });
    return num;
  } else {
    return 0;
  }
};

class EmployeeTodoList extends Component {
  constructor() {
    super();
    this.state = {
      status: "pending",
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        page_loaded: true,
      });
    }, 20);
  }
  handleFilter = (val) => {
    this.setState({
      status: val,
    });
  };
  componentWillUnmount() {
    this.toggleAssignmentsList(false);
  }
  toggleAssignmentsList = (val) => {
    this.setState({
      show_assignments: val,
    });
  };

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  openCreateAssignment = () => {
    this.props.handleAssignment(true, true);
  };
  render() {
    const { employee, assignments_loaded } = this.props;
    const { user, permissions } = this.props.user;
    const { status, page_loaded } = this.state;
    const { system_text } = this.props.global;
    return (
      <div
        style={{
          opacity: page_loaded ? 1 : 0,
        }}
        className="employee__page__assignments"
      >
        <div className="page__flex">
          <header className="employee__page__assignments__header flex__start">
            {hasPermission(user, permissions, CREATE_ASSIGNMENTS) ? (
            
                <BtnWithTooltip
               svg = {<LibraryAddOutlinedIcon />}
               handleClick = {() => this.props.handleAssignment(true)}
               tooltip = {system_text.CREATE}
                />
    
           
            ) : (
              ""
            )}
          </header>
          <div className="employee__page__assignments__flex ">
            <ul
              className="flex__start"
              id="employee__page__assignments__actions"
            >
              {system_text.ASSIGNMENT_STATUS_ARR.map((m, i) => {
                return (
                  <li
                    key={i}
                    className="flex__center"
                    id = {status === m.value ? 'employee__page__assignments__actions--active' : ''}
                    onClick={() => this.handleFilter(m.value)}
                  >
                    {m.img}
                    <h3> {m.text}</h3>
                    <h5>
                      ({getAssignmentsAmount(employee.assignments, m.value)})
                    </h5>
                  </li>
                );
              })}
            </ul>
            {filterEmployeeAssignments(employee.assignments, status) ? (
              <section
                id="employee__assignments__titles"
                className="flex__start"
              >
               {system_text.EMPLOYEE_ASSIGNMENTS_TITLES.map((m,i) => {
                 return <h3 key = {i}>{m}</h3>
               })}
              </section>
            ) : null}
            <ul className="flex__start" id="employee__assignments">
              {!assignments_loaded ? (
                <AssignmentLoader arr={[...Array(3).keys()]} />
              ) : assignments_loaded &&
                !filterEmployeeAssignments(employee.assignments, status) ? (
                <NoData
                  create={this.openCreateAssignment}
                  text={system_text.NO_ASSIGNMENTS}
                />
              ) : (
                filterEmployeeAssignments(employee.assignments, status).map(
                  (m) => {
                    return (
                      <EmployeeAssignment
                        key={m._id}
                        m={m}
                        createAndUpdateAssignment={
                          this.props.createAndUpdateAssignment
                        }
                        handleAssignment={this.props.handleAssignment}
                        handleDelete={this.props.handleDelete}
                        key={m._id}
                        handleAssignmentComments={
                          this.props.handleAssignmentComments
                        }
                      />
                    );
                  }
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ employees, assignments, user, global }) {
  return { employees, assignments, user, global };
}

export default withRouter(connect(mapStateToProps, actions)(EmployeeTodoList));

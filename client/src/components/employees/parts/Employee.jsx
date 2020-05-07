import React, { Component } from "react";
import { EMPLOYEE_ROUTE } from "../../../tools/routes";
import { withRouter } from "react-router-dom";
import ElementActions from "../../../parts/ElementActions";
import PersonIcon from "@material-ui/icons/Person";

class Employee extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoad = () => {
    this.setState({
      image_loaded: true,
    });
  };

  goToEmployeePage = () => {
    const { employee } = this.props;
    this.props.history.push(EMPLOYEE_ROUTE.replace(":id", employee._id));
  };
  edit = () => {
    const { employee } = this.props;
    this.props.toggleHandleEmployee(true, employee);
  };
  remove = () => {
    const { employee } = this.props;
    this.props.handleRemove(employee);
  };

  render() {
    const { employee, list_view, system_text } = this.props;
    const { avatar, name, assignments_count } = employee;
    const { image_loaded } = this.state;

    const options = [
      {
        text: "EMPLOYEE_PAGE",
        function: this.goToEmployeePage,
      },
      {
        text: "EDIT",
        function: this.edit,
      },
      {
        text: "DELETE",
        function: this.remove,
      },
    ];

    return (
      <li
        className={
          list_view === "row"
            ? "employees__list__employee flex__start"
            : "employees__list__employee flex__column"
        }
      >
        <div 
        onClick = {() => this.goToEmployeePage()}
        className="employees__list__employee__name flex__start">
          <figure
            style={{
              border: avatar ? "1px solid rgba(1, 58, 102, 0.3)" : "",
            }}
            className="employees__list__employee__avatar flex__center"
          >
            {avatar ? (
              <>
                <img
                  style={{
                    opacity: image_loaded ? 1 : 0,
                  }}
                  src={avatar}
                  alt=""
                  onLoad={() => this.onLoad()}
                />
                {!image_loaded ? (
                  <aside className="avatar__loader"></aside>
                ) : (
                  ""
                )}
              </>
            ) : (
              <PersonIcon />
            )}
          </figure>
          <h3>{name ? name : "-"}</h3>
        </div>
        <div className="employees__list__employee__stats flex__start">
          <h3>{assignments_count ? assignments_count.pending : 0}</h3>
          <h3>{assignments_count ? assignments_count.in_progress : 0}</h3>
          <h3>{assignments_count ? assignments_count.done : 0}</h3>
        </div>
        <div 
        style ={{
          display:'none'
        }}
        id='employee__mobile__stats'
        className="employees__list__employee__stats flex__start">
          <span>
      <h5>{system_text.pending}</h5>
          <h3>{assignments_count ? assignments_count.pending : 0}</h3>
          </span>
          <span>
          <h5>{system_text.in_progress}</h5>
            <h3>{assignments_count ? assignments_count.in_progress : 0}</h3>
          </span>
         <span>
         <h5>{system_text.done}</h5>
          <h3>{assignments_count ? assignments_count.done : 0}</h3>
         </span>
        </div>
        <ElementActions options={options} />
      </li>
    );
  }
}

export default withRouter(Employee);

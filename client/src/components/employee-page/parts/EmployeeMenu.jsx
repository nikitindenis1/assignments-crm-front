import React, { Component } from "react";
import { Link } from "react-router-dom";
import { EMPLOYEES_ROUTE, EMPLOYEE_ROUTE } from "../../../tools/routes";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import PersonIcon from "@material-ui/icons/Person";

class EmployeeMenu extends Component {


  showProfile = () => {
    this.props.changeSection(true)
  }
  render() {
    const { active, employee, system_text } = this.props;

    return (
      <div
        id={active ? "employee__page__menu--active" : ""}
        className="employee__page__menu flex__start"
      >
        <Link
          to={EMPLOYEES_ROUTE}
          className="flex__start employee__page__menu__back"
        >
          <ArrowBackIosOutlinedIcon />
          <h4>{system_text.EMPLOYEES}</h4>
        </Link>
        <figure 
        onClick = {() => this.showProfile()}
        className="flex__center">
          {employee.avatar ? <img src={employee.avatar} /> : <PersonIcon />}
        </figure>
        <h3 className="employee__page__menu__name">{employee.name}</h3>
      </div>
    );
  }
}

export default EmployeeMenu;

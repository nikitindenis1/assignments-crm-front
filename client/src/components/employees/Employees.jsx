import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import Employee from "./parts/Employee";
import HandleProfile from "./parts/HandleProfile";
import PopupWithFunction from "../../parts/PopupWithFunction";
import { apiGetRequest, apiPostRequest } from "../../tools/api";
import EmployeeLoader from "./parts/EmployeeLoader";
import NoData from "../../parts/NoData";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BtnWithTooltip from "../../parts/BtnWithTooltip";



class Employees extends Component {
  constructor() {
    super();
    this.state = {
      list_view: "row",
    };
  }

  async componentDidMount() {
    const api = "employee/all";
   setTimeout(() => {
    this.setState({
      page_loaded:true,
    })
   }, 20);
    const res = await apiGetRequest(api);
    if (res.ok) {
      this.setState({
        loaded: true,
        employees_list:res.result
      });
    }
  }
  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  toggleHandleEmployee = (status, employee) => {
    this.setState({
      handle_employee: status,
      employee,
    });
  };

  handleRemove = (employee) => {
    this.setState({
      employee_to_remove: employee,
    });
  };
  remove = async () => {
    const { employee_to_remove, employees_list } = this.state;
    this.setState({
      remove_loading:true
    })
    const api = "employee/delete";
    const res = await apiPostRequest(api, { id: employee_to_remove._id });
    if (res.ok) {
      this.props.removeEmployee(employee_to_remove, employees_list);
      this.setState({
        employees_list:employees_list.filter(m => m._id !== employee_to_remove._id)
      })
      this.close();
    }
    setTimeout(() => {
      this.setState({
        remove_loading:false
      })
    }, 400);
  };
  close = () => {
    this.setState({
      employee_to_remove: "",
    });
  };

  handleView = (view) => {
    this.setState({
      list_view: view,
    });
  };

  saveEmployee = async (profile, pw_changed) => {  
    if (pw_changed) await this.resetEmployeePassword(profile);
    if (profile._id) this.updateEmployee(profile);
    else this.createEmployee(profile);
    };

  createEmployee = async (profile) => {
 
    const api = "employee/create";
    const res = await apiPostRequest(api, profile);
    if (res.ok) {
      this.props.updateGlobalReducer(
        "success",
        "Employee created successfully"
      );
      let employees_list = JSON.parse(JSON.stringify(this.state.employees_list))
      this.setState({
        employees_list:[res.result, ...employees_list]
      })
    } else {
      this.props.updateGlobalReducer("error", res.result ? res.result : "Failed to create employee");
    }
  };

  updateEmployee = async (profile) => {
  
    const api = "employee/update";
    const res = await apiPostRequest(api, profile);
    if (res.ok) {
      this.props.updateGlobalReducer(
        "success",
        "Employee updated successfully"
      );
      let employees_list = JSON.parse(JSON.stringify(this.state.employees_list))
      let index = employees_list.findIndex(m => m._id == profile._id)
      if(index >= 0){
        employees_list.splice(index,1 ,res.result)
        this.setState({
          employees_list
        })
      }
    } else {
      this.props.updateGlobalReducer("error", "Failed to update employee");
    }
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
      employees_list,
      employee,
      handle_employee,
      employee_to_remove,
      list_view,
      loaded,
      page_loaded,
      remove_loading
    } = this.state;
    const {system_text} = this.props.global
  

    return (
      <div 
      style ={{
        opacity:page_loaded ? 1 : 0
      }}
      className="employees">
        <PopupWithFunction
          text={system_text.REMOVE_TEXT}
          name={`${employee_to_remove ? employee_to_remove.name : ""}?`}
          active={employee_to_remove}
          submit={this.remove}
          close={this.close}
          submit_text={system_text.YES}
          close_text={system_text.NO}
          loading = {remove_loading}
        />
        {handle_employee ? (
          <HandleProfile
            toggleHandleProfile={this.toggleHandleEmployee}
            profile_to_edit={employee}
            save={this.saveEmployee}
            resetPassword={this.resetEmployeePassword}
            edit_text={system_text.EDIT_EMPLOYEE}
            create_text={system_text.CREATE_EMPLOYEE}
          />
        ) : (
          ""
        )}
        <div className="page__flex">
          <header className="flex__start employees__header">
            <BtnWithTooltip
                   svg = {<PersonAddIcon />}
                   handleClick = {this.toggleHandleEmployee}
                   value = {true}
                   tooltip = {system_text.CREATE}
                    />
          </header>
         {loaded && employees_list && employees_list.length > 0 ? <>
         <section className='titles__section flex__start'>
            {system_text.EMPLOYEES_TITLES.map((m, i) => {
              return <h3 key = {i}>{m}</h3>
            })}
          </section>
          <ul className="employees__list flex__start">
            {
              employees_list.map((m) => {
                return (
                  <Employee
                    list_view={list_view}
                    toggleHandleEmployee={this.toggleHandleEmployee}
                    employee={m}
                    key={m._id}
                    handleRemove={this.handleRemove}
                  />
                );
              })
            }
          </ul>
         </> : !loaded ? 
        <EmployeeLoader arr={[...Array(5).keys()]} /> : 
        <NoData text = {system_text.NO_EMPLOYEES}/>
        }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ employees, user, global }) {
  return { employees, user, global };
}

export default withRouter(connect(mapStateToProps, actions)(Employees));

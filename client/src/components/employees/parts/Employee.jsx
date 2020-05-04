import React, { Component } from "react";
import { EMPLOYEE_ROUTE } from "../../../tools/routes";
import { withRouter } from "react-router-dom";
import ElementActions from "../../../parts/ElementActions";
import PersonIcon from "@material-ui/icons/Person";

class Employee extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  onLoad = () => {
    this.setState({
      image_loaded:true
    })
  }

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
    const { employee, list_view } = this.props;
    const { avatar, name, assignments_count } = employee;
    const {image_loaded} = this.state
   
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
      className = {list_view  ==='row'? 'employees__list__employee flex__start' :
       'employees__list__employee flex__column'}>
        

       <div className='flex__start'>
       <figure
       style ={{
         border:avatar? '1px solid rgba(1, 58, 102, 0.3)'  :''
       }}
       className='employees__list__employee__avatar flex__center'>
        {avatar ? 
        <>
         <img
         style ={{
           opacity:image_loaded ? 1 : 0
         }}
         src={avatar} alt="" 
        onLoad = {() => this.onLoad()}
        /> 
        {!image_loaded ?  <aside 
         className='avatar__loader'></aside> : ''}
        </>
        :
         <PersonIcon />}
        </figure>
        <h3>{name ? name : "-"}</h3>
       </div>
       <h3 className='employees__list__employee__status'>
             {assignments_count ? assignments_count.pending : 0}
            </h3>
            <h3 className='employees__list__employee__status'>
            {assignments_count ? assignments_count.in_progress : 0}
            </h3>
            <h3 className='employees__list__employee__status'>
            {assignments_count ? assignments_count.done : 0}
            </h3>
        <ElementActions options={options} />
      </li>
    );
  }
}

export default withRouter(Employee);

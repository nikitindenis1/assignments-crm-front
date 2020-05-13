import React, { Component } from 'react';
import EmployeeAssignment from '../employee-page/employee-assignments/EmployeeAssignment';
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'
import { withRouter } from 'react-router';
import EmployeePage from '../employee-page/EmployeePage';
import EmploeeAssignments from '../employee-page/employee-assignments/EmploeeAssignments';
import { apiGetRequest } from '../../tools/api';


class ManagerAssignments extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    async componentDidMount(){
        const {user} = this.props.user
        const api = `employee_assignment/get-by-employee-id?employee_id=${user._id}`
        const res = await apiGetRequest(api)
      
       if(res.ok){
        let updated_user = {...user}
            updated_user.assignments = res.result
            this.props.updateUserReducer('user', updated_user)
       }
       this.setState({
           page_loaded:true
       })
    }


    render() {
        const {user} = this.props.user
        const {page_loaded} = this.state
        
        return (
            <div className='manager__assignments employee__page'>
                   <div className='page__flex'>
                   {page_loaded ?  <EmploeeAssignments
                    employee = {user}
                    manager_assignments = {true}
                    />  : ''}
                   </div>
            </div>
        );
    }
}

function mapStateToProps({ user, global }) {
    return { user, global }
  }
  
  export default withRouter(connect(mapStateToProps, actions)(ManagerAssignments))
  
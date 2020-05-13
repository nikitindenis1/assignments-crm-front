import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom"
import { EMPLOYEES_ROUTE, EMPLOYEE_ROUTE, ASSIGNMENTS_ROUTE, OVERVIEW_ROUTE, SETTINGS_ROUTE, EMPLOYEE_ASSIGNMENT_ROUTE, PERSONAL_ASSIGNMENTS_ROUTE } from '../../tools/routes'
import Employees from '../employees/Employees'
import Navbar from '../navbar/Navbar'
import EmployeePage from '../employee-page/EmployeePage'
import AssignmentTemplates from '../assignments/AssignmentTemplates'
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'
import Overview from '../overview/Overview'
import Settings from '../settings/Settings'
import { manager_navigations } from '../navbar/navigations'
import { manager_settings } from '../settings/settings_routes'
import { apiGetRequest } from '../../tools/api'
import EmployeeAssignmentPage from '../employee-page/employee-assignment-page/EmployeeAssignmentPage'
import InvalidRoute from '../invalid-route/InvalidRoute'
import ManagerAssignments from '../manager-assignments/ManagerAssignments'

class Dashboard extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  async componentDidMount(){
    const {user} = this.props.user
    console.log(user)
    const api = `account-settings?id=${user._id}`
    const res  = await apiGetRequest(api)
    if(res.ok){
    
        this.props.updateUserReducer('permissions', res.result.permissions)
        this.props.updateUserReducer('system_logo', res.result.avatar)
        this.props.setSystemLanguage(res.result.language)
    }
  }
  
    render () {
      const {user, system_logo} = this.props.user
        const {language} = this.props.global
        return (
          user && user.is_manager && language?   <div className='dashboard'>
                  {
                    system_logo ? 
                    <div className='dashboard__logo page__flex'>
                      <img src={system_logo} />
                    </div>
                    : ''
                  }
                    <Router>
                        <Navbar 
                        navigations  ={manager_navigations}
                        />
                        <Switch>
                            <Route exact path={EMPLOYEES_ROUTE} render={() => <Employees />} />
                            <Route exact path={OVERVIEW_ROUTE} render={() => <Overview />} />
                            <Route  path={EMPLOYEE_ROUTE} render={() => <EmployeePage />} />
                            <Route  path={EMPLOYEE_ASSIGNMENT_ROUTE} render={() => <EmployeeAssignmentPage />} />
                            <Route exact path={ASSIGNMENTS_ROUTE} render={() => <AssignmentTemplates />} />
                            <Route  path={PERSONAL_ASSIGNMENTS_ROUTE} render={() => <ManagerAssignments />} />
                            <Route  path={SETTINGS_ROUTE} render={() => <Settings 
                            settings_routes = {manager_settings}
                            />} />
                             <Route path='*' exact={true} component={InvalidRoute} />
                        </Switch>
                    </Router>
                </div> : ''
        )
    }
}

function mapStateToProps({ user, global }) {
    return { user, global }
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Dashboard))
  
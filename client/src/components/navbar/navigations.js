
import React, { Component } from 'react';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { EMPLOYEES_ROUTE, ASSIGNMENTS_ROUTE, OVERVIEW_ROUTE, EMPLOYEE_DASHBOARD_SETTINGS, SETTINGS_ROUTE, EMPLOYEE_DASHBOARD_PAGE_ROUTE } from '../../tools/routes';
import SettingsIcon from "@material-ui/icons/Settings";



export  const manager_navigations = [
    // {
    //     url: OVERVIEW_ROUTE,
    //     text: 'Dashboard',
    //     value:'overview',
    //     img: <DashboardIcon />
    // },
    {
        url: EMPLOYEES_ROUTE,
        text: 'EMPLOYEES',
        value:'employees',
        img: <PeopleAltIcon />
    },
    {
        url: ASSIGNMENTS_ROUTE,
        text: 'TEMPLATES',
        value:'assignments',
        img: <AssignmentIcon />
    },
    {
        url: SETTINGS_ROUTE,
        text: 'SETTINGS',
        value:'settings',
        img: <SettingsIcon />,
        last:true
    }
]

export  const employee_navigations = [
    {
        url: EMPLOYEE_DASHBOARD_PAGE_ROUTE,
        text: 'ASSIGNMENTS',
        value:'assignments',
        img: <AssignmentIcon />,
        param:':id'
    },
    {
        url: EMPLOYEE_DASHBOARD_SETTINGS,
        text: 'SETTINGS',
        value:'settings',
        img: <SettingsIcon />,
        last:true
    },
   
]
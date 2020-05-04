import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { PROFILE_SETTINGS_ROUTE, EMPLOYEE_DASHBOARD_SETTINGS_PROFILE, PERMISSIONS_SETTINGS_ROUTE, SYSTEM_SETTINGS_ROUTE } from '../../../tools/routes';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SettingsSystemDaydreamIcon from '@material-ui/icons/SettingsSystemDaydream';
export const employee_settings_categories = [
    {
        name:'PROFILE',
        url:EMPLOYEE_DASHBOARD_SETTINGS_PROFILE,
        img:<PersonIcon />,
    }
]



export const manager_settings_categories = [
    {
        name:'PROFILE',
        url:PROFILE_SETTINGS_ROUTE,
        img:<PersonIcon />,
    },
    {
        name:'PERMISSIONS',
        url:PERMISSIONS_SETTINGS_ROUTE,
        img:<NotInterestedIcon />,
    },
    {
        name:'SYSTEM',
        url:SYSTEM_SETTINGS_ROUTE,
        img:<SettingsSystemDaydreamIcon />,
    }
]

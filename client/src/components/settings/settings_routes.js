import SettingsSelect from "./categories/SettingsSelect";
import { SETTINGS_ROUTE, PROFILE_SETTINGS_ROUTE, EMPLOYEE_DASHBOARD_SETTINGS, EMPLOYEE_DASHBOARD_SETTINGS_PROFILE, PERMISSIONS_SETTINGS_ROUTE, SYSTEM_SETTINGS_ROUTE } from "../../tools/routes";
import React, { Component } from 'react'
import ProfileSettings from "./categories/profile/ProfileSettings";
import PermissionsSettings from "./categories/permissions/PermissionsSettings";
import SystemSettings from "./categories/system/SystemSettings";

export const manager_settings = [
    {
        component:<SettingsSelect />,
        route:SETTINGS_ROUTE
    },
    {
        component:<ProfileSettings />,
        route:PROFILE_SETTINGS_ROUTE
    },
    {
        component:<PermissionsSettings />,
        route:PERMISSIONS_SETTINGS_ROUTE
    },
    {
        component:<SystemSettings />,
        route:SYSTEM_SETTINGS_ROUTE
    }
]


export const employee_settings = [
    {
        component:<SettingsSelect />,
        route:EMPLOYEE_DASHBOARD_SETTINGS
    },
    {
        component:<ProfileSettings />,
        route:EMPLOYEE_DASHBOARD_SETTINGS_PROFILE
    }
]
import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import { manager_settings_categories, employee_settings_categories } from "./settings_categories";

class SettingsSelect extends Component {
  constructor(){
    super()
    this.state = {

    }
    
  }

  componentDidMount(){
      const {user} = this.props.user
      console.log(user)
        let categories = ''
        if(user.is_manager) categories = manager_settings_categories
        else categories = employee_settings_categories
        this.setState({
          categories
        })
  }
  goToPage = (url) => {
    this.props.history.push(url);
  };
  render() {
    const {system_text} = this.props.global
      const {categories} = this.state
    return (
      <div className="settings__select">
        <ul className="settings__select__list flex__start">
          {categories && categories.length > 0 ?
          categories.map((m) => {
            return (
              <li 
              className='settings__select__list__element flex__column'
              onClick={() => this.goToPage(m.url)}>
                {m.img}
                <h4>{system_text[m.name]}</h4>
              </li>
            );
          })  :''}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ user, global }) {
  return { user, global };
}

export default withRouter(connect(mapStateToProps, actions)(SettingsSelect));

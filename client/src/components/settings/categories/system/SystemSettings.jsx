import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../actions/actions";
import { apiPostRequest } from "../../../../tools/api";
import SelectBox from "../../../../parts/SelectBox";
import IsraelImg from "../../../../images/flags/israel.svg";
import UsaImg from "../../../../images/flags/usa.svg";
import SystemLoader from "./SystemLoader";
import {Link} from 'react-router-dom'
import { SETTINGS_ROUTE, EMPLOYEE_DASHBOARD_SETTINGS } from "../../../../tools/routes";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
const languages = [
  { name: "English", value: "english", img: UsaImg },
  { name: "Hebrew", value: "hebrew", img: IsraelImg },
];
class SystemSettings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { language } = this.props.global;
    let selected = languages.filter((m) => m.value === language)[0];
    console.log(selected, language);
    this.setState({
      selected,
    });
  }
  changeLanguage = async (language) => {
    const { user } = this.props.user;
    const api = "account-settings/update";
    this.setState({
        loading:true
       })
    setTimeout(async () => {
        const body = {
            user: user._id,
            language: language.value,
          };
          try {
            
            await apiPostRequest(api, body).then((res) => {
              this.props.setSystemLanguage(res.result.language);
              let selected = languages.filter(
                (m) => m.value === res.result.language
              )[0];
              this.setState({
                selected,
              });
              
            });
          } catch (error) {
            
          }
    }, 500);

  };


  render() {
    const { system_text } = this.props.global;
    const { selected, loading } = this.state;
    const {user} =this.props.user
    return (
      <div className="settings__system">
          <header>
        <Link
        className='back__button flex__start'
        to ={user.is_manager ? SETTINGS_ROUTE  :EMPLOYEE_DASHBOARD_SETTINGS}>
          <NavigateBeforeIcon />{system_text.SETTINGS}
        </Link>
        </header>
       {loading ? <SystemLoader
       text = {system_text.LANGUAGE_LOADING}
       close = {() => this.setState({loading:false})}
       /> : ''}
        <section className="settings__system__section">
          <h2>{system_text.LANGUAGE_SELECT}</h2>
          <SelectBox
            value={selected}
            options={languages}
            handleSelect={this.changeLanguage}
          />
        </section>
      </div>
    );
  }
}
function mapStateToProps({ user, global }) {
  return { user, global };
}

export default connect(mapStateToProps, actions)(SystemSettings);

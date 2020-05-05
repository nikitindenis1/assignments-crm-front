import React, { Component } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

class EmployeeProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 20);
  }
close = () => {
  this.setState({
    loaded:false
  })
    setTimeout(() => {
      this.props.changeSection(false)
    }, 100);
}
  render() {
    const { employee, hide_status, show_close_btn } = this.props;
    const { loaded } = this.state;
    const { system_text } = this.props.global;
    const { name, phone, position, email, active, avatar } = employee;

    return (
      <div
      style ={{
        opacity:loaded  ?1 : 0
      }}
        className="employee__page__personal page__flex"
      >
       {show_close_btn  ? <button
        className='employee__page__personal__close'
        onClick = {() => this.close()}
        ><CloseOutlinedIcon /></button>  :''}
        <section className="flex__start">
          <figure className="employee__img flex__center">
            {avatar ? <img src={avatar} alt="" /> : <PersonIcon />}
          </figure>
          <button
            className="employee__page__edit save__btn"
            onClick={() => this.props.toggleHandleEmployee(true)}
          >
            {system_text.EDIT}
          </button>
        </section>
        <ul className="employee__page__personal__details flex__start">
          <li>
            <h5>{system_text.NAME}</h5>
            <h3>{name ? name : "-"}</h3>
          </li>
          <li>
            <h5>{system_text.EMAIL}</h5>
            <h3>{email ? email : "-"}</h3>
          </li>
          <li>
            <h5>{system_text.PHONE}</h5>
            <h3>{phone ? phone : "-"}</h3>
          </li>
          <li>
            <h5>{system_text.POSITION}</h5>
            <h3>{position ? position : "-"}</h3>
          </li>
          {!hide_status ? (
            <li>
              <h5>{system_text.STATUS}</h5>
              <h3>{active ? system_text.ACTIVE : system_text.INACTIVE}</h3>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ assignments, global }) {
  return { assignments, global };
}

export default connect(mapStateToProps, actions)(EmployeeProfile);

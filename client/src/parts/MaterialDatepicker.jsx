import React, { Component } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import DateFnsUtils from "@date-io/date-fns";
import heLocale from "date-fns/locale/he";
import enLocale from "date-fns/locale/en-US";
import EventIcon from '@material-ui/icons/Event';
class MaterialDatepicker extends Component {
  constructor() {
    super();
    this.state = {
      date: moment().toDate(),
    };
  }

  handleDateChange = (date) => {
    const { property_name } = this.props;
    this.props.sendDate(property_name, moment(date));
  };
  render() {
    const { date, title } = this.props;
    const { language, system_text } = this.props.global;
    const localeMap = {
      en: enLocale,
      he: heLocale,
    };

    return (
      <div className="material__datepicker">
        <div className='material__datepicker__desktop'>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={localeMap[language.substring(0, 2)]}
        >
          <div>
            <h3>{title}</h3>
            <DatePicker
              format="dd/MM/yyyy"
              autoOk
              disableToolbar
              variant="inline"
              value={date ? date : moment()}
              onChange={this.handleDateChange}
              minDate = {moment()}
            />
            <EventIcon />
          </div>
        </MuiPickersUtilsProvider>
        </div>
        <div className='material__datepicker__mobile'>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={localeMap[language.substring(0, 2)]}
        >
          <div>
            <h3>{title}</h3>
            <DatePicker
              format="dd/MM/yyyy"
              autoOk
            //   disableToolbar
            //   variant="inline"
              value={date ? date : moment()}
              onChange={this.handleDateChange}
              animateYearScrolling
              okLabel={system_text.SAVE}
             
              cancelLabel={system_text.CANCEL}
              minDate = {moment()}
            />
             <EventIcon />
          </div>
        </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ global }) {
  return { global };
}

export default connect(mapStateToProps, actions)(MaterialDatepicker);

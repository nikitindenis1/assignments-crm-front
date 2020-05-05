import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import EventIcon from "@material-ui/icons/Event";

class SingleDatepicker extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { validate, date } = this.props;
    if (nextProps.validate !== validate && !date) {
      this.setState({
        error: true,
      });
    }
  }
  updateDimensions = () => {
    if( window.innerWidth < 600){
        this.setState({
            portal:true
        })
    }else{
        this.setState({
            portal:false
        })
    }
};
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  handleChange = (date) => {
    const { property_name } = this.props;
    this.props.sendDate(property_name, date);
    this.setState({
      error: false,
    });
  };
  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  render() {
    const { date, title, empty_error } = this.props;
    const { error, portal } = this.state;
    const { system_text } = this.props.global;
    return (
      <div
        onClick={() => this.props.scrolltop()}
        className="datepicker__wrapper"
      >
        <h3>{title}</h3>
        <div className="datepicker__flex">
          {!date ? (
            <aside className="datepicker__flex__placeholder flex__start">
              <EventIcon /> <h4>{system_text.SELECT_DATE}</h4>{" "}
            </aside>
          ) : (
            ""
          )}
          <DatePicker
            selected={date ? moment(date).toDate() : ""}
            onChange={(date) => this.handleChange(date)}
            // showTimeSelect
            timeFormat="HH:mm"
            minDate={moment().toDate()}
            // timeIntervals={15}
            // timeCaption="time"
            onFocus={(e) => e.target.readOnly = true}
            dateFormat="MMMM d, yyyy"
            onChangeRaw={this.handleDateChangeRaw}
            withPortal = {portal}
          />
        </div>
        {error ? <p className="text__input__error">{empty_error}</p> : ""}
      </div>
    );
  }
}

function mapStateToProps({ global }) {
  return { global };
}

export default connect(mapStateToProps, actions)(SingleDatepicker);

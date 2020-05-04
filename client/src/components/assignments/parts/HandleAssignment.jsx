import React, { Component } from "react";
import assignments_inputs_data from "./assignments_inputs_data";
import TextInput from "../../../parts/inputs/TextInput";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import SingleDatepicker from "../../../parts/SingleDatepicker";
import SmallLoader from "../../../parts/SmallLoader";
import DraftInput from "../../../parts/inputs/DraftInput";
import CloseIcon from "@material-ui/icons/Close";
import FilesUpload from "../../../parts/FilesUpload";
import SubmitButtons from "../../../parts/SubmitButtons";
import EmployeeAssignmentsPopup from "../../employee-page/employee-assignments/EmployeeAssignmentsPopup";


class HandleAssignment extends Component {
  constructor() {
    super();
    this.state = {
      assignment: {},
    };
  }

  componentDidMount() {
    const { assignment_to_edit, new_assignment } = this.props;
    this.setState({
      is_edit: assignment_to_edit,
      assignment: assignment_to_edit ? assignment_to_edit : {},
    });
    if (new_assignment) {
      this.setState({
        assignment: new_assignment,
      });
    }
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 20);
  }

  updateStateAssignment = (name, value) => {
    const { assignment } = this.state;
    let new_assignment = JSON.parse(JSON.stringify(assignment));
    new_assignment[name] = value;
    this.setState({
      assignment: new_assignment,
    });
  };

  submitForm = async (e) => {
    const { is_edit, assignment } = this.state;
    e.preventDefault();
    this.setState({
      validate: true,
    });
    setTimeout(async () => {
      this.setState({
        validate: false,
      });
      const errors = document.querySelectorAll(".text__input__error");
      if (errors.length === 0) {
        if (is_edit) {
          await this.props.edit(assignment);
          this.close();
        } else {
          await this.props.create(assignment);
          this.close();
        }
      }
    }, 50);
  };

  close = () => {
    this.setState({
      loaded: false,
    });
    setTimeout(() => {
      this.props.toggleHandleAssignment();
    }, 400);
  };
  setAssignment = (assignment) => {
    this.setState({
      assignment_updated:true,
      assignment
    })
    setTimeout(() => {
      this.setState({
        assignment_updated:false,
      })
    }, 50);
  }


  render() {
    const { loaded, is_edit, validate, assignment, show_options , assignment_updated} = this.state;
    const { from_employee_page, loading, assignments_list } = this.props;
    const {system_text} = this.props.global
    return (
      <div
        id={loaded ? "assignments__handle--active" : ""}
        className="assignments__handle"
      >
        <section className="overlay"></section>
        <form
          onSubmit={(e) => this.submitForm(e)}
          className="assignments__handle__form"
        >
          {
            from_employee_page && show_options? 
            <EmployeeAssignmentsPopup 
            closePopup = {() => this.setState({show_options:false})}
            assignments_list = {assignments_list}
            setAssignment ={this.setAssignment}
            system_text = {system_text}
            />  :''
          }
          <button
            style={{
              opacity: loaded ? 1 : 0,
            }}
            type="button"
            onClick={() => this.close()}
            className="assignments__handle__form__close flex__center"
          >
            
            <CloseIcon />
          </button>
          <h2>{is_edit ? system_text.EDIT :system_text.CREATE}</h2>
          {from_employee_page && !is_edit? 
            <button 
            type='button'
            onClick = {() => this.setState({show_options:true})}
          className='save__btn suggestions__btn'>{system_text.TEMPLATES}</button>
             
        : ''}
          {assignment && loaded &&
            assignments_inputs_data.map((input) => {
              switch (input.type) {
                case "draft":
                  return (
                    <DraftInput
                      handleUpdate={this.updateStateAssignment}
                      input={input}
                      validate={validate}
                      property_name={input.property_name}
                      value={assignment ? assignment.text : ''}
                      label={input.label}
                      system_text = {system_text}
                      updated = {assignment_updated}
                    />
                  );
                default:
                  return (
                    <TextInput
                      handleUpdate={this.updateStateAssignment}
                      input={input}
                      validate={validate}
                      property_name={input.property_name}
                      value={assignment ? assignment[input.property_name] : ""}
                      system_text = {system_text}
                    />
                  );
              }
            })}
          {from_employee_page ? (
            <div className="assignments__handle__employee__page">
              {is_edit ? (
                <section id="assignments__handle__employee__status">
                  <h3>{system_text.STATUS}</h3>
                  <aside>
                    {system_text.ASSIGNMENT_STATUS_ARR.map((m) => {
                      return (
                        <button
                          type="button"
                          className={
                            assignment.status === m.value
                              ? "save__btn"
                              : "cancel__btn"
                          }
                          onClick={() =>
                            this.updateStateAssignment("status", m.value)
                          }
                        >
                          {m.text}
                        </button>
                      );
                    })}
                  </aside>
                </section>
              ) : (
                ""
              )}

              <SingleDatepicker
                sendDate={this.updateStateAssignment}
                property_name="deadline"
                date={assignment ? assignment.deadline : ""}
                title={system_text.DEADLINE}
                empty_error="Required field"
                validate={validate}
                
              />
            </div>
          ) : (
            ""
          )}
          <FilesUpload
            update={this.updateStateAssignment}
            property_name="files"
            files={assignment ? assignment.files : []}
          />
          <SubmitButtons
            close={this.close}
            submit_text={system_text.SAVE}
            close_text={system_text.CANCEL}
            loading={loading}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ assignments, global }) {
  return { assignments, global };
}

export default connect(mapStateToProps, actions)(HandleAssignment);

import React, { Component } from "react";
import Upload from "../../../parts/uploader/Uploader";
import TextInput from "../../../parts/inputs/TextInput";
import inputs_data from "./inputs-data";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import SwitchComponent from "../../../parts/SwitchComponent";
import PasswordInput from "../../../parts/inputs/PasswordInput";
import CloseIcon from "@material-ui/icons/Close";
import SubmitButtons from "../../../parts/SubmitButtons";

class HandleProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: { active: true },
    };
  }

  componentWillMount() {
    const { profile_to_edit } = this.props;
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 30);
    if (profile_to_edit) {
      this.setState({
        profile: profile_to_edit,
        is_edit: true,
      });
    }
  }

  updateProfile = (name, value) => {
    const { profile } = this.state;
    const updated_profile = JSON.parse(JSON.stringify(profile));
    updated_profile[name] = value;
    this.setState({
      profile: updated_profile,
    });
  };

  close = () => {
    this.setState({
      profile: {},
      loaded: false,
    });
    setTimeout(() => {
      this.props.toggleHandleProfile();
    }, 400);
  };

  submitForm = (e) => {
    const { profile, pw_changed } = this.state;
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
        this.setState({
          loading: true,
        });
        await this.props.save(profile, pw_changed);
        this.close();
      }
    }, 60);
  };
  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { loaded, profile, validate, is_edit, loading } = this.state;
    const { edit_text, create_text, status_disabled } = this.props;
    const { system_text } = this.props.global;
    return (
      <div
        id={loaded ? "employees__handle--active" : ""}
        className="employees__handle"
      >
        <section className="overlay"></section>
        <form
          onSubmit={(e) => this.submitForm(e)}
          className="employees__handle__form flex__column"
        >
          <button
            style={{
              opacity: loaded ? 1 : 0,
            }}
            type="button"
            onClick={() => this.close()}
            className="employees__handle__form__close"
          >
            <CloseIcon />
          </button>
          <header className="flex__between">
            <h2>{is_edit ? edit_text : create_text}</h2>
          </header>
          <span 
          style ={{
            alignItems:'flex-start'
          }}
          className="flex__between">
            <Upload
              property_name="avatar"
              update={this.updateProfile}
              value={profile.avatar}
            />
            {!status_disabled ? (
              <SwitchComponent
                property_name="active"
                value={profile.active}
                updateEmployee={this.updateProfile}
              />
            ) : (
              ""
            )}
          </span>
          <div className="employees__handle__form__info">
            {inputs_data.map((input) => {
              switch (input.type) {
                case "password":
                  return (
                    <PasswordInput
                      handleUpdate={this.updateProfile}
                      input={input}
                      validate={validate}
                      system_text={system_text}
                      value={profile[input.property_name]}
                      is_edit={is_edit}
                      updateParentState={this.updateState}
                    />
                  );

                default:
                  return (
                    <TextInput
                      handleUpdate={this.updateProfile}
                      input={input}
                      system_text={system_text}
                      validate={validate}
                      value={profile[input.property_name]}
                    />
                  );
              }
            })}
          </div>
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

function mapStateToProps({ employees, user, global }) {
  return { employees, user, global };
}

export default connect(mapStateToProps, actions)(HandleProfile);

import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import generator from "generate-password";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import BtnWithTooltip from "../../parts/BtnWithTooltip";
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
class PasswordInput extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { is_edit } = this.props;
    if (is_edit) {
      this.setState({
        active: true,
      });
    }
  }
  generatePassword = () => {
    var password = generator.generate({
      length: 10,
      uppercase: false,
    });
    this.setState({
      generated: true,
      error: false,
    });
   setTimeout(() => {
    this.setState({
      generated:false
    })
   }, 3000);
    this.handleChange(password);
  };

  handleChange = (value) => {
    const { input } = this.props;
    const { property_name } = input;
    this.props.updateParentState("pw_changed", true);
    this.props.handleUpdate(property_name, value);
  };
  handleBlur = () => {
    const { value } = this.props;
    this.setState({
      active: value,
    });

    this.setState({
      error: !value,
    });
  };
  handleFocus = () => {
    this.setState({
      active: true,
      validation_error: false,
      error: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { validate, input, value, is_edit } = this.props;
    const { type } = input;
    if (nextProps.validate !== validate && !is_edit) {
      this.handleBlur(type, value);
    }
  }
  handleCopy = () => {
    this.setState({
      copied: true,
    });
    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 2000);
  };
  render() {
    const { input, value, is_edit } = this.props;
    const { empty_text, label } = input;
    const { active, error, generated, copied, show_password } = this.state;
    const { system_text } = this.props.global;
    return (
      <div
        className={
          active || value
            ? "password text__input--active flex__start"
            : "password flex__start"
        }
      >
      
        <section className='password__input'>
        <input
          placeholder={system_text[label]}
          onChange={(e) => this.handleChange(e.target.value)}
          type={show_password ? 'text':"password"}
          value={value ? value : !value && is_edit ? "********" : ""}
          autocomplete="new-password"
          onBlur={(e) => this.handleBlur()}
          onFocus={(e) => this.handleFocus()}
        />
          <button
          type='button'
          className='flex__center'
        onClick = {() => this.setState({show_password:!show_password})}
        >{show_password ? <VisibilityOffOutlinedIcon />  :<VisibilityOutlinedIcon />}</button>
        </section>
        <section  className='password__actions flex__between'>
        <CopyToClipboard text={value} onCopy={() => this.handleCopy()}>
          <aside
          style ={{
            opacity:value ? 1 : 0.7,
            pointerEvents:value ? 'all' : 'none'
          }}
          >
          <BtnWithTooltip
            svg={copied  ? <CheckCircleOutlineOutlinedIcon /> : <FileCopyOutlinedIcon />}
            tooltip={system_text.COPY}
          ></BtnWithTooltip >
          </aside>
        </CopyToClipboard>
        <BtnWithTooltip
          svg={generated  ?<CheckCircleOutlineOutlinedIcon /> : <LockOutlinedIcon />}
          handleClick={this.generatePassword}
          value={true}
          tooltip={system_text.GENERATE}
        />
        </section>
        {error ? (
          <p className="text__input__error">{system_text[empty_text]}</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps({ global }) {
  return { global };
}

export default connect(mapStateToProps, actions)(PasswordInput);

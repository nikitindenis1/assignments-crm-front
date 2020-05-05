import React, { Component } from "react";
import { withRouter } from "react-router";
import { apiGetRequest } from "../../../tools/api";
import { Link } from "react-router-dom";
import {
  EMPLOYEE_ROUTE,
  EMPLOYEE_DASHBOARD_PAGE_ROUTE,
} from "../../../tools/routes";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import LinkIcon from "@material-ui/icons/Link";
import ElementActions from "../../../parts/ElementActions";
import { hasPermission } from "../../../functions/permission_functions";
import {
  EDIT_ASSIGNMENTS,
  DELETE_ASSIGNMENTS,
} from "../../settings/categories/permissions/Permissions_keys";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions";
import "moment/locale/he";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AssignmentLoader from "../../assignments/parts/AssignmentLoader";


class EmployeeAssignmentPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentWillMount() {
    const id = this.props.match.params.assignment_id;
    const employee_id = this.props.match.params.id;

   setTimeout(() => {
      this.setState({
        page_loaded:true
      })
   }, 20);
    const api = `employee_assignment/get-by-id?_id=${id}`;
    const res = await apiGetRequest(api);
    if (res.ok) {
      this.props.updateAssignmentInAssignmentPage(res.result);
      this.setState({
        employee_id,
      });
    }
  }

  changeStatus = (status) => {
    const { assignment } = this.props;
    let updated = JSON.parse(JSON.stringify(assignment));
    updated.status = status;
    this.props.createAndUpdateAssignment(updated);
  };

  backToList = () => {
    const { user } = this.props.user;
    const { employee_id } = this.state;
    if (user.is_manager) {
      this.props.history.push(EMPLOYEE_ROUTE.replace(":id", employee_id));
    } else {
      this.props.history.push(
        EMPLOYEE_DASHBOARD_PAGE_ROUTE.replace(":id", employee_id)
      );
    }
  };
  render() {
    const { system_text, language } = this.props.global;
    const { assignment } = this.props;
    const { permissions, user } = this.props.user;
    const {page_loaded} = this.state
    let options = [
      {
        text: "EDIT",
        function: this.props.handleAssignment,
        param1: true,
        param2: false,
        param3: assignment,
        disabled: !hasPermission(user, permissions, EDIT_ASSIGNMENTS),
      },
      {
        text: "COMMENTS",
        function: this.props.handleAssignmentComments,
        param1: assignment,
      },
      {
        text: "MARK_AS_PENDING",
        function: this.changeStatus,
        param1: "pending",
      },
      {
        text: "MARK_AS_DONE",
        function: this.changeStatus,
        param1: "done",
      },
      {
        text: "MARK_AS_PROGRESS",
        function: this.changeStatus,
        param1: "in_progress",
      },
      {
        text: "REMOVE",
        function: this.props.handleDelete,
        param1: assignment,
        disabled: !hasPermission(user, permissions, DELETE_ASSIGNMENTS),
      },
    ];
    return  (
      <div 
      style ={{
        opacity:page_loaded ? 1  :0
      }}
      className="employee__assignment__page page__flex">
        <ElementActions width="150px" options={options} />
        <header>
          <aside onClick={() => this.backToList()} className="flex__start">
            <NavigateBeforeIcon />
            <h5>{system_text.ASSIGNMENTS}</h5>
          </aside>
        </header>

       {assignment ? <section className="employee__assignment__page__content">
          <div className="employee__assignment__page__content__section">
            <aside className="flex__start">
              <p>{system_text.STATUS}:</p>
              <h5>{system_text[assignment.status]}</h5>
            </aside>
            <h3>{system_text.TITLE}</h3>
            <h4>{assignment.title}</h4>
          </div>
          <aside className="employee__assignment__page__content__section">
            <h3>{system_text.CONTENT}</h3>
            {assignment.text ? (
              <Editor
                toolbarHidden={true}
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(assignment.text))
                )}
                readOnly={true}
              />
            ) : (
              ""
            )}
          </aside>
          {assignment && assignment.files.length > 0 ? (
            <div className="employee__assignment__page__content__section employee__assignment__page__content__files">
              <h3>{system_text.FILES}</h3>
              <ul>
                {assignment.files.map((m) => {
                  return (
                    <li className="flex__start">
                      <a className="flex__start" href={m.url} target="_blank">
                        <LinkIcon />
                        <h5>{m.name}</h5>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
          {assignment.deadline ? (
            <div className="employee__assignment__page__content__section">
              <h3>{system_text.DEADLINE}</h3>
              <span className="flex__start">
                <h4>
                  {moment(assignment.deadline)
                    .locale(language.substring(0, 2))
                    .format("dddd, LL")}
                </h4>
              </span>
            </div>
          ) : null}
          {assignment.comments ? (
            <div className="employee__assignment__page__content__section">
              <h3>{system_text.COMMENTS}</h3>

              <Editor
                toolbarHidden={true}
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(assignment.comments))
                )}
                readOnly={true}
              />
            </div>
          ) : (
            " "
          )}
          <div className="employee__assignment__page__content__section">
            <h3>{system_text.LAST_UPDATED}</h3>
            <h4>{moment(assignment.updated_at).format("DD/MM/YY HH:mm")}</h4>
          </div>
        </section> : <AssignmentLoader arr={[...Array(3).keys()]} />}
      </div>
    ) 
  }
}

function mapStateToProps({ user, global }) {
  return { user, global };
}

export default withRouter(
  connect(mapStateToProps, actions)(EmployeeAssignmentPage)
);

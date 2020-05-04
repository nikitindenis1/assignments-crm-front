import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import Assignment from "./parts/Assignment";
import HandleAssignment from "./parts/HandleAssignment";
import PopupWithFunction from "../../parts/PopupWithFunction";
import { apiPostRequest, apiGetRequest } from "../../tools/api";
import AssignmentLoader from "./parts/AssignmentLoader";
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import BtnWithTooltip from "../../parts/BtnWithTooltip";
import NoData from "../../parts/NoData";

class AssignmentTemplates extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const api = `assignment`;
    const res = await apiGetRequest(api);
    if (res.ok) {
      this.props.setDataToAssignmentsReducer("assignments_list", res.result);
      this.setState({
        assignments_loaded: true,
      });
    }
  }
  toggleHandleAssignment = (status, assignment_to_edit) => {
    this.setState({
      handle_assignment: status,
      assignment_to_edit,
    });
  };

  handleRemove = (assignment_to_remove) => {
    this.setState({
      assignment_to_remove,
    });
  };

  close = () => {
    this.setState({
      assignment_to_remove: "",
      handle_assignment: "",
    });
  };
  remove = async () => {
    const { assignment_to_remove } = this.state;
    const { assignments_list } = this.props.assignments;
    this.setState({
      remove_loading:true
    })
    const api = `assignment/delete`;
    const res = await apiPostRequest(api, { id: assignment_to_remove._id });
    if (res.ok) {
      this.props.removeAssignment(assignment_to_remove, assignments_list);
      this.close();
    }
   setTimeout(() => {
    this.setState({
      remove_loading:false
    })
   }, 400);
  };

  create = async (assignment) => {
    const {system_text} = this.props.global
    const { assignments_list } = this.props.assignments;
    const api = "assignment";
    this.setState({
      loading: true,
    });
    const res = await apiPostRequest(api, assignment);

    if (res.ok) {
      this.props.addAssignment(res.result, assignments_list);
    }
    this.props.updateGlobalReducer(
      "success",
      system_text.ASSIGNMENT_CREATE_SUCCESS
    );
    this.setState({
      loading: false,
    });
  };

  edit = async (assignment) => {
    const { assignments_list } = this.props.assignments;
    const api = "assignment";
    this.setState({
      loading: true,
    });
    const res = await apiPostRequest(api, assignment);
    if (res.ok) {
      this.props.updateAssignment(res.result, assignments_list);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { assignments_list } = this.props.assignments;
    const {
      handle_assignment,
      assignment_to_edit,
      assignment_to_remove,
      loading,
      assignments_loaded,
      remove_loading
    } = this.state;
    const { system_text } = this.props.global;

    return (
      <div className="assignments">
        <PopupWithFunction
          text={system_text.REMOVE_TEXT}
          name={`${assignment_to_remove ? assignment_to_remove.title : ""}?`}
          active={assignment_to_remove}
          submit={this.remove}
          close={this.close}
          submit_text={system_text.YES}
          close_text={system_text.NO}
          loading ={remove_loading}
        />
        {handle_assignment ? (
          <HandleAssignment
            loading={loading}
            edit={this.edit}
            create={this.create}
            assignment_to_edit={assignment_to_edit}
            toggleHandleAssignment={this.toggleHandleAssignment}
          />
        ) : (
          " "
        )}

        <div className="page__flex">
          <BtnWithTooltip
            svg={<LibraryAddOutlinedIcon />}
            handleClick={() => this.toggleHandleAssignment(true)}
            tooltip={system_text.CREATE}
          />
          <ul className="assignments__list flex__start">
            {assignments_loaded &&
            assignments_list &&
            assignments_list.length > 0 ? (
              assignments_list.map((m) => {
                return (
                  <Assignment
                    m={m}
                    system_text = {system_text}
                    handleRemove={this.handleRemove}
                    toggleHandleAssignment={this.toggleHandleAssignment}
                    key={m._id}
                  />
                );
              })
            ) : !assignments_loaded ? (
              <AssignmentLoader arr={[...Array(3).keys()]} />
            ) : (
              <NoData 
              text = {system_text.NO_TEMPLATES}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ assignments, global }) {
  return { assignments, global };
}

export default withRouter(
  connect(mapStateToProps, actions)(AssignmentTemplates)
);

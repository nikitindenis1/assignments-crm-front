import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import SubmitButtons from "../../../parts/SubmitButtons";
const saveContent = (content) => {
  return JSON.stringify(convertToRaw(content.getCurrentContent()));
};

class AssignmentComments extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { assignment } = this.props;
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 20);
    this.setState({
      loaded: true,
    });
    let comments = "";
    if (assignment.comments) {
      let content = convertFromRaw(JSON.parse(assignment.comments));

      comments = EditorState.createWithContent(content);
    }
    this.setState({
      comments,
    });
  }

  onEditorStateChange = (val) => {
    this.setState({
      comments: val,
    });
  };

  close = () => {
    this.setState({
      loaded: false,
    });
    setTimeout(() => {
      this.props.updateParentState("assignment_comments");
    }, 300);
  };

  save = async (comments) => {
    const { assignment } = this.props;
    const updated = { ...assignment };
    this.setState({
      loading:true
    })
    const rawDraftContentState = await saveContent(comments);
    updated["comments"] = rawDraftContentState;
    await this.props.updateAssignment(updated);
    this.close();
  };

  render() {
    const { comments, loaded, loading } = this.state;
    const { assignment, system_text } = this.props;
    return (
      <div
        id={loaded ? "employee__assignment__comments--active" : ""}
        className="employee__assignment__comments"
      >
        <section className="overlay"></section>
        <form className="flex__column">
          <button
          type ='button'
          onClick = {() => this.close()}
          className='employee__assignment__comments__close'
          ><CloseOutlinedIcon /></button>
          <header>
            <h2>{system_text.ASSIGNMENT}</h2>
            <h3>{`${assignment.title}`}</h3>
          </header>
          <div className="employee__assignment__comments__editor">
            <Editor
              editorState={comments}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              placeholder={system_text.COMMENT}
            />
          </div>
          <SubmitButtons
          submit = {() => comments ? this.save(comments) : '' }
          loading ={loading}
          close_text =  {system_text.CANCEL}
          close = {this.close}
          submit_text = {system_text.SAVE}
          button_type = {true}
          />
        </form>
      </div>
    );
  }
}

export default AssignmentComments;

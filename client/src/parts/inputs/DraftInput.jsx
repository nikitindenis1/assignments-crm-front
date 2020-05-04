import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

class DraftInput extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      loaded: true,
    });
    this.createContent(value)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.updated !== this.props.updated){
      this.createContent(nextProps.value)
    }
  }

  createContent = (value) =>{
    let comments = "";
    if (value) {
      let content = convertFromRaw(JSON.parse(value));

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
    window.clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => {
      this.save(val);
    }, 200);
    this.setState({
      timeout,
    });
  };
  saveContent = (content) => {
    return JSON.stringify(convertToRaw(content.getCurrentContent()));
  };
  save = async (comments) => {
    const { property_name } = this.props;
    const rawDraftContentState = await this.saveContent(comments);
    this.props.handleUpdate(property_name, rawDraftContentState);
  };

  render() {
    const { comments } = this.state;

    const { label, system_text } = this.props;

    return (
      <div className="draft__content">
        <Editor
          editorState={comments}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          placeholder={system_text[label]}
        />
      </div>
    );
  }
}

export default DraftInput;

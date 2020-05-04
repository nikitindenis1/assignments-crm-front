import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import ElementActions from "../../../parts/ElementActions";

const Assignment = (props) => {
  const { m, system_text } = props;

  let options = [
    {
      text: "EDIT",
      function: props.toggleHandleAssignment,
      param1: true,
      param2: m,
    },
    {
      text: "REMOVE",
      function: props.handleRemove,
      param1: m,
    },
  ];

  return (
    <li className="assignments__list__assignment">
      <ElementActions width="120px" options={options} />
      <section className='assignments__list__assignment__section'>
        <h3>{system_text.TITLE}</h3>
        <h4>{m.title}</h4>
      </section>
      <section className='assignments__list__assignment__section'>
        <h3>{system_text.CONTENT}</h3>
        <Editor
          toolbarHidden={true}
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(m.text))
          )}
          readOnly={true}
        /> 
      </section>
           {m.files && m.files.length  >0 ?
            <section className='assignments__list__assignment__section'>
              <h3>{system_text.FILES}</h3>
              <ul>
              {
                m.files.map(m => {
                  return <div
                  className='system__file'
                  key = {m._id}>
                    <a href={m.url} target='_blank'>
                      <p>{m.name}</p>
                    </a>
                  </div> 
                })
              }
              </ul>
            </section> : ''}
    </li>
  );
};
export default Assignment;

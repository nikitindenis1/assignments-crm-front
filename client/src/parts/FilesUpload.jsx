import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import Backendless from "backendless";
import Dropzone from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";
import SmallLoader from "./SmallLoader";
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import CloseIcon from '@material-ui/icons/Close';

Backendless.initApp(
  "0C7F99A6-3715-126A-FF3C-3387261D5C00",
  "957C469D-E5DE-4C1D-8A8B-A3BE62BF1CD2"
);



const checkIfExist = (arr, file) => {
    return arr.filter(m => m.name === file.name)[0]
}
class FilesUpload extends Component {
  constructor() {
    super();
    this.state = {
       
    };
  }
  handleFileSelect = async (files) => {
      const {property_name} = this.props
      this.setState({
          loading:true
      })
   for(let file of files){
    try {
      await   Backendless.Files.upload(file, '/myFiles', true).then(result => {
          let url = result.fileURL
          let new_file = {
              name:file.name,
              url
          }
          let new_files = this.props.files ? this.props.files : []
          if(!checkIfExist(new_files, new_file)){
            new_files = [...new_files, new_file]
            this.props.update(property_name, new_files)
          }
        })
        this.setState({
            loading:false
        })
       } catch (error) {
         
       }
       
   }
 
      
   }

   removeFile = (file) => {
    const {files, property_name} = this.props
   
    let new_files = files.filter(m => m.name !== file.name)
    this.props.update(property_name, new_files)
   }
  render() {
      const {files} = this.props
     const {loading} = this.state
     const {system_text} = this.props.global
    return (
      <div className="files__upload">
        {loading  ?
        <div className='dropzone dropzone__loader'><SmallLoader active ={true}/></div>
        : <Dropzone
        className='dropzone flex__start'
          style={{ width: "100%", height: "100%" }}
          onDrop={(acceptedFiles) => this.handleFileSelect(acceptedFiles)}
        ><AttachmentOutlinedIcon /><h5>{system_text.ADD_FILE}</h5></Dropzone>}

        <ul className='files__upload__list flex__start'>
        {
            files && files.length > 0 ? 
                files.map(m => {
                return <li className='flex__start'>
                    <a href={m.url} target='_blank'>
                    <h4>{m.name}</h4>
                    </a>
                    <button 
                    type ='button'
                    onClick = {() => this.removeFile(m)}><CloseIcon /></button>
                    </li>
                })
            :''
        }
        </ul>
      </div>
    );
  }
}

function mapStateToProps({  global }) {
  return {  global };
}

export default connect(mapStateToProps, actions)(FilesUpload);

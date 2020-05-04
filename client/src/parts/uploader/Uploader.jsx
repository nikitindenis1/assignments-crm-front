import React, { Component } from "react";
import Dropzone from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";

import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import Backendless from "backendless";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import SmallLoader from "../SmallLoader";

Backendless.initApp(
  "0C7F99A6-3715-126A-FF3C-3387261D5C00",
  "957C469D-E5DE-4C1D-8A8B-A3BE62BF1CD2"
);

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      is_drag: false,
    };
  }
  handleFileSelect = async (files) => {
    const { property_name } = this.props;
    let file = files[0];
    this.setState({
      loading:true,
      image_loaded:false
    })
    try {
      await Backendless.Files.upload(file, "/myFiles", true).then((result) => {
        let url = result.fileURL;
        this.props.update(property_name, url);
        this.setState({
          loading:false
        })
      });
     
    } catch (error) {
      await this.props.updateGlobalReducer("error", "Failed to change profile image");
      
    }
  
  };

  onLoad = () => {
    this.setState({
      image_loaded: true,
    });
  };
  render() {
    const { value } = this.props;
    const { image_loaded, loading } = this.state;

   
    return (
      <div className="uploader">
        <Dropzone
          style={{ width: "100%", height: "100%" }}
          onDrop={(acceptedFiles) => this.handleFileSelect(acceptedFiles)}
        ></Dropzone>
        {value ? (
          <>
            <img
              className="uploader__img"
              onLoad={() => this.onLoad()}
              style={{
                opacity: !loading && image_loaded ? 1 : 0,
                transition: "0.3s all",
              }}
              src={value}
              alt=""
            />
            {loading || !image_loaded ? <SmallLoader active = {true}/> : ''}
          </>
        ) : (
          <AddPhotoAlternateOutlinedIcon />
        )}
      </div>
    );
  }
}
function mapStateToProps({ global }) {
  return { global };
}

export default connect(mapStateToProps, actions)(Upload);

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
class ElementActions extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
      };
    
      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      handleClickOutside = (event) => {
        if (
          this.wrapperRef &&
          !this.wrapperRef.contains(event.target)
        ) {
         this.setState({
             active:false
         })
        }
      };



    render() {
        const {options, width} = this.props
        const {system_text} = this.props.global
        const {active} = this.state
        return (
            <div
            style ={{
                zIndex:active ? '99' : ''
            }}
            ref={this.setWrapperRef}
            className="actions">
            <section
            style ={{
                background:active ? 'rgba(0, 145, 255, 0.2)'  : '',
            }}
            onClick = {() => this.setState({
                active:true
            })}
            className='actions__toggle flex__center'>
                <ArrowDropDownSharpIcon />
            </section>
          <ul 
          style ={{
              opacity:active ? 1  : 0,
              pointerEvents:active ? 'all'  :'none',
              width:width ? width :' '
          }}
          className='actions__list'>
            {options && options.length > 0
              ?options.filter(m => !m.disabled).map((n, i) => {
                  return <li 
                  key = {i}
                  onClick = {() => {
                    n.function(n.param1, n.param2, n.param3)
                    this.setState({
                      active:false
                    })
                  }}
                  className='actions__list__element flex__start'> 
                
                  {system_text[n.text]}</li>;
                })
              : ""}
          </ul>
        </div>
        );
    }
}

function mapStateToProps({  global }) {
  return {  global };
}

export default (connect(mapStateToProps, actions)(ElementActions));

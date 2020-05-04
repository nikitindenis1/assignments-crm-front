import React, { Component } from "react";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
class EmployeeActions extends Component {
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
        const {options} = this.props
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
              pointerEvents:active ? 'all'  :'none'
          }}
          className='actions__list'>
            {options && options.length > 0
              ? options.map((n) => {
                  return <li 
                  onClick = {() => n.function()}
                  className='actions__list__element flex__start'> {n.text}</li>;
                })
              : ""}
          </ul>
        </div>
        );
    }
}

export default EmployeeActions;
import React, { Component } from 'react';
import Switch from "react-switch";

class SwitchComponent extends Component {
    render() {
        const { value,
             active_text,
              inactive_text,
               property_name } = this.props
        return (
            <div className='switch__component flex__start'>
                <figure>
                <Switch
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                    onChange={() => this.props.updateEmployee(property_name, !value)}
                    checked={value} />
                </figure>
                {active_text && inactive_text ? <h4>{value ? active_text : inactive_text}</h4>  :''}
            </div>
        );
    }
}

export default SwitchComponent;

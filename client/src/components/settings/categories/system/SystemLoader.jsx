import React, { Component } from 'react';
import SmallLoader from '../../../../parts/SmallLoader';

class SystemLoader extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    componentDidMount(){
        setTimeout(() => {
                this.setState({
                    loaded:true
                })
        }, 20);

        setTimeout(() => {
                this.setState({
                    loaded:false
                })

        }, 3000);
        setTimeout(() => {
                this.props.close()
        }, 3300);
    }


    render() {
            const {text}  = this.props
        const {loaded} = this.state
        return (
            <div 
          style ={{
              opacity:loaded ? 1 : 0
          }}
          className='settings__system__loading'>
        <section className="overlay"></section>
                <section className="settings__system__loading__content flex__column">
        <h3>{text}</h3>
                    <SmallLoader active = {true}/>
                </section>
          </div>
         ) }
}

export default SystemLoader;
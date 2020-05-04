import React, { Component } from 'react';
import LineChart from './parts/LineChart';
import PieChart from './parts/PieChart';
import HorizontalChart from './parts/HorizontalChart';

class Overview extends Component {
    render() {
        return (
            <div className='overview flex__start'>
               <div className='page__flex flex__column'>
               <PieChart />
                <HorizontalChart /> 
               </div>
            </div>
        );
    }
}

export default Overview;
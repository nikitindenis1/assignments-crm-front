import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { apiGetRequest } from '../../../tools/api';


class PieChart extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

     componentDidMount(){
        this.getGraphData()
    }


    getGraphData = async  () => {
        const api = 'overview/assignments'
        const res  = await apiGetRequest(api)
        if(res.ok){
            let values = res.result
            const graph_data = {
                labels: [
                    'Pending',
                    'In progress',
                    'Done'
                ],
                datasets: [{
                    data: [values.pending, values.in_progress, values.done],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ]
                }]
            };
            this.setState({
                graph_data
            })
        }
    }
 
    
    render() {
        const {graph_data} = this.state
        const options = {
            label:{
                display:false
            },
            responsive:true
        }
        return (
            <div className='overview__section'>
           { graph_data ? <Doughnut data={graph_data} /> : ''}
          </div>
        );
    }
}

export default PieChart;
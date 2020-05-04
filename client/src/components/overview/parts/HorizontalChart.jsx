import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import { apiGetRequest } from '../../../tools/api';

class HorizontalChart extends Component {
  constructor(){
    super()
    this.state = {
        type:'pending'
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData = async () => {
    const {type} = this.state
    const api = 'employee/all'
    const res  = await apiGetRequest(api)
    if (res.ok){
      let employees = res.result
      this.setState({
        employees
      })
      this.generateData(employees, type)
    }
  }

  generateData = (employees, type) => {
    let labels = employees.map(m => m.name)
    let data = employees.map(m => m.assignments_count[type])
    const graph_data = {
      labels: labels,
      datasets: [
        {
          label: '',
          backgroundColor: 'rgba(0, 145, 255, 0.5)',
          borderColor: 'rgba(255,99,132,0)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data:data
        }
      ]
    };
    this.setState({
      graph_data
    })


    
  }
      render() {
        const options = {
          legend:{
            display:false
          },  
          scales: {
              xAxes: [{
                  ticks: {
                    beginAtZero: false
                  },
                  gridLines: {
                    offsetGridLines: false
                }
              }],
              yAxes: [{
                  stacked: true,
                  gridLines: {
                   
                }
              }]
          }
      }
        const {type, graph_data} = this.state
        return (
            <div className='overview__section'>
            <HorizontalBar 
            options = {options}
            data={graph_data} />
          </div>
        );
    }
}

export default HorizontalChart;
import React, {Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
      currentData:{},
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'bottom',
    location:'City'
  }

  componentDidMount(){
    this.getChartData();
  }
 
  getChartData(){
    // Ajax calls here
    let data=this.props.chartData;
    const result = data.slice(0, 6).map(item => parseInt(item.deaths.replace(',', '')));
    this.setState({
      currentData:{
        labels: ['USA', 'Spain', 'Italy', 'UK', 'France', 'Germany'],
        datasets:[
          {
            label:'Population',
            data:result,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }
 
  render(){
    return (
      <div className="chart">
        <Bar
          data={this.state.currentData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Die from Corona in the world',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        <Line
          data={this.state.currentData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Die from Corona in the world',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        <Pie
          data={this.state.currentData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Die from Corona in the world',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;
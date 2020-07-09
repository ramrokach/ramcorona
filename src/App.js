import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart'
//<Chart chartData={this.state.currentData} location="New York"/>
class Corona extends React.Component {
  constructor() {
     super(); // call constructor of React.Component
     this.state = {
        currentData: [],
        isLoading: true,
        chartData:{}
     };

  }
  async fetchCurrentData() {
     try {
        const res = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "cf7d0eb315mshcd7b1baf20126b9p13f154jsnbc9024a1da66"
          }
        });
        const data = await res.json();
        console.log('data', data);
        data.countries_stat.shift();
        this.setState({
           currentData: data.countries_stat,
           isLoading: false,
        });
     } catch (err) {
        console.log('err', err);
     }
  }

  // run after first render
  componentDidMount() {
     this.fetchCurrentData();
  }
  
  render() {
     console.log('render', this.state);
     const {currentData, isLoading } = this.state;

     if (isLoading) {
        return <div>Loading...</div>;
     }
     const listCountries=currentData.map((country)=>{
      return(
            <tr>
               <th>{country.country_name}</th>
               <th>{country.cases}</th>
               <th>{country.deaths}</th>
            </tr>
      )
     })
     //<th>{"Country:  "+country.country_name+"  Cases:  "+country.cases+"  Deaths:  "+country.deaths}</th>);
     return (<div>
               <h1>Corona Table</h1>
               <table className="App">
                  <tbody>
                  <tr className="tr">
                     <th>Country</th>
                     <th>Cases</th>
                     <th>Deaths</th>
                  </tr>
                  {listCountries}
                  </tbody>
               </table>
               <Chart chartData={this.state.currentData} location="New York"/>
             </div>
             )
            
  }
}

class App extends Component {
   constructor(){
     super();
   }

render() {
  return (
      <Corona/>
    
  );
}
}

export default App;


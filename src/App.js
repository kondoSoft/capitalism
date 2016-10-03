import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Bar time={1000}/>
      </div>
    );
  }
}

var Bar = React.createClass({
  getInitialState(){
    return({
      width: 0
    })
  },
  cargar(time){
    var tiempoInicio = Date.now()
    var inter = setInterval(()=>{
      var tiempoActual = Date.now()
      var tiempoTranscurrido = tiempoActual - tiempoInicio;
      var porcentaje = tiempoTranscurrido / time * 100
      console.log(porcentaje);
      if(this.state.width >= 100){
        clearInterval(inter)
        this.setState({width:0})
      }else{
        this.setState({width:porcentaje})
      }
    }, 10)
  },
  render() {
    return(
      <div>
        <div id="myProgress">
          <div id="myBar" style={{width:this.state.width + '%'}}></div>
          <div id="label">10%</div>
        </div>
        <button onClick={()=>{this.cargar(this.props.time)}}>Iniciar</button>
      </div>

    )
  }
})

export default App;

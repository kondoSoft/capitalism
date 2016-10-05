import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      buyedStand:{
        lemonade:{
          revenue:10,
          standPrice:1000,
          quantityStand:1,
          time:500,
          name: 'lemonade'
        },
        newspaper:{
          revenue:100,
          standPrice:1000,
          quantityStand:1,
          time:1500,
          name:'newspaper'
        },
        donutShop:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'donutShop'
        },
        pizzaShop:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'pizzaShop'
        }
      },
      availableStand:{
        bank:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'bank'
        },
        movieStudio:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'movieStudio'
        },
        oilCompany:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'oilCompany'
        }
      }
    }
  }
  render() {
    return (
      <div className="container">
        <MainContainer buyedStand={this.state.buyedStand} availableStand={this.state.availableStand}/>
      </div>
    );
  }
}

var MainContainer = React.createClass({

  render: function(){
    console.log(this.props.availableStand);
    return(
      <div>
        <Capital monto='50000' />
        <div className='row'>
          <GameItem />
        </div>
      </div>
    )
  }
})

var GameItem = React.createClass({
  render: function(){
    return(
      <div>
        <div className='rowContainer'>
          <BarProgress time={1000}/>
          <Thumbnail />
        </div>
        <RevenueBuyStandContainer />
      </div>
    )
  }
})

var BarProgress = React.createClass({
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
      <div className='progressBar'>
        <div id="myProgress">
          <div id="myBar" style={{width:this.state.width + '%'}}></div>
          <div id="label">00:10s</div>
        </div>
        <button onClick={()=>{this.cargar(this.props.time)}}>Iniciar</button>
      </div>

    )
  }
})

var Capital = React.createClass({
  render: function() {
    return(
      <div className='capital'>
        <span>{this.props.monto}</span>
      </div>
    )
  }
})

var Thumbnail = React.createClass({
  render: function(){
    return(
      <div className="thumb">
        <img src="http://placehold.it/50x50" role="presentation" />
        <div>100</div>
      </div>
        )
  }
})

var RevenueBuyStandContainer = React.createClass({
  render: function(){
    return(
      <div className='rev'>
        <BuyStand />
        <Revenue />
      </div>
    )
  }
})

var Revenue = React.createClass({
  render:function(){
    return(
      <div className='revenue'>
        <span>$1000.00</span>
      </div>
    )
  }
})

var BuyStand = React.createClass({
  render: function(){
    return(
      <div className="buystand">
        <span>buy x1 </span>
        <span> $100.00</span>
      </div>
    )
  }
})

export default App;

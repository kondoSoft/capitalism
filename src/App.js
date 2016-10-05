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
          time:100,
          name: 'lemonade'
        },
        newspaper:{
          revenue:100,
          standPrice:1010,
          quantityStand:1,
          time:1500,
          name:'newspaper'
        },
        donutShop:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:10000,
          name:'donutShop'
        },
        pizzaShop:{
          revenue:205,
          standPrice:1150,
          quantityStand:1,
          time:2000,
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
  renderItemsGame: function (){
    var buyedStand = this.props.buyedStand
    return(
      Object.keys(buyedStand).map((item, key)=>{
        return <GameItem key={key}
          revenue={buyedStand[item].revenue}
          quantity={buyedStand[item].quantityStand}
          time={buyedStand[item].time}
          name={buyedStand[item].name}
          standPrice={buyedStand[item].standPrice}/>
        })
      )
    },
    renderItemsAvailable: function(){
      var availableStand = this.props.availableStand
      return(
        Object.keys(availableStand).map((item, key)=>{
          return <NewStand
            revenue={availableStand[item].revenue}
            quantity={availableStand[item].quantityStand}
            time={availableStand[item].time}
            name={availableStand[item].name}
            standPrice={availableStand[item].standPrice}/>
        })
      )
    },
    render: function(){
      return(
        <div>
          <Capital monto='50000' />
          <div className='row'>
            {this.renderItemsGame()}
          </div>
          {this.renderItemsAvailable()}
        </div>
      )
    }
  })

  var GameItem = React.createClass({
    render: function(){
      return(

        <div>
          <div className='rowContainer'>
            <BarProgress time={this.props.time}/>
            <Thumbnail quantity={this.props.quantity} />
          </div>
          <RevenueBuyStandContainer revenue={this.props.revenue} standPrice={this.props.standPrice}/>
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
    render: function() {
      return(
        <div  className='progressBar'>
          <div id="myProgress" onClick={()=>{this.cargar(this.props.time)}}>
            <div id="myBar" style={{width:this.state.width + '%'}}></div>
            <div id="label">00:10s</div>
          </div>
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
          <div>{this.props.quantity}</div>
        </div>
      )
    }
  })

  var RevenueBuyStandContainer = React.createClass({
    render: function(){
      return(
        <div className='rev'>
          <BuyStand standPrice={this.props.standPrice}/>
          <Revenue  revenue={this.props.revenue} />
        </div>
      )
    }
  })

  var Revenue = React.createClass({
    render:function(){
      return(
        <div className='revenue'>
          <span>${this.props.revenue}</span>
        </div>
      )
    }
  })

  var BuyStand = React.createClass({
    render: function(){
      return(
        <div className="buystand">
          <span>buy x1 </span>
          <span>${this.props.standPrice}</span>
        </div>
      )
    }
  })

  var NewStand = React.createClass({
    render:function(){
      return(
      <div className="newstand">
        <img src="http://placehold.it/50x50" role="presentation" />
        <div>
          <span>{this.props.name} </span>
          <span>${this.props.standPrice}</span>
        </div>
      </div>
    )
    }
  })

  export default App;

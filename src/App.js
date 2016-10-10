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
          name: 'lemonade',
          width: 0,
          running: false
        }
      },
      availableStand:{
        newspaper:{
          revenue:100,
          standPrice:1010,
          quantityStand:1,
          time:1500,
          name:'newspaper',
          width: 0,
          running: false
        },
        donutShop:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:10000,
          name:'donutShop',
          width: 0,
          running: false
        },
        pizzaShop:{
          revenue:205,
          standPrice:1150,
          quantityStand:1,
          time:2000,
          name:'pizzaShop',
          width: 0,
          running: false
        },
        bank:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'bank',
          width: 0,
          running: false
        },
        movieStudio:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'movieStudio',
          width: 0,
          running: false
        },
        oilCompany:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'oilCompany',
          width: 0,
          running: false
        }
      },
      capital: 0,
    }
    this.addStand = this.addStand.bind(this)
    this.loading = this.loading.bind(this)
    this.toogleRunning = this.toogleRunning.bind(this)
    this.buyStand = this.buyStand.bind(this)
  }
  sumCapital(revenue){
    var total = this.state.capital + revenue
    this.setState({capital: total})
  }
  loading(time, name, capital){
    var state =  this.state
    var running = state.buyedStand[name].running
    var newState = state.buyedStand
    if(running === false){
      this.toogleRunning(name)
      var tiempoInicio = Date.now()
      var interval = setInterval(()=>{
        var tiempoActual = Date.now()
        var tiempoTranscurrido = tiempoActual - tiempoInicio;
        var porcentaje = tiempoTranscurrido / time * 100
        if(state.buyedStand[name].width >= 100){
          clearInterval(interval)
          newState[name].width = 0
          this.setState({buyedStand:newState})
          this.toogleRunning(name)
          this.sumCapital(state.buyedStand[name].revenue)
        }else{
          newState[name].width = porcentaje
          this.setState({buyedStand:newState})
        }
      }, 10)
    }
  }
  addStand(name) {
    var state = this.state
    var newState = state.buyedStand
    newState[name].quantityStand++
    this.setState({buyedStand:newState})
  }
  toogleRunning(key){
    var state = this.state
    state.buyedStand[key].running = !state.buyedStand[key].running
    this.setState(state)
    return state.buyedStand[key].running
  }
  buyStand(key){
    var state = this.state
    var availableStand = state.availableStand
    var buyedStand = state.buyedStand
    buyedStand[key] = availableStand[key]
    this.setState({buyedStand:buyedStand})
    delete availableStand[key]
    this.setState({availableStand: availableStand})
  }
  render() {
    return (
      <div className="container">
        <MainContainer
          addStand={this.addStand}
          capital={this.state.capital}
          buyedStand={this.state.buyedStand}
          availableStand={this.state.availableStand}
          loading={this.loading}
          buyStand={this.buyStand}
        />
      </div>
    );
  }
}

var MainContainer = React.createClass({
  renderItemsGame: function (){
    var buyedStand = this.props.buyedStand
    return(
      Object.keys(buyedStand).map((item, key)=>{
        return (
          <GameItem key={key}
            revenue={buyedStand[item].revenue}
            quantity={buyedStand[item].quantityStand}
            time={buyedStand[item].time}
            name={buyedStand[item].name}
            width={buyedStand[item].width}
            standPrice={buyedStand[item].standPrice}
            addStand={this.props.addStand}
            capital={this.props.capital}
            loading={this.props.loading}
          />
        )
        })
      )
    },
    renderItemsAvailable: function(){
      var availableStand = this.props.availableStand
      return(
        Object.keys(availableStand).map((item, key)=>{
          return (
          <NewStand key={key}
            revenue={availableStand[item].revenue}
            quantity={availableStand[item].quantityStand}
            time={availableStand[item].time}
            name={availableStand[item].name}
            standPrice={availableStand[item].standPrice}
            buyStand={this.props.buyStand}
          />
        )
        })
      )
    },
    render: function(){
      return(
        <div>
          <Capital monto={this.props.capital} />
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
            <BarProgress
              width={this.props.width}
              revenue={this.props.revenue}
              loading={this.props.loading}
              time={this.props.time}
              name={this.props.name}
              capital={this.props.capital}
            />
            <Thumbnail
              name={this.props.name}
              quantity={this.props.quantity}
              loading={this.props.loading}
              time={this.props.time}
            />
          </div>
          <RevenueBuyStandContainer
            name={this.props.name}
            revenue={this.props.revenue}
            standPrice={this.props.standPrice}
            addStand={this.props.addStand}
          />
        </div>
      )
    }
  })

  var BarProgress = React.createClass({
    render: function() {
      return(
        <div  className='progressBar'>
          <div id="myProgress" onClick={()=>{this.props.loading(this.props.time, this.props.name,this.props.capital)}}>
            <div id="myBar" style={{width:this.props.width + '%'}}></div>
            <div id="label">{this.props.time}</div>
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
      var time = this.props.time
      var name = this.props.name
      return(
        <div className="thumb" onClick={()=>{this.props.loading(time, name)}}>
          <img src="http://placehold.it/50x50" alt={name} role="presentation" />
          <div>{this.props.quantity}</div>
        </div>
      )
    }
  })

  var RevenueBuyStandContainer = React.createClass({
    render: function(){
      return(
        <div className='rev'>
          <BuyStand addStand={this.props.addStand} name={this.props.name} standPrice={this.props.standPrice}/>
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
        <div className="buystand" onClick={()=>{this.props.addStand(this.props.name)}}>
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
        <img src="http://placehold.it/50x50" role="presentation" onClick={()=>{this.props.buyStand(this.props.name)}} />
        <div>
          <span>{this.props.name} </span>
          <span>${this.props.standPrice}</span>
        </div>
      </div>
    )
    }
  })

  export default App;

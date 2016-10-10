import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      buyedStand:{
        lemonade:{
          name: 'lemonade',
          revenue:20,
          standPrice:200,
          quantityStand:1,
          time:500,
          width: 0,
          running: false,
          indexRevenue: 1.2,
          newStandPrice:1000,
          initTime: 0
        }
      },
      availableStand:{
        newspaper:{
          revenue:100,
          standPrice:250,
          quantityStand:1,
          time:1500,
          name:'newspaper',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:1050,
          initTime: 0
        },
        donutShop:{
          revenue:150,
          standPrice:400,
          quantityStand:1,
          time:10000,
          name:'donutShop',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:1500,
          initTime: 0
        },
        pizzaShop:{
          revenue:205,
          standPrice:750,
          quantityStand:1,
          time:2000,
          name:'pizzaShop',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:1750,
          initTime: 0
        },
        bank:{
          revenue:150,
          standPrice:830,
          quantityStand:1,
          time:1000,
          name:'bank',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:3000,
          initTime: 0
        },
        movieStudio:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'movieStudio',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:4200,
          initTime: 0
        },
        oilCompany:{
          revenue:150,
          standPrice:1250,
          quantityStand:1,
          time:1000,
          name:'oilCompany',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:10000,
          initTime: 0
        }
      },
      capital: 0,
    }
    this.addStand = this.addStand.bind(this)
    this.loading = this.loading.bind(this)
    this.buyStand = this.buyStand.bind(this)
  }
  sumCapital(revenue){
    var total = this.state.capital + revenue
    this.setState({capital: total})
  }
  addStand(name) {
    var state = this.state
    var buyedStand = state.buyedStand
    var capital = state.capital
    var total
    var revenue
    var standPrice
    if (capital >= buyedStand[name].standPrice) {
      total = capital - buyedStand[name].standPrice
      buyedStand[name].quantityStand++
      revenue = Math.round(buyedStand[name].revenue + (buyedStand[name].quantityStand * buyedStand[name].indexRevenue))
      buyedStand[name].revenue = revenue
      standPrice = buyedStand[name].standPrice + (buyedStand[name].quantityStand * 2)
      buyedStand[name].standPrice =  standPrice
      this.setState({capital:total})
      this.setState({buyedStand:buyedStand})
    }
  }
  loading(key){
    var state = this.state
    if (state.buyedStand[key].running === false) {
      var initTime = Date.now()
      state.buyedStand[key].initTime = initTime
      state.buyedStand[key].running = !state.buyedStand[key].running
    }
  }
  buyStand(key){
    var state = this.state
    var availableStand = state.availableStand
    var buyedStand = state.buyedStand
    var capital = state.capital
    var total
    if (capital >= availableStand[key].newStandPrice) {
      total = capital - availableStand[key].newStandPrice
      buyedStand[key] = availableStand[key]
      this.setState({buyedStand:buyedStand})
      delete availableStand[key]
      this.setState({capital:total})
    }
  }
  componentDidMount(){
    setInterval(()=>{
      // ßßconsole.log(cuadros++);
      var stands = this.state.buyedStand
      Object.keys(stands).map((key)=>{
        if (stands[key].initTime !== 0){
          // Do what ever operation you need...
            var tiempoActual = Date.now()
            var tiempoTranscurrido = tiempoActual - stands[key].initTime;
            var porcentaje = tiempoTranscurrido / stands[key].time * 100
            if(stands[key].width >= 100){
              stands[key].width = 0
              stands[key].initTime = 0
              stands[key].running = !stands[key].running
              this.setState({buyedStand:stands})
              this.sumCapital(stands[key].revenue)
            }else{
              var percent = Math.floor(porcentaje)
              percent = (percent > 100)? 100:percent;
              stands[key].width = percent
              this.setState({buyedStand:stands})
            }
        }
      })
    },1000/30)

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
            newStandPrice={availableStand[item].newStandPrice}
            capital={this.props.capital}
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
          <div id="myProgress" onClick={()=>{this.props.loading(this.props.name)}}>
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
          <span>${this.props.monto}</span>
        </div>
      )
    }
  })

  var Thumbnail = React.createClass({
    render: function(){
      var name = this.props.name
      return(
        <div className="thumb" onClick={()=>{this.props.loading(name)}}>
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
      var capital = this.props.capital
      var newStandPrice = this.props.newStandPrice
      var activeClass = (capital>=newStandPrice)? 'newstand active':'newstand';
      return(
      <div className={activeClass} onClick={()=>{this.props.buyStand(this.props.name)}}>
        <img src="http://placehold.it/50x50" role="presentation"/>
        <div>
          <span>{this.props.name}</span>
          <span>${newStandPrice}</span>
        </div>
      </div>
    )
    }
  })

  export default App;

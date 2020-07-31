import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
  static protTypes = {
    match: PropTypes.object
  }
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount(){
    const { params } = this.props.match;
    // forst reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`,{
      context: this,
      state: 'fishes'
    })
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }
  addFish= (fish) => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes
    })
  };

  // events passed from child to parent
  updateFish = (key, updatedFish) => {
    // take a copy of an current state
    const fishes = { ...this.state.fishes };
    // update the state
    fishes[key] = updatedFish;
    // set that to state
    this.setState({ fishes })
  }
  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    //update in firebase by setting to null
    fishes[key] =null;
    this.setState({ fishes })
  }
  deleteFishFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order })
  }
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  };
  addToOrder = (key) => {
    const order = {...this.state.order};
    // eighter add to the order or update the numer in our order
    order[key] = order[key] + 1 || 1;
    this.setState({order});
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key}
                index={key} 
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
            
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFishFromOrder={this.deleteFishFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
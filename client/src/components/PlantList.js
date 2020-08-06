import React, { Component } from "react";
import axios from "axios";
import "./PlantList.css";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array

  constructor(props) {
    super(props);
    this.state = { plants: [], filter: "all", filteredPlants: [] };
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  componentDidMount() {
    axios.get(`http://localhost:3333/plants`).then((res) => {
      console.log(res.data);
      this.setState({ ...this.state, plants: res.data.plantsData });
    });
  }

  handleFilter(e) {
    if (this.state.filter !== "all") {
      let filteredPlants = this.state.plants.filter((p) => {
        return p.difficulty === this.state.filter;
      });

      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
        filteredPlants: filteredPlants,
      });
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
      });
    }
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <div className="filter-div">
          <label htmlFor="difficulty">Filter By Difficulty</label>
          <select
            id="difficulty"
            onChange={(e) => this.handleFilter(e)}
            name="filter"
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
          </select>
        </div>
        {this.state.filter !== "all"
          ? this.state.filteredPlants.map((plant) => (
              <div className="plant-card" key={plant.id}>
                <img className="plant-image" src={plant.img} alt={plant.name} />
                <div className="plant-details">
                  <h2 className="plant-name">{plant.name}</h2>
                  <p className="plant-scientific-name">
                    {plant.scientificName}
                  </p>
                  <p>{plant.description}</p>
                  <div className="plant-bottom-row">
                    <p>${plant.price}</p>
                    <p>☀️ {plant.light}</p>
                    <p>💦 {plant.watering}x/month</p>
                  </div>
                  <button
                    className="plant-button"
                    onClick={() => this.props.addToCart(plant)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          : this.state?.plants?.map((plant) => (
              <div className="plant-card" key={plant.id}>
                <img className="plant-image" src={plant.img} alt={plant.name} />
                <div className="plant-details">
                  <h2 className="plant-name">{plant.name}</h2>
                  <p className="plant-scientific-name">
                    {plant.scientificName}
                  </p>
                  <p>{plant.description}</p>
                  <div className="plant-bottom-row">
                    <p>${plant.price}</p>
                    <p>☀️ {plant.light}</p>
                    <p>💦 {plant.watering}x/month</p>
                  </div>
                  <button
                    className="plant-button"
                    onClick={() => this.props.addToCart(plant)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
      </main>
    );
  }
}

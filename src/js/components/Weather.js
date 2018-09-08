import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { isFahrenheit: true };
  }
  
  displayTemperature(temperature, isFahrenheit) {
    if (isFahrenheit) {
      return `${Math.round(temperature)}°F`;
    }
    return `${Math.round( (temperature - 32) * (5/9) )}°C`;
  }

  componentDidMount() {
    this.props.fetchWeather();
  }

  render() {
    const { weather } = this.props;
    if (weather.sys) {
      return (
        <div className="container text-center">
          <h1>Simple Weather App</h1>
          <div className="card">
            <div className="card-header bg-dark weather-location"><h3>{`${weather.name}, ${weather.sys.country}`}</h3></div>
            <div className="card-body bg-light">
              <div className="weather-temperature">{this.displayTemperature(weather.main.temp, this.state.isFahrenheit)}</div>
              <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].main} />
              <div>{weather.weather[0].main}</div>
              <button className="btn btn-link" onClick={() => this.setState({ isFahrenheit: !this.state.isFahrenheit })}>Change Units</button>
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

function mapStateToProps( { weather } ) {
  return { weather };
}

export default connect(mapStateToProps, actions)(Weather);
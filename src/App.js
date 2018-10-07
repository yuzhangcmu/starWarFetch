import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderList = this.renderList.bind(this);
    //this.handleItemClick = this.handleItemClick.bind(this);
    this.renderCharacter = this.renderCharacter.bind(this);
    this.state = {
      list: [],
      index: null
    }
  }

  async handleChange (event) {
    const searchStr = event.target.value;
    console.log(event.target.value);
    if (!searchStr) {
      return;
    }

    const url = 'https://swapi.co/api/people/?search=' + searchStr;
    try {
      const result = await axios.get(url);
      this.setState({
        list: result.data.results
      });

      console.log(result);
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  handleItemClick(index) {
    console.log("on click: " + index);
    this.setState({ index });
  }

  renderCharacter() {
    const { list, index } = this.state;
    console.log("list: " + list);
    console.log("index: " + index);
    if (index == null) {
      return;
    }

    const character = list[index];

    return (
      <div className="Side-bar">
        <h2>{ character.name }</h2>
        <br/>
        <b>Hair Color</b>
        <div>{ character.hair_color }</div>
        <b>Skin Color</b>
        <div>{ character.skin_color }</div>
        <b>Eye Color</b>
        <div>{ character.eye_color }</div>
        <b>Birth Year</b>
        <div>{ character.birth_year }</div>
        <b>Gender</b>
        <div>{ character.gender }</div>
      </div>
    );
  }

  renderList() {
    const { list } = this.state;
    const listDiv = list.map((item, i) =>
          <div key={i}
               className="Character-name"
               onClick={ this.handleItemClick.bind(this, i) }
          >
            { item.name }
          </div>
    );

    return listDiv;
  }

  render() {
    const logUrl = "https://via.placeholder.com/350x150";

    return (
      <div className="App">
        <header className="App-header">
          <img src={logUrl} className="App-logo" alt="logo" />
          <h1 className="App-title">Star Wars Character Search</h1>
        </header>

        <div className="Content">
          <div className="Main-content">
            <div className="Sub-title">Search for your favorite Star Wars characters in the search box below</div>
            <b>Search:</b>
            <div className="Input-box">
              <input className="Search-box"
                onChange={ this.handleChange }
              >
              </input>
            </div>
              <b>Characters:</b>
              { this.renderList() }
            <div>
            </div>
          </div>
          <div className="headerDivider"></div>
          { this.renderCharacter() }        
        </div>
      </div>

    );
  }
}

export default App;

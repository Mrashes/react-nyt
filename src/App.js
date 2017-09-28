import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from 'axios'

import Saved from './components/Saved'
import Results from './components/Results'
import Search from './components/Search'
import Title from './components/Title'

class App extends Component {

  state = {
    query: "",
    start: "",
    end: "",
    result: []
  }

  searchNYT = (query, start, end) => {
      var apiKey = '8732a00e62b74f3293fa5ce646a98207';
      axios.get(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${start}0101&end_date=${end}0101&api-key=${apiKey}`)
      .then(res => {
        console.log(res.data.response.docs)
        this.setState({ result: res.data.response.docs})
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]:value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchNYT(this.state.query, this.state.start, this.state.end);
    this.setState({ query: "", start:"", end:""})
  };


  render() {
    return (
      <Router>
        <div className="container">
          <Title />
          <Search 
            submit={this.handleFormSubmit} 
            change={this.handleInputChange}
            query={this.state.query} 
            start={this.state.start} 
            end={this.state.end}
          />
          <Route exact path="/results" component={() => <Results articleList={this.state.result}/>}/>
          <Route exact path="/results/Saved" component={() => <Saved />} />
          <Results 
            articleList={this.state.result}
          />
          {/* <Saved /> */}
        </div>
      </Router>
    );
  }
}

export default App;

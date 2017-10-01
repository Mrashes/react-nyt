import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from 'axios'
import API from './utils/API.js'

import Saved from './components/Saved'
import Results from './components/Results'
import Search from './components/Search'
import Title from './components/Title'

class App extends Component {

  state = {
    query: "",
    start: "",
    end: "",

    result: [],

    saved: []
  }

  searchNYT = (query, start, end) => {
      const apiKey = '8732a00e62b74f3293fa5ce646a98207';
      axios.get(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${start}0101&end_date=${end}0101&api-key=${apiKey}`)
      .then(res => {
        // console.log(res.data.response.docs)
        this.setState({ result: res.data.response.docs})
      })
      .catch(err => console.log(err));
  };
  
  saveArticle = event => {
    const savedArticle = this.state.result.filter(result => result._id===event.target.id);
    let Mongo = {
      paper_id: savedArticle[0]._id,
      web_url: savedArticle[0].web_url,
      pub_date: savedArticle[0].pub_date,
      headline: savedArticle[0].headline.main,
    };
    API.saveArticle(Mongo);
    // this.setState({ saved: this.state.saved.concat(savedArticle) })
  }

  removeArticle = event => {
    let savedState = this.state.saved
    const removedArticle = savedState.filter(saved => saved._id===event.target.id);
    savedState.splice(savedState.indexOf(removedArticle[0]), 1)
    // savedState.splice(savedState.indexOf(removedArticle[0]), 1)
    this.setState({ saved: savedState })
  }

  // componentDidMount = () => {

  // }

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
      <div className="container">
        <Title />
        <Search 
          submit={this.handleFormSubmit} 
          change={this.handleInputChange}
          query={this.state.query} 
          start={this.state.start} 
          end={this.state.end}
        />
        <Results 
          articleList={this.state.result}
          save={this.saveArticle}
        />
        <Saved 
          savedArticleList={this.state.saved}
          remove={this.removeArticle}
        />
      </div>
    );
  }
}

export default App;

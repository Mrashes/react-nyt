import React, { Component } from 'react';
import API from '../utils/API.js'

class Saved extends Component {
    state = {
        saved: []
    }

    populateSaved = () => {
        API.getArticles().then(res => {
            // console.log(res.data)
            this.setState({ saved: res.data})
          })
          .catch(err => console.log(err));

    }

  render() {
    return(
        <ul className="list-group">
            {this.state.saved.map(article => (
                <li className="list-group-item" key={article._id}>
                    <a href={article.web_url} data-date={article.pub_date}>{article.headline}</a>
                    {/* <button 
                        onClick={this.props.remove} 
                        id={article._id}
                    >
                    remove
                    </button> */}
                    {/* <button onClick={this.populateSaved}>Saved</button> */}
                </li>
            ))}
            <button onClick={this.populateSaved}>Saved</button>
        </ul>
    )
}
}

export default Saved;

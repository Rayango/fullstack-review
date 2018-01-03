import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    this.retrieve();
  }

  retrieve() {
    var updateState = this.setState.bind(this);
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      dataType: 'json',
      success: function(res) {
        updateState({ repos: res.slice(0, 25) });
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      // dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ term: term })
    }).done( () => {
      console.log('post request complete');
      this.retrieve();
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
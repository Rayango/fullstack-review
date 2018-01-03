import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  resetFields() {
    this.setState({
      term: ''
    });
  }

  search(event) {
    event.preventDefault();
    this.props.onSearch(this.state.term);
    this.resetFields();
  }

  render() {
    return (<form onSubmit={(event) => this.search(event)}>
      <br />
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button> Add Repos </button>
    </form>) 
  }
}

export default Search;
import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br />
    <br />
    <div>
      <table>
        <tr id="header">
          <td> Name </td>
          <td> Description </td>
          <td> Stargazers </td>
        </tr>
          {
            props.repos.map( (repo) => <Repo repo={repo} />)
          }
      </table>
    </div>
  </div>
)

export default RepoList;
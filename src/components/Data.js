import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = "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";
const Data = (props) => {
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);

  
  const query = `
    query {
      user(login: "${props.username}") {
        login
        name
        avatarUrl
      }
      viewer {
        repositories(last: 5) {
          nodes {
            name
          }
        }
      }
    }
  `;

 
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .post('https://api.github.com/graphql', { query }, { headers })
      .then((response) => {
        const data = response.data.data;
        setUserData(data.user);
        setRepos(data.viewer.repositories.nodes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <img src={userData.avatarUrl} alt="User Avatar" height="50%" width="50%"/>
        <p>Username: {userData.login}</p>
        <p>Name: {userData.name}</p>
      </div>

      <h1>Recent Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Data;

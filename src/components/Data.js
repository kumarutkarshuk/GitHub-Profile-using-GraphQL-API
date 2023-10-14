import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Data = (props) => {
  // console.log(props.username);

  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = 'https://api.github.com/graphql';
  const token = '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';

  const graphqlQuery = `
  query ($username: String!) {
    user(login: $username) {
      login
      name
      bio
    }
  }
  `;

  const makeGitHubGraphQLRequest = async (username) => {
    const graphqlQuery = `
      query ($username: String!) {
        user(login: $username) {
          login
          name
          bio
          avatarUrl
        }
      }
    `;

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      setLoading(true);
      const response = await axios.post(apiUrl, { query: graphqlQuery, variables: { username } }, { headers });
      setLoading(false);
      const responseData = response.data.data.user;
      // console.log(responseData);
      setUserData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    makeGitHubGraphQLRequest(props.username);
  }, [props.username]);

  return (
    <div>
      {userData && !loading && (
        <div>
          <p>Username: {userData.login}</p>
          <p>Name: {userData.name}</p>
          <p>Bio: {userData.bio}</p>
          <img src={userData.avatarUrl}/>
        </div>
      )}

      {!userData && !loading && <p>No Data Found</p>}

      {loading && <div class="spinner"></div>}
    </div>
  )
}

export default Data;
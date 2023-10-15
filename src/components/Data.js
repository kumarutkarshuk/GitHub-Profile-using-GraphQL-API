import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Heatmap from "./Heatmap"



const Data = (props) => {
  // console.log(props.username);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [contributionData, setContributionData] = useState(null);
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
          repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes {
              name
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
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
      // console.log(responseData.contributionsCollection.contributionCalendar.weeks);

      if(!responseData){
        setUserData(null);
      }
      
      setUserData(responseData);
      setRepositories(responseData.repositories.nodes);
      setContributionData(responseData.contributionsCollection.contributionCalendar);
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
        <div className='bg-[#1E2A47] rounded-xl p-6'>

          <div className='flex'>

            <img src={userData.avatarUrl} className='w-[20%] h-[20%] rounded-full'/>
            <div>
              <p>{userData.name}</p>
              <p>{userData.login}</p>
              <p>{userData.bio}</p>
              <ul>
                {repositories.map((repo, index) => (
                <li key={index}>{repo.name}</li>
                ))}
            </ul>
          <p>Total Contributions: {contributionData.totalContributions}</p>
            </div>



          </div>
          
          
      
        <div>
        </div>
              <Heatmap contributionData={contributionData}/>
        </div>
      )}

      {!userData && !loading && <p>No Data Found</p>}
      {loading && <div class="spinner"></div>}
    </div>
  )
}

export default Data;
import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import Heatmap from "./Heatmap"
import Repos from './Repos';
import UserDetails from './UserDetails';

const Data = (props) => {
  // console.log(props.username);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [contributionData, setContributionData] = useState(null);
  const apiUrl = 'https://api.github.com/graphql';
  const token = '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';


  const makeGitHubGraphQLRequest = async (username) => {
    
    const graphqlQuery = `
      query ($username: String!) {
        user(login: $username) {
          login
          name
          bio
          avatarUrl
          repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes{
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
      // console.log(responseData.email);

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
    <div className='flex justify-center w-[110%] lg:w-[135%] min-h-[75%] '>

      {userData && !loading && (
        <div className='bg-[#1E2A47] rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 lg:gap-0'>

            <UserDetails userData={userData} username={props.username}/>

            <Repos repositories={repositories} username={props.username}/>
            
            <Heatmap contributionData={contributionData}/>
    
        </div>
      )}

      {!userData && !loading && <p>No Data Found</p>}
      
      {loading && <div class="spinner"></div>}
    </div>
  )
}
export default Data;
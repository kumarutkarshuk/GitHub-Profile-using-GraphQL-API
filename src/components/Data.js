import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import Heatmap from "./Heatmap"
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import {AiFillFolder} from "react-icons/ai"




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
          repositories(first: 15, orderBy: { field: CREATED_AT, direction: DESC }) {
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
    <div className='flex justify-center w-[110%] md:w-[135%] min-h-[75%]'>

      {userData && !loading && (
        <div className='bg-[#1E2A47] rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className='flex flex-col items-center md:items-start'>
              <img src={userData.avatarUrl} className='w-[50%] aspect-auto rounded-full mb-3'/>
              <p className='font-extrabold text-2xl'>{userData.name}</p>
              <a href={'https://github.com/'+ props.username} target='_blank' className='text-blue-300 underline'>@{userData.login}</a>
              <p className='text-sm mt-3 mb-3 text-center md:text-left'>{userData.bio}</p>
              <Heatmap contributionData={contributionData}/>
            </div>

            <div className='flex flex-col items-center '>
              <p className='mb-5'>Total Contributions: <span className='text-green-200'>{contributionData.totalContributions}</span></p>
              <h1 className='mb-5'>Most Recent Repos:</h1>
              <ul className="">
                {repositories.map((repo, index) => (
                  <div className='flex gap-2 shrink'>
                  <AiFillFolder/>
                  <li key={index} className='text-base'><a href={'https://github.com/'+ props.username+'/'+repo.name} 
                  target='_blank' className="text-blue-300 underline">{repo.name}</a></li>
                  </div>
                
                ))}
              </ul>
              
            </div>     
        </div>
      )}

      {!userData && !loading && <p>No Data Found</p>}
      {loading && <div class="spinner"></div>}
    </div>
  )
}

export default Data;
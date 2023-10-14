import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const CommitHistoryAndHeatmap = () => {
  const [commits, setCommits] = useState([]);
  const [commitData, setCommitData] = useState({});

  const fetchCommitHistory = () => {
    
    const query = `
      query {
        repository(owner: "owner_username", name: "repository_name") {
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 10) {
                  nodes {
                    message
                    author {
                      name
                    }
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    `;

    const token = "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";
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    axios
      .post('https://api.github.com/graphql', { query }, { headers })
      .then((response) => {
        const commitNodes = response.data.data.repository.defaultBranchRef.target.history.nodes;
        setCommits(commitNodes);

        
        const commitDates = commitNodes.map((commit) => commit.committedDate);
        const commitCounts = Array(commitDates.length).fill(1);

        setCommitData({
          labels: commitDates,
          datasets: [
            {
              data: commitCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCommitHistory();
  }, []);

  return (
    <div>
      <h1>Commit History</h1>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>
            <strong>Author:</strong> {commit.author.name}, <strong>Date:</strong> {commit.committedDate}<br />
            <strong>Message:</strong> {commit.message}
          </li>
        ))}
      </ul>

      <h1>Commit Heatmap</h1>
      <Line
        data={commitData}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
};

export default CommitHistoryAndHeatmap;

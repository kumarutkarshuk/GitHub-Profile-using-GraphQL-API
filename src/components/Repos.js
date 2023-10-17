import React from 'react'
import {AiFillFolder} from "react-icons/ai"
const Repos = (props) => {
    const repositories=props.repositories
  return (
    <div className='flex flex-col items-center lg:items-start lg:pl-10'>
        <div className='w-full'>
            <h1 className='mb-5 text-left font-extrabold'>Most Recent Repos:</h1>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            {repositories.map((repo, index) => (

            <div key={index} className='flex items-center gap-2 w-full'>
                <div><AiFillFolder/></div>
                    
                <a href={'https://github.com/'+ props.username+'/'+repo.name} 
                target='_blank' className="text-blue-300 underline text-sm break-words w-full">{repo.name}</a>
            </div>
                  
            ))}
            </div>
    </div>
  )
}

export default Repos
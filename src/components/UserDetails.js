import React from 'react'

const UserDetails = (props) => {
    const userData = props.userData;
  return (
    <div className='flex flex-col items-center lg:items-start'>
        <img src={userData.avatarUrl} className='w-[50%] aspect-auto rounded-full mb-3'/>
        <p className='font-extrabold text-2xl text-center lg:text-left'>{userData.name}</p>
        <a href={'https://github.com/'+ props.username} target='_blank' className='text-blue-300 underline break-words w-full text-center lg:text-left'> @{userData.login}</a>
        <p className='text-sm mt-3 mb-3 text-center lg:text-left'>{userData.bio}</p>
     </div>
  )
}

export default UserDetails
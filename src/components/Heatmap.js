import React from 'react'
import Calendar from 'react-github-contribution-calendar';

const Heatmap = (props) => {
    const values = {};
    props.contributionData.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        values[day.date] = day.contributionCount;
      });
    });

    // console.log(values);

    const panelColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
    return (
        
         <div className='lg:col-span-2 flex flex-col justify-center items-center'>
            <p className='mb-5 text-center font-extrabold '>Total Contributions: <span className='text-[#40c463]'>{props.contributionData.totalContributions}</span></p>
            <div className='flex justify-center lg:justify-start w-full mt-2'>
              <Calendar values={values} until={new Date()} panelColors={panelColors}/>
            </div>  
        </div>
    )
}


export default Heatmap


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
         <div>
           <Calendar values={values} until={new Date()} panelColors={panelColors}/>
         </div>
    )
}


export default Heatmap


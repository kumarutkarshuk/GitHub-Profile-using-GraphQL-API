import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';



const Heatmap = (props) => {
    const values = props.contributionData.weeks.flatMap((val)=> val.contributionDays.map((item)=>({
      date: item.date,
      count: item.contributionCount 
    })));
    // console.log(values);  

    
    
    return (
         <div>
            <CalendarHeatmap
              endDate={new Date()}
              values={values}
            />
         </div>
    )
}


export default Heatmap


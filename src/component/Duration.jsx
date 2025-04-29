import React from 'react'

export default function Duration({timeStamp}) {

    // Given Unix timestamp in milliseconds
const unixTimestamp = +timeStamp;

// Get the current time in milliseconds
const currentTime = Date.now();

// Calculate the difference in milliseconds
const timeDifference = currentTime - unixTimestamp;

// Convert the difference into seconds, minutes, hours, or days
const differenceInSeconds = Math.floor(timeDifference / 1000);
const differenceInMinutes = Math.floor(differenceInSeconds / 60);
const differenceInHours = Math.floor(differenceInMinutes / 60);
const differenceInDays = Math.floor(differenceInHours / 24);

// Output the results
// console.log(`Difference in milliseconds: ${timeDifference}`);
// console.log(`Difference in seconds: ${differenceInSeconds}`);
// console.log(`Difference in minutes: ${differenceInMinutes}`);
// console.log(`Difference in hours: ${differenceInHours}`);
// console.log(`Difference in days: ${differenceInDays}`);

  return (

        <div> 
        {differenceInMinutes < 60 &&  <div>  {differenceInMinutes} M.</div>}
        { differenceInMinutes > 60 && differenceInMinutes < 1400 && <div> {differenceInHours} H.</div>}
        { differenceInMinutes > 1400 && <div> {differenceInDays} D.</div>}
          </div>
          // <div>  {differenceInMinutes} Minutes</div>
  )
}

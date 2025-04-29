const DisplayDate = ({ timestamp ,textColor}) => {
  // Convert Unix timestamp to milliseconds and create a Date object
  if(timestamp){

    const date = new Date(+timestamp);
    const time = new Date(+timestamp);
    // Step 3: Format Date object to Thailand timezone with milliseconds
    const formatterDate = new Intl.DateTimeFormat("en-TH", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const formatterTime = new Intl.DateTimeFormat("en-TH", {
      timeZone: "Asia/Bangkok",
      hour: "2-digit",
      minute: "2-digit"
    });
    // Format the date and extract the formatted date part
    const formattedDate = formatterDate.format(date);
    const formattedTime = formatterTime.format(time);
    // Construct the final formatted date string including milliseconds
    const thailandTimeWithMillis = `${formattedDate+" "+formattedTime}`;
  
    return <p className={`${textColor} w-auto`}>{thailandTimeWithMillis}</p>;
  }
};

export default DisplayDate;
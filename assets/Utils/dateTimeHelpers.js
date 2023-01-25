// @param dateTime - DateTime JS object
// @return string - 2022-03-30T09:22
export const dateTimeToISOString = (dateTime) => {
    let hour = leadingZero( dateTime.getHours() );
    let minute = leadingZero( dateTime.getMinutes() );
    return dateToISOString(dateTime) + "T" + hour + ":" + minute;
}

// @param date - Date JS object
// @return string - 2022-03-30
export const dateToISOString = (date) => {
    let month = leadingZero( date.getMonth() + 1) ;
    let day = leadingZero( date.getDate() );
    return date.getFullYear() + "-" + month + "-" + day
}

const leadingZero = (value) => {
    return (value < 10) ? "0" + value : value;
}
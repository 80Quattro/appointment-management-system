// @param dateTime - DateTime JS object
// @return string - 2022-03-30T09:22
export const dateTimeToISOString = (dateTime) => {
    const hour = leadingZero( dateTime.getUTCHours() );
    const minute = leadingZero( dateTime.getUTCMinutes() );
    return dateToISOString(dateTime) + "T" + hour + ":" + minute;
}

// @param date - Date JS object
// @return string - 2022-03-30
export const dateToISOString = (date) => {
    const year = date.getUTCFullYear();
    const month = leadingZero( date.getUTCMonth() + 1) ;
    const day = leadingZero( date.getUTCDate() );
    return year + "-" + month + "-" + day
}

const leadingZero = (value) => {
    return (value < 10) ? "0" + value : value;
}
/**
 * 
 * @param {Date} dateTime 
 * @returns {string} ex. 2022-03-30T09:22 
 */
export const dateTimeToISOString = (dateTime) => {
    const hour = leadingZero( dateTime.getUTCHours() );
    const minute = leadingZero( dateTime.getUTCMinutes() );
    return dateToISOString(dateTime) + "T" + hour + ":" + minute;
}

/**
 * 
 * @param {Date} date 
 * @returns {string} ex. 2022-03-30 
 */
export const dateToISOString = (date) => {
    const year = date.getUTCFullYear();
    const month = leadingZero( date.getUTCMonth() + 1) ;
    const day = leadingZero( date.getUTCDate() );
    return year + "-" + month + "-" + day
}

/**
 * 
 * @param {string} dateString ex. 2022-03-30T09:22
 * @returns {Date}
 */
export const parseFromISOString = (dateString) => {
    let splitted = dateString.split('T');
    let date = splitted[0];
    let time = splitted[1];
    
    date = date.split('-');
    let year = date[0];
    let month = date[1];
    let day = date[2];

    time = time.split(':');
    let hour = time[0];
    let minute = time[1];

    const converted = new Date();
    converted.setFullYear(year);
    converted.setMonth(month);
    converted.setDate(day);
    converted.setHours(hour);
    converted.setMinutes(minute);
    converted.setSeconds(0);

    return converted;
}

const leadingZero = (value) => {
    return (value < 10) ? "0" + value : value;
}
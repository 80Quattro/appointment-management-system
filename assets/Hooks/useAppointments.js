import {useEffect, useState} from 'react';
import AppointmentAPI from '../Services/AppointmentsAPI';

const useAppointments = (date) => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        // if no date provided - set date to today
        if(date === null) {
            date = new Date();
        }

        AppointmentAPI.read(date).then((data) => {
            console.log(data);
        })

    }, [date]);

    return appointments;
}
 
export default useAppointments;

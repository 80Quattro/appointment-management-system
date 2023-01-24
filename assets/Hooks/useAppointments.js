import {useEffect, useState} from 'react';
import AppointmentAPI from '../Services/AppointmentsAPI';

const useAppointments = (startDate, endDate) => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        if(startDate === null || endDate === null) {
            return;
        }

        AppointmentAPI.readAvailable(startDate, endDate).then((data) => {
            let appointments = new Array();
            data.forEach(date => {
                appointments.push({
                    title: 'Free!',
                    start: date,
                })
            });
            setAppointments(appointments);
        })

    }, [endDate]);

    return appointments;
}
 
export default useAppointments;

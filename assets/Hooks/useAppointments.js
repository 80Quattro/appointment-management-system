import {useEffect, useState} from 'react';
import AppointmentAPI from '../Services/AppointmentsAPI';

const useAppointments = (startDate, endDate) => {

    const [appointments, setAppointments] = useState([]);

    // show/hide spinner
    const [loading, setLoading] = useState(false); 

    useEffect(() => {

        if(startDate === null || endDate === null) {
            return;
        }

        setLoading(true);

        AppointmentAPI.readAvailable(startDate, endDate).then((data) => {
            let appointments = new Array();
            data.forEach(date => {
                appointments.push({
                    title: 'Free!',
                    start: date,
                })
            });
            setAppointments(appointments);
            setLoading(false);
        })

    }, [endDate]);

    return [appointments, loading];
}
 
export default useAppointments;

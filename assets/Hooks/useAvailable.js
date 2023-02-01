import {useEffect, useState} from 'react';
import AppointmentAPI from '../Services/AppointmentsAPI';

const useAvailable = (startDate, endDate) => {

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
                    title: 'Available',
                    start: date.start,
                    end: date.end
                })
            });
            setAppointments(appointments);
            setLoading(false);
        })

    }, [endDate]);

    return [appointments, loading];
}
 
export default useAvailable;

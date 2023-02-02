import { useEffect, useState } from "react";

import AppointmentAPI from "../Services/AppointmentsAPI";

import { parseFromISOString } from "../Utils/dateTimeHelpers";

const useUserAppointments = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        AppointmentAPI.getUserAppointments().then((data) => {
            data = data.map((d) => ({
                id: d.id, 
                date: parseFromISOString(d.date).toLocaleString(), 
                status: d.status
            }));
            setAppointments(data);
        });

    }, []);

    return [appointments];

}

export default useUserAppointments;
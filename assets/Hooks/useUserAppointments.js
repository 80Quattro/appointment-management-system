import { useEffect, useState } from "react";

import AppointmentAPI from "../Services/AppointmentsAPI";

const useUserAppointments = (userName) => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        AppointmentAPI.getUserAppointments().then((data) => {
            console.log(data);
            setAppointments(data);
        });

    }, []);

    return [appointments];

}

export default useUserAppointments;
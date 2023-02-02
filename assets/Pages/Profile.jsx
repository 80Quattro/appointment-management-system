import React, { useContext, useState } from 'react';

import { UserContext } from '../Contexts/UserContext';
import Row from 'react-bootstrap/Row';
import UserAppointmentsTable from '../Components/UserAppointmentsTable';
import useUserAppointments from '../Hooks/useUserAppointments';

const Profile = () => {

    const {userName} = useContext(UserContext);
    const [appointments] = useUserAppointments();

    return (
        <Row>
            <div>You are logged in as <b>{userName}</b>!</div>
            <UserAppointmentsTable appointments={appointments} />
        </Row>
    );
}
 
export default Profile;
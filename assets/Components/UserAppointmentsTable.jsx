import React from 'react';

import Table from 'react-bootstrap/Table';

const UserAppointmentsTable = ({appointments}) => {
    return (
        <div>
            <h5>Your appointments</h5>
            <Table striped bordered hover>
                <tbody>
                {appointments.map(appointment => (
                    <tr key={appointment.id}>
                        <td>{appointment.date}</td>
                        <td>{appointment.status}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}
 
export default UserAppointmentsTable;
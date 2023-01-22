import React, { useState } from 'react';
import useAppointments from '../Hooks/useAppointments';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Appointments = () => {

    const [date, setDate] = useState(null);
    const appointments = useAppointments(date);

    return (
        <Row>
            <Col>
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
                    initialView="timeGridWeek"
                    firstDay={1}
                    slotMinTime={'07:00:00'}
                    slotMaxTime={'19:00:00'}
                    slotLabelInterval={'00:30'}
                    defaultAllDay={false}
                    contentHeight='auto'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listWeek'
                    }}
                    events={[
                        { title: 'event 2', start: '2023-02-02T12:30:00', end: '2023-02-02T13:00:00', allDay: false }
                    ]}
                    displayEventTime={true}
                    businessHours={{
                        // days of week. an array of zero-based day of week integers (0=Sunday)
                        daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
                      
                        startTime: '10:00', // a start time (10am in this example)
                        endTime: '18:00', // an end time (6pm in this example)
                    }}
                    validRange={{
                        start: '2023-01-01',
                        end: '2023-03-30'
                    }}
                />
            </Col>
        </Row>
    );
}

export default Appointments;
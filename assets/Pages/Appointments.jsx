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

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const appointments = useAppointments(startDate, endDate);

    const onDateSet = (dateInfo) => {
        console.log(dateInfo.start, dateInfo.end);
        setStartDate(dateInfo.start);
        setEndDate(dateInfo.end);
    }

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
                    defaultTimedEventDuration={'00:30'}
                    contentHeight='auto'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listWeek'
                    }}
                    events={appointments}
                    displayEventTime={true}
                    businessHours={{
                        // days of week. an array of zero-based day of week integers (0=Sunday)
                        daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
                      
                        startTime: '10:00', // a start time (10am in this example)
                        endTime: '18:00', // an end time (6pm in this example)
                    }}
                    datesSet={onDateSet}
                />
            </Col>
        </Row>
    );
}

export default Appointments;
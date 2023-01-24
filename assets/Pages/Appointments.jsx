import React, { useState } from 'react';
import useAppointments from '../Hooks/useAppointments';

import ConfirmAppointmentModal from '../Components/ConfirmAppointmentModal';

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

    const [showModal, setShowModal] = useState(false);
    const [clickedDate, setClickedDate] = useState({fullDate: null, dateToShow: null, timeToShow: null});

    const onDateSet = (dateInfo) => {
        setStartDate(dateInfo.start);
        setEndDate(dateInfo.end);
    }

    const onEventClick = (info) => {
        const startDate = info.event.start;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setClickedDate({
            fullDate: startDate,
            dateToShow: startDate.toLocaleDateString(undefined, options),
            timeToShow: startDate.toLocaleTimeString('en-US')
        })
        setShowModal(true);
    }

    const onEventMouseEnter = (info) => {
        info.el.style.cursor = "pointer"; 
    }

    const onModalConfirmed = () => {
        console.log("CONFIRMED!");
    }

    return (
        <Row>
            <Col>
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
                    initialView="timeGridWeek"
                    firstDay={1}
                    allDaySlot={false}
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
                    eventSources={[{
                        events: appointments,
                        color: 'green'
                    }]}
                    displayEventTime={true}
                    displayEventEnd={true}
                    eventClick={onEventClick}
                    eventMouseEnter={onEventMouseEnter}
                    businessHours={{
                        // days of week. an array of zero-based day of week integers (0=Sunday)
                        daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
                      
                        startTime: '10:00', // a start time (10am in this example)
                        endTime: '18:00', // an end time (6pm in this example)
                    }}
                    datesSet={onDateSet}
                />
                <ConfirmAppointmentModal 
                    show={showModal} 
                    onHide={() => setShowModal(false)}
                    onConfirmed={onModalConfirmed}
                    date={clickedDate.dateToShow}
                    time={clickedDate.timeToShow}
                />
            </Col>
        </Row>
    );
}

export default Appointments;
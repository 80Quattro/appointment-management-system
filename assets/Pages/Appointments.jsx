import React, { useState } from 'react';
import useAppointments from '../Hooks/useAppointments';

import ConfirmAppointmentModal from '../Components/ConfirmAppointmentModal';

import AppointmentAPI from '../Services/AppointmentsAPI';
import Loading from '../Components/Loading';

import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const Appointments = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [appointments, appointmentsLoading] = useAppointments(startDate, endDate);

    const [showModal, setShowModal] = useState(false);
    const [clickedDate, setClickedDate] = useState({fullDate: null, dateToShow: null, timeToShow: null});

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

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
        setShowModal(false);
        AppointmentAPI.create(clickedDate.fullDate).then((data) => {
            setShowSuccess(true);
        })
    }

    return (
        <Row className='position-relative'>
            {appointmentsLoading && <Loading />}
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
                    daysOfWeek: [ 1, 2, 3, 4 ],
                    startTime: '08:00',
                    endTime: '18:00',
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
            
            <ToastContainer className="p-3" position={'bottom-center'}>
                <Toast bg={'success'} show={showSuccess} onClose={() => setShowSuccess(false)} delay={3000} autohide>
                    <Toast.Header>Success!<span className='me-auto'></span></Toast.Header>
                    <Toast.Body>Your appointment is successfuly booked!</Toast.Body>
                </Toast>
                <Toast bg={'danger'} show={showFailure} onClose={() => setShowFailure(false)} delay={3000} autohide>
                    <Toast.Header>Failure!<span className='me-auto'></span></Toast.Header>
                    <Toast.Body>Your appointment is not booked! An error occured.</Toast.Body>
                </Toast>
            </ToastContainer>

        </Row>
    );
}

export default Appointments;
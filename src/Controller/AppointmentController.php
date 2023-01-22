<?php

namespace App\Controller;

use App\Entity\Appointment;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/appointment', name: 'api_appointment')]
class AppointmentController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine, private ValidatorInterface $validator)
    {

    }

    #[Route('/create', name: 'api_appointment_create', methods: "POST")]
    public function create(Request $request): Response
    {
        // TODO: it can be only the future date
        $date = $request->request->get('date');

        $isAvailable = $this->doctrine
            ->getRepository(Appointment::class)
            ->isAvailable(\DateTime::createFromFormat('d.m.Y H:i', $date));
        
        if(!$isAvailable) {
            return new Response("Appointment is not created!", 400);
        }

        $appointment = new Appointment();
        $appointment->setDate( \DateTime::createFromFormat('d.m.Y H:i', $date) )
            ->setStatus('RESERVED');

        $errors = $this->validator->validate($appointment);
        
        if (count($errors) > 0) {

            $errorsString = (string) $errors;
    
            return new Response($errorsString, 400);
        }

        $entityManager = $this->doctrine->getManager();
        $entityManager->persist($appointment);
        $entityManager->flush();

        return new Response('Saved new appointment with id ' . $appointment->getId(), 201);
    }

    #[Route('/read/{date}', name: 'api_appointment_read', methods: "GET")]
    public function read($date): Response
    {
        $date = \DateTime::createFromFormat('d.m.Y', $date);
        $date->setTime(0,0,0);

        $appointments = $this->doctrine
            ->getRepository(Appointment::class)
            ->findByDay($date);

        if(count($appointments) === 0) {
            return new Response('Nothing found', 404);
        }

        $appointmentsArray = array();

        foreach($appointments as $appointment) {
            $appointmentsArray[] = array(
                'id' => $appointment->getId(),
                'date' => $appointment->getDate(),
            );
        }
        
        return $this->json(
            $appointmentsArray
        );
    }

    // Get available appointment dates
    #[Route('/get/free/{startDate}/{endDate}', name: 'api_appointment_get_free', methods: "GET")]
    public function getFree($startDate, $endDate): Response
    {
        // Range of dates to search
        $startDate = \DateTime::createFromFormat('d.m.Y', $startDate);
        $startDate->setTime(0,0,0);
        $endDate = \DateTime::createFromFormat('d.m.Y', $endDate);
        $endDate->setTime(24,59,59);

        // Working hours
        $minTime = new \DateTime();
        $minTime->setTime(7,0,0);
        $maxTime = new \DateTime();
        $maxTime->setTime(17,0,0);

        // Get already reserved appointments
        $appointments = $this->doctrine
            ->getRepository(Appointment::class)
            ->findByDates($startDate, $endDate);

        // convert appointments array to array with only DateTime objects
        $reserved = array();
        foreach($appointments as $app) {
            array_push($reserved, $app->getDate());
        }

        // Search for all available dates between startDate and endDate
        // and in working hours
        // TODO: exclude weekends 
        $freeAppointments = array();
        for($date = $startDate; $date < $endDate; $date->modify('+1 day')) {
            $date->setTime(
                $minTime->format("H"),
                $minTime->format("i")
            );
            for($date; intval($date->format('H')) < intval($maxTime->format('H')); $date->modify('+30 min')) {
                if(!in_array($date, $reserved)) {
                    array_push($freeAppointments, clone $date);
                }
            }
        }
        
        return $this->json(
            $freeAppointments
        );
    }
}

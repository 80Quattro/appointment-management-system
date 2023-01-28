<?php

namespace App\Controller;

use App\Entity\Appointment;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/appointment', name: 'api_appointment_')]
class AppointmentController extends AbstractController
{

    public function __construct(
        private ManagerRegistry $doctrine, 
        private ValidatorInterface $validator, 
    )
    {

    }

    #[Route('', name: 'create', methods: "POST")]
    public function create(Request $request): Response
    {
        // TODO: it can be only the future date
        //$date = $request->request->get('date');

        $content = $request->getContent();
        $date = json_decode($content, true)['date'];
        $dateTime = \DateTime::createFromFormat('Y-m-d\TH:i', $date);

        $isAvailable = $this->doctrine
            ->getRepository(Appointment::class)
            ->isAvailable($dateTime);
        
        if(!$isAvailable) {
            return new Response("Appointment is not created!", 400);
        }

        $appointment = new Appointment();
        $appointment->setDate($dateTime)
            ->setStatus('RESERVED')
            ->setUser($this->getUser());

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

    // Get available appointment dates
    // TODO: AppointmentService with all calcuations
    #[Route('/available', name: 'available', methods: "GET")]
    public function available(Request $request): Response
    {
        // Range of dates to search and params validation
        $startDate = $request->query->get('startDate');
        $endDate = $request->query->get('endDate');

        if($startDate === null) { 
            return new Response("startDate param is missing!", 400); 
        }
        elseif($endDate === null) { 
            return new Response("endDate param is missing!", 400);
        }
        
        $startDate = \DateTime::createFromFormat('Y-m-d', $startDate);
        $endDate = \DateTime::createFromFormat('Y-m-d', $endDate);

        if(!$startDate || !$endDate) {
            return new Response("startDate or endDate is invalid! Please provide correct date in YYYY-MM-DD format", 400);
        }

        $startDate->setTime(0,0,0); // begin of that day
        $endDate->setTime(24,59,59); // end of that day

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
        $availableAppointments = array();
        // loop on date
        for($date = $startDate; $date < $endDate; $date->modify('+1 day')) {
            $dayOfWeek = $date->format('w');
            // if Saturday or Sunday - skip and don't add it to available appointments
            if($dayOfWeek == 6 || $dayOfWeek == 0) {
                continue;
            }
            $date->setTime(
                $minTime->format("H"),
                $minTime->format("i")
            );
            // loop on time
            for($date; intval($date->format('H')) < intval($maxTime->format('H')); $date->modify('+30 min')) {
                if(!in_array($date, $reserved)) {
                    $d = clone $date;
                    array_push(
                        $availableAppointments, 
                        [
                            'start' => clone $date,
                            'end' => $d->modify('+30 min')
                        ]
                    );
                }
            }
        }
        
        return $this->json(
            $availableAppointments
        );
    }

}

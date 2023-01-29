<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Service\AppointmentService;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/appointments', name: 'api_appointments_')]
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
    #[Route('/available', name: 'available', methods: "GET")]
    public function available(Request $request, AppointmentService $appointmentService): Response
    {
        // Range of dates to search and params validation
        $startDate = $request->query->get('startDate');
        $endDate = $request->query->get('endDate');

        if($startDate === null) { 
            return new Response("startDate param is missing!", Response::HTTP_BAD_REQUEST); 
        }
        elseif($endDate === null) { 
            return new Response("endDate param is missing!", Response::HTTP_BAD_REQUEST);
        }
        
        return $this->json(
            $appointmentService->getAvailable($startDate, $endDate)
        );
    }

}

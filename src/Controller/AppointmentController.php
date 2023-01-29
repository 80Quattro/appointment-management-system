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
        private AppointmentService $appointmentService
    )
    {

    }

    #[Route('', name: 'create', methods: "POST")]
    public function create(Request $request): Response
    {
        $content = $request->getContent();
        $date = json_decode($content, true)['date'];

        if($date === null) { 
            return new Response("Date param is missing!", Response::HTTP_BAD_REQUEST); 
        }

        $id = $this->appointmentService->create($date);

        return new Response('Saved new appointment with id ' . $id, Response::HTTP_CREATED);
    }

    // Get available appointment dates
    #[Route('/available', name: 'available', methods: "GET")]
    public function available(Request $request): Response
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
            $this->appointmentService->getAvailable($startDate, $endDate)
        );
    }

}

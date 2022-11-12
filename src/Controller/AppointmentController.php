<?php

namespace App\Controller;

use App\Entity\Appointment;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
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

        // TODO: appointments can be reserved in every 30minutes!
        // TODO: it can be only the future date
        $date = $request->request->get('date');

        $appointment = new Appointment();
        $appointment->setDate( \DateTime::createFromFormat('d/m/Y H:i', $date) )
            ->setStatus('RESERVED');

        $errors = $this->validator->validate($appointment);
        
        if (count($errors) > 0) {

            $errorsString = (string) $errors;
    
            return new Response($errorsString);
        }

        $entityManager = $this->doctrine->getManager();
        $entityManager->persist($appointment);
        $entityManager->flush();

        return new Response('Saved new appointment with id ' . $appointment->getId(), 201);
    }

    #[Route('/read', name: 'api_appointment_read', methods: "GET")]
    public function read(): Response
    {
        // TODO: find by day (date param)
        $appointments = $this->doctrine
            ->getRepository(Appointment::class)
            ->findBy(['status' => 'RESERVED']);

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
            $appointmentsArray,
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}

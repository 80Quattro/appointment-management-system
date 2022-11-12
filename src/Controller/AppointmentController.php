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
    private $entityManager;
    private $validator;

    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator) {
        $this->entityManager = $doctrine->getManager();
        $this->validator = $validator;
    }

    #[Route('/create', name: 'api_appointment_create', methods: "POST")]
    public function create(Request $request): Response
    {
        $date = $request->request->get('date');

        $appointment = new Appointment();
        $appointment->setDate( \DateTime::createFromFormat('d/m/Y H:i', $date) )
            ->setStatus('RESERVED');

        $errors = $this->validator->validate($appointment);
        
        if (count($errors) > 0) {

            $errorsString = (string) $errors;
    
            return new Response($errorsString);
        }

        $this->entityManager->persist($appointment);
        $this->entityManager->flush();

        return new Response('Saved new appointment with id ' . $appointment->getId(), 201);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

#[Route('/api/users', name: 'api_users_')]
class UserController extends AbstractController
{
    public function __construct(private ManagerRegistry $doctrine) {}

    #[Route('/appointments', name: 'appointments', methods: "GET")]
    public function getAppointments(): Response
    {   
        return $this->json(
            $this->getUser()->getAppointments(),
            Response::HTTP_OK,
            [],
            ['groups' => 'main']
        ); 
    }
}

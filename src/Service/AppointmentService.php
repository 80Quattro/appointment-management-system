<?php

namespace App\Service;

use App\Entity\Appointment;
use App\Exception\InvalidParameterException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Security;

use Exception;
use DateTime;

class AppointmentService
{

    public function __construct(
        private ManagerRegistry $doctrine, 
        private ValidatorInterface $validator, 
        private Security $security
    ){ }

    public function create(string $dateTime): int
    {
        $dateTime = DateTime::createFromFormat('Y-m-d\TH:i', $dateTime);

        if(!$dateTime) {
            throw new InvalidParameterException("Date is invalid! Please provide correct date in YYYY-MM-DDTHH:MM format");
        }
        
        if(!$this->isAvailable($dateTime)) {
            throw new InvalidParameterException("Given date is not available");
        }

        $appointment = new Appointment();
        $appointment->setDate($dateTime)
            ->setStatus('RESERVED')
            ->setUser($this->security->getUser());

        $errors = $this->validator->validate($appointment);
        
        if (0 !== count($errors)) {
            $errorsString = (string) $errors;
            throw new Exception($errorsString);
        }

        $entityManager = $this->doctrine->getManager();
        $entityManager->persist($appointment);
        $entityManager->flush();

        return $appointment->getId();
    }

    public function getAvailable(string $startDate, string $endDate): array
    {

        $startDate = DateTime::createFromFormat('Y-m-d', $startDate);
        $endDate = DateTime::createFromFormat('Y-m-d', $endDate);

        if(!$startDate || !$endDate) {
            throw new InvalidParameterException("startDate or endDate is invalid! Please provide correct date in YYYY-MM-DD format");
        }

        $startDate->setTime(0,0,0); // begin of that day
        $endDate->setTime(24,59,59); // end of that day

        // available appointments are only in the future
        if($startDate < new DateTime()) {
            $startDate = new DateTime();
        }

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
        
        return $availableAppointments;

    }

    // Check if given appointment-date is available
    private function isAvailable(DateTime $dateTime): bool
    {
        // given date must be in the future
        if(new DateTime() > $dateTime) {
            return false;
        }

        // appointment can be reserved in every 30min
        // TODO: only working hours !!!
        $min = $dateTime->format('i');
        if($min != "00" && $min != "30") {
            return false;
        }

        $result = $this->doctrine
            ->getRepository(Appointment::class)
            ->findByDateTime($dateTime);

        // TODO: Check status RESERVED/CANCELED ...
        // only one appointment can be reserved at the same time
        if(count($result) === 0) {
            return true;
        }

        return false;
    }

}
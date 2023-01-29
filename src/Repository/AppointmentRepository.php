<?php

namespace App\Repository;

use App\Entity\Appointment;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Appointment>
 *
 * @method Appointment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Appointment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Appointment[]    findAll()
 * @method Appointment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Appointment::class);
    }

    public function save(Appointment $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Appointment $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findByDay(DateTime $date): array 
    {
        
        $date->setTime(0,0,0);
        
        $qb = $this->createQueryBuilder('a')
            ->where('a.date BETWEEN :date AND :date2')
            ->setParameter('date', $date->format('Y-m-d H:i:s'))
            ->setParameter('date2', $date->modify('+1 day')->format('Y-m-d H:i:s'))
            ->andWhere('a.status = :status')
            ->setParameter('status', 'RESERVED');

        $query = $qb->getQuery();

        return $query->execute();
    }

    public function findByDates(DateTime $startDate, DateTime $endDate): array
    {
        $qb = $this->createQueryBuilder('a')
            ->where('a.date BETWEEN :startDate AND :endDate')
            ->andWhere('a.status = :status')
            ->setParameter('startDate', $startDate->format('Y-m-d H:i:s'))
            ->setParameter('endDate', $endDate->format('Y-m-d H:i:s'))
            ->setParameter('status', 'RESERVED');
        
        $query = $qb->getQuery();

        return $query->execute();
    }

    public function isAvailable(DateTime $date): bool
    {
        // appointment can be reserved in every 30min
        // TODO: only working hours !!!
        $min = $date->format('i');
        if($min != "00" && $min != "30") {
            return false;
        }

        $qb = $this->createQueryBuilder('a')
            ->where('a.date = :date')
            ->setParameter('date', $date);
        
        $query = $qb->getQuery();
        $result = $query->execute();
        // only one appointment can be reserved at the same time
        if(count($result) === 0) {
            return true;
        }

        return false;

    }
}

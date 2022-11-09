<?php
namespace App\Tests\Unit\Entity;

use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\Validation;
use App\Entity\Appointment;

class AppointmentTest extends TestCase
{
    /**
     * @dataProvider getValidationTestCases
     */
    public function testValidation($date, $status, $expected)
    {
        // Arrange
        $subject = (new Appointment())
            ->setDate($date)
            ->setStatus($status);

        $validator = Validation::createValidatorBuilder()
            ->enableAnnotationMapping()
            ->getValidator();

        // Act
        $result = $validator->validate($subject);

        // Assert
        $this->assertEquals($expected, count($result) == 0);
    }

    public function getValidationTestCases(): array
    {
        return [
            'Succeeds when data is correct' => [ \DateTime::createFromFormat('d/m/Y', '23/05/2013'), 'RESERVED', true ],
            'Fails when status is missing' => [ \DateTime::createFromFormat('d/m/Y', '23/05/2013'), '', false ],
            'Fails when status is not valid' => [ \DateTime::createFromFormat('d/m/Y', '23/05/2013'), 'AAA', false ],
        ];
    }

}
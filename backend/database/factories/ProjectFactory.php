<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $collaborators_max = random_int(1,10) ;
        $collaborators = random_int(1,$collaborators_max);
        $isOpen = true;
        if ($collaborators === $collaborators_max){
            $isOpen = false;
        }
        return [
            'date' => now(),
            'title' => fake()->sentence(),
            'description' => fake()->text(),
            'image' => fake()->imageUrl(),
            'creator' => fake()->numberBetween(1,10),
            'collaborators' => $collaborators,
            'collaborators_max' => $collaborators_max,
            'open' => $isOpen,
            'popularity' => fake()->numberBetween(0,100),
        ];
    }
}

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
        return [
            'date' => fake()->dateTime('now'),
            'title' => fake()->title(),
            'description' => fake()->text(),
            'open' => true,
            'participants' => 1,
            'participants_max' => fake()->numberBetween(1,9),
            'popularity' => fake()->numberBetween(0,100),
        ];
    }
}

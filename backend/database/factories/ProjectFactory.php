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
            'title' => fake()->sentence(),
            'description' => fake()->text(),
            'open' => true,
            'user_id' => fake()->numberBetween(1,10),
            'participants' => 1,
            'participants_max' => fake()->numberBetween(1,9),
            'popularity' => fake()->numberBetween(0,100),
        ];
    }
}

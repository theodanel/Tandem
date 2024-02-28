<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Nette\Utils\Random;

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
        $statuses1 = ['created', 'ongoing'];
        $rand_status1 = array_rand($statuses1);
        $statuses2 = ['ongoing', 'completed'];
        $rand_status2 = array_rand($statuses2);
        if ($isOpen){
            $status = $statuses1[$rand_status1];
        } else {
            $status = $statuses2[$rand_status2];
        }
        return [
            'title' => fake()->sentence(),
            'description' => fake()->text(),
            'user_id' => fake()->numberBetween(1,10),
            'image' => "https://picsum.photos/id/".random_int(9,600)."/800/450",
            'collaborators' => $collaborators,
            'collaborators_max' => $collaborators_max,
            'open' => $isOpen,
            'status' => $status,
            'popularity' => fake()->numberBetween(0,100),
        ];
    }
}

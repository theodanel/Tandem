<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user_id = random_int(1,10);
        $project_id = random_int(1,10);
        $project = Project::find($project_id);
        if($project->user_id === $user_id){
            $admin = true;
        } else {
            $admin = false;
        }
        return [
            'content' => fake()->text(100),
            'user_id' => $user_id,
            'project_id' => $project_id,
            'admin' => $admin
        ];
    }
}

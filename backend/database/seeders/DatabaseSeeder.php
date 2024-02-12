<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        
        User::factory(10)->create();
        User::factory()->create([
            'name' => 'test',
            'email' => 'test@test.fr'
        ]);
    
        $projects = Project::factory(10)->has(User::factory()->count(3))->create();

        // foreach ($projects as $index => $project){
        //     $project->participants()->attach(random_int(1,10));
        // }

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}

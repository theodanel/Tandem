<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Comment;
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

        $this->call([
            AvatarSeeder::class,
            LanguageSeeder::class,
            UserSeeder::class,
            ProjectSeeder::class,
            CommentSeeder::class
            
        ]);

    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // création de 10 utilisateurs aléatoires
        User::factory(10)->create()->each(function ($user){
            $user->language()->attach(random_int(1,3));
            $user->language()->attach(random_int(4,6));
            $user->language()->attach(random_int(7,9));
        });
    }
}

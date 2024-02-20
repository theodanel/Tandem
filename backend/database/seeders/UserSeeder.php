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
            $user->language()->attach([random_int(1,3),random_int(4,6),random_int(7,9)]);
        });

        User::factory()->create([
            'name' => 'test',
            'email' => 'test@test.fr',
            'password' => 'test',
        ]);

        User::factory()->create([
            'name' => "Julie",
        ]);
        User::factory()->create([
            'name' => "Cyril",
        ]);
        User::factory()->create([
            'name' => "Aurélie",
        ]);
        User::factory()->create([
            'name' => "Angèle",
        ]);
        User::factory()->create([
            'name' => "Axel",
        ]);
        User::factory()->create([
            'name' => "Gurkan",
        ]);
        User::factory()->create([
            'name' => "Aurélien",
        ]);
        User::factory()->create([
            'name' => "Nassim",
        ]);
        User::factory()->create([
            'name' => "Rémi",
        ]);
        User::factory()->create([
            'name' => "Florent",
        ]);
        User::factory()->create([
            'name' => "Mehdi",
        ]);
        User::factory()->create([
            'name' => "Nesrine",
        ]);


    }
}

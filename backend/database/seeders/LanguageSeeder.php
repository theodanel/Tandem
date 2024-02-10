<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
                [
                    'HTML',
                    'front',
                ],
                [
                    'CSS',
                    'front',
                ],
                [
                    'JavaScript',
                    'front',
                ],
                [
                    'PHP',
                    'back',
                ],
                [
                    'SASS',
                    'front',
                ],
                [
                    'Laravel',
                    'back',
                ],
                [
                    'NodeJS',
                    'back',
                ],
                [
                    'React',
                    'front',
                ],
                [
                    'SQL',
                    'back',
                ],
            ];

        // création de langages :
        foreach($languages as $language){
            Language::create([
                'name' => $language[0],
                'category' => $language[1],
                'logo' => fake()->imageUrl(),
            ]);
        }
    }
}
